import requests
from lxml import html

import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

import os
import json

with open('credentials.json', 'w') as f:
    f.write(os.environ['GOOGLE_CREDENTIALS_JSON'])

with open('token.json', 'w') as f:
    f.write(os.environ['GOOGLE_TOKEN_JSON'])

PROMIEDOS_URL = "https://www.promiedos.com.ar/team/argentinos-juniors/ihb"

SCOPES = ['https://www.googleapis.com/auth/calendar']
CAL_DESTINO = 'primary' 


anio_actual = datetime.datetime.now().year


def obtener_partidos():
    page = requests.get(PROMIEDOS_URL)
    if page.status_code != 200:
        raise Exception(f"Failed to load page: {page.status_code}")
    tree = html.fromstring(page.content)
    partidos = tree.xpath("//p[text()='PRÓXIMOS PARTIDOS']/../..//tr")
    match_partidos = []

    for partido in partidos:
        info = partido.xpath(".//td")
        if info and info[0].text_content() != "Día":
            fecha = info[0].text_content().strip()
            estadio = info[1].text_content().strip()
            rival = info[2].text_content().strip()
            hora = info[3].text_content().strip()

            try:
                # Convertir a datetime: ej. 'Dom 14/07' -> 2025-07-14
                dia_mes = fecha.split()[0]
                fecha_dt = datetime.datetime.strptime(dia_mes + " " + str(anio_actual) + " " + hora, "%d/%m %Y %H:%M")
                match_partidos.append({
                    'fecha': fecha_dt,
                    'hora': hora,
                    'rival': rival,
                    'estadio': estadio
                })
            except Exception as e:
                print(f"Error parseando fecha '{fecha}': {e}")
    return match_partidos


def obtener_servicio():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('calendar', 'v3', credentials=creds)

def evento_ya_existe(service, summary, start_time):
    eventos = service.events().list(
        calendarId='primary',
        timeMin=start_time.isoformat() + 'Z',  # formato RFC3339
        timeMax=(start_time + datetime.timedelta(hours=3)).isoformat() + 'Z',
        q=summary,
        singleEvents=True
    ).execute()

    for evento in eventos.get('items', []):
        if evento['summary'] == summary:
            return True
    return False


def subir_eventos_a_calendar(eventos):
    service = obtener_servicio()
    for partido in eventos:
        start = partido['fecha']
        end = start + datetime.timedelta(hours=2)
        summary = f"Argentinos vs {partido['rival']}"

        if evento_ya_existe(service, summary, start):
            print(f"Ya existe: {summary} - {start}")
            continue

        evento = {
            'summary': summary,
            'location': partido['estadio'],
            'start': {'dateTime': start.isoformat(), 'timeZone': 'America/Argentina/Buenos_Aires'},
            'end': {'dateTime': end.isoformat(), 'timeZone': 'America/Argentina/Buenos_Aires'},
            'description': 'Partido cargado automáticamente desde Promiedos'
        }

        creado = service.events().insert(calendarId='primary', body=evento).execute()
        print(f"✅ Evento creado: {creado.get('summary')} - {creado.get('start')['dateTime']}")
        
if __name__ == '__main__':
    partidos = obtener_partidos()
    subir_eventos_a_calendar(partidos)


