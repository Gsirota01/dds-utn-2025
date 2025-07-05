class ItemCarrito {

    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.descuentos = [];
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento);
    }

    precioFinal() {
        const precioBaseTotal = this.precioBase;
        const precioFinal = this.descuentos.reduce(
            (precioAnterior, descuento) => precioAnterior - descuento.valorDescontado(precioBaseTotal, this.cantidad),
            precioBaseTotal);
        return Math.max(precioFinal, 0);
    }

    get precioBase() {
        return this.producto.precioBase;
    }


}
exports.ItemCarrito = ItemCarrito;
