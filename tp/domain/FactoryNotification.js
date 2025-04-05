const EstadoReserva = { CONFIRMADA, CANCELADA, PENDIENTE };

class FactoryNotification {
    crearMensajeSegunEstadoReserva(estado) {
        if (estado === EstadoReserva.CONFIRMADA) {
            return this.crearMensajeConfirmada();
        }

        if (estado === EstadoReserva.CANCELADA) {
            return this.crearMensajeCancelada();
        }

        return mensaje;
    }

    crearSegunReserva(reserva) {
        const mensaje = this.crearMensajePendiente(reserva);


        enviarNotificacion(mensaje, reserva);
    }

    enviarNotificacion(mensaje, anfitrion) {
        //TODO se podría mockear el envío de la notificación
    }
}