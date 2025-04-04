const Moneda = { DOLAR_USA, PESO_ARG, REALES }
const Caracteristica = { WIFI, PISCINA, MASCOTAS_PERMITIDAS, ESTACIONAMIENTO }

class Alojamiento {
    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos) {
        this.anfitrion = anfitrion;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioPorNoche = precioPorNoche;
        this.moneda = moneda;
        this.horarioCheckIn = horarioCheckIn;
        this.horarioCheckOut = horarioCheckOut;
        this.direccion = direccion;
        this.cantHuespedesMax = cantHuespedesMax;
        this.caracteristicas = caracteristicas || [];
        this.reservas = reservas || [];
        this.fotos = fotos || [];
    }

    estasDisponibleEn(rangoDeFechas) {
        return !this.reservas.some(reserva => {
            return (
                rangoDeFechas.fechaInicio < reserva.rangoFechas.fechaFin &&
                rangoDeFechas.fechaFin > reserva.rangoFechas.fechaInicio
            );
        });
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo;
    }

    tenesCaracteristica(caracteristica) {
        return this.caracteristicas.includes(caracteristica);
    }

    puedenAlojarse(cantHuespedes) {
        return cantHuespedes <= this.cantHuespedesMax;
    }
}
exports.Alojamiento = Alojamiento;
