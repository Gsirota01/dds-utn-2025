const { Carrito } = require("./megasuper evolucion");

class Usuario {
    constructor(nombre, apellido, email, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.carrito = new Carrito();
    }
}
exports.Usuario = Usuario;
