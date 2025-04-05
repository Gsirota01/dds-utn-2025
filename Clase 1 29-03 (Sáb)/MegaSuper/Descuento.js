class DescuentoPorCantidad {
    constructor(cantidadMinima, porcentajeAplicado) {
        this.cantidadMinima = cantidadMinima;
        this.porcentajeAplicado = porcentajeAplicado;
    }

    valorDescontado(precioBase, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima);
        let valorDescontado = 0;
        if (vecesRepetido > 0) {
            valorDescontado = precioBase * this.porcentajeAplicado / 100;
        }
        return valorDescontado;
    }
}

class DescuentoFijo {
    constructor(valor) {
        this.valor = valor;
    }

    valorDescontado(precioBase, _) {
        return precioBase - this.valor;
    }
}

class DescuentoPorcentaje {
    constructor(porcentaje) {
        this.porcentaje = porcentaje;
    }

    valorDescontado(precioBase, _) {
        return precioBase * this.porcentaje / 100;
    }
}

