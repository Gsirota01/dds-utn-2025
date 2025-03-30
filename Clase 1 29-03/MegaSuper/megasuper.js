// let descuentoPorcentaje = (producto, porcentaje) => { producto.precio * porcentaje / 100 }
// let descuentoFijo = (producto, descuento) => { producto.precio - descuento }
// let descuento3x2 = (producto) => { producto.cantidad >= 3 ? producto.precio * 2 : producto.precio }
//Esto está mal porque los descuenntos no se van a comportar de manera polimórfica

// function Producto(nombre, precio, categoria) {
//     this.nombre = nombre
//     this.precio = precio
//     this.precioFinal = 0
// }

class Producto {
    #precio // Se define la propiedad privada #precio

    constructor(nombre, precio, cantidad) {
        this.nombre = nombre
        this.#precio = precio
        this.cantidad = cantidad
        this.descuentos = []
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento)
    }

    precioFinal() {
        const precioBaseTotal = this.#precio * this.cantidad
        const precioFinal = this.descuentos.reduce(
            (precioAnterior, descuento) =>
                precioAnterior - descuento.valorDescontado(precioBaseTotal, this.cantidad)
            , precioBaseTotal)
        return Math.max(precioFinal, 0)
    }

    aumentarPrecio(monto) {
        this.#precio += monto
    }


    get precioBase() {
        return this.#precio
    }

    set precioBase(precio) {
        this.#precio = precio
    }

}

class Usuario {
    constructor(nombre, apellido, email, password) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.password = password
        this.carrito = new Carrito()
    }
}

// function Usuario(nombre, apellido, email, password) {
//     this.nombre = nombre
//     this.apellido = apellido
//     this.email = email
//     this.password = password
//     this.carrito = new Carrito
// }

class Carrito {
    constructor() {
        this.productos = []
        this.total = 0
    }

    agregarProducto(producto) {
        this.productos.push(producto)
    }
}

class DescuentoFijo {
    constructor(valor) {
        this.valor = valor
    }

    valorDescontado(precioBase, _) {
        return precioBase - this.valor
    }
}

class DescuentoPorcentaje {
    constructor(porcentaje) {
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBase, _) {
        return precioBase * this.porcentaje / 100
    }
}


class DescuentoPorCantidad {
    constructor(cantidadMinima, porcentajeAplicado) {
        this.cantidadMinima = cantidadMinima
        this.porcentajeAplicado = porcentajeAplicado
    }

    valorDescontado(precioBase, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima)
        let valorDescontado = 0
        if (vecesRepetido > 0) {
            valorDescontado = precioBase * this.porcentajeAplicado / 100
        }
        return valorDescontado
    }
}

let agregarAlCarrito = (cliente, producto) => {
    cliente.carrito.agregarProducto(producto)
}


const u1 = new Usuario("pepe", "gomez", "ppgomez@mail.com", "*******")
const p1 = new Producto("Camiseta", 1000, 1)
p1.agregarDescuento(new DescuentoPorcentaje(10))
u1.carrito.agregarProducto(p1)

console.log(u1)
console.log(u1.carrito)
console.log(p1.precioBase) // 1000	
console.log(p1.precioFinal()) //900



//Ejercicio 4
function aumentarPrecio(monto, carrito) {
    // carrito.productos = carrito.productos.map((producto) => {
    //     return producto.precioBase + monto
    // })
    // El map es innecesario porque se va a estar modificando el mismo objeto,
    // por eso es posible utilizar el forEach
    carrito.productos.forEach(p => {
        p.precioBase = p.precioBase + monto
    });
}

function precioMasAlto(productos) {
    const precio = productos.map(p => p.precioBase)
    return Math.max(...precio)
}

function productosMasBaratosQue(productos, monto) {
    return productos.filter(p => p.precioFinal() < monto)
}

function sumatoriaPrecios(productos) {
    return productos.reduce((acumulador, producto) => {
        return acumulador + producto.precioFinal()
    }, 0)
}

function ordenarPorPrecio(productos) {
    productos.sort((p1, p2) => p1.precioFinal() - p2.precioFinal())
}



