export class Producto {
    #precio; // Se define la propiedad privada #precio

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.#precio = precio;
    }

    aumentarPrecio(monto) {
        this.#precio += monto;
    }

    get precioBase() {
        return this.#precio;
    }

    set precioBase(precio) {
        this.#precio = precio;
    }
}
