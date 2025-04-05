class Carrito {
    constructor() {
        this.itemsCarrito = [];
        this.total = 0;
    }

    agregarAlCarrito(itemCarrito) {
        this.itemsCarrito.push(itemCarrito);
    }
}
