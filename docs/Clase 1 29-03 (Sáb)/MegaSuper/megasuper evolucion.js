const { Carrito } = require("./Carrito")
const { DescuentoPorcentaje } = require("./DescuentoPorcentaje")
const { ItemCarrito } = require("./ItemCarrito")
const { Producto } = require("./Producto")
const { Usuario } = require("./Usuario")


const u1 = new Usuario("pepe", "gomez", "ppgomez@mail.com", "*******")
const p1 = new Producto("Camiseta", 1000, 1)
const i1 = new ItemCarrito(p1, 2)
u1.carrito.agregarAlCarrito(i1)
console.log(sumatoriaPrecios(u1.carrito.itemsCarrito)) //1000

i1.agregarDescuento(new DescuentoPorcentaje(10))
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(5000).then(() => {
    console.log(sumatoriaPrecios(u1.carrito.itemsCarrito)) // 900
});



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



