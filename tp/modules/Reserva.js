class Reserva {
    constructor(fechaAlta, huesped, alojamiento, rangoFechas, estado, precioPorNoche) {
        this.fechaAlta = fechaAlta;
        this.huesped = huesped;
        this.alojamiento = alojamiento;
        this.rangoFechas = rangoFechas;
        this.estado = estado;
        this.precioPorNoche = precioPorNoche;
    }

    actualizarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
        notificationHandler = new FactoryNotification();
    }
}