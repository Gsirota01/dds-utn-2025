## [Repositorio utilizado](https://github.com/ddso-utn/taller-docker)

# Docker
Docker es una **plataforma que permite crear, ejecutar y administrar contenedores**. Un contenedor es una unidad liviana y portátil que incluye todo lo necesario para ejecutar una aplicación: el código, las dependencias, las librerías y el sistema operativo (de forma muy optimizada).

---
### Virtualización
La virtualización es una tecnología que permite crear versiones virtuales de recursos físicos, como servidores, sistemas operativos, almacenamiento o redes, en lugar de usar hardware físico dedicado para cada uno.
 
### ¿Por qué virtualizar?

* **Aislamiento**: Cada máquina virtual o contenedor corre de forma independiente, evitando conflictos entre aplicaciones.
* **Portabilidad**: Las aplicaciones virtualizadas pueden moverse fácilmente entre diferentes entornos (desarrollo, testing, producción).
* **Eficiencia**: Se aprovechan mejor los recursos del hardware, ya que múltiples aplicaciones pueden correr en el mismo servidor físico sin interferir entre sí.
* **Entronos reproducibles**: Puedes crear entornos idénticos para desarrollo, testing y producción, evitando problemas de "en mi máquina funciona".
* **Gestion de versiones**: Puedes controlar versiones de tus aplicaciones y sus dependencias de forma más sencilla.
* **Independencia del hardware**: Puedes correr aplicaciones en diferentes servidores sin preocuparte por las diferencias de hardware.

---

## Tipos de virtualización

* Virtualización de hardware:
    * Qemu : Es un emulador y virtualizador de hardware que permite ejecutar sistemas operativos **completos** en una máquina virtual. Es muy versátil y puede emular diferentes arquitecturas de hardware. Incuso se puede modificar la arquitectura de la máquina virtual. Ejemplo: correr un sistema operativo de 32 bits en una máquina virtual de 64 bits.
    * VirtualBox : La diferencia con Qemu es que VirtualBox es más fácil de usar y está más orientado a usuarios finales. Permite crear máquinas virtuales con diferentes sistemas operativos y configuraciones de hardware, pero no es tan flexible como Qemu en términos de emulación de hardware.
* Virtualización de software:
    * Docker : Es una plataforma de contenedores que permite empaquetar aplicaciones y sus dependencias en contenedores ligeros. A diferencia de las máquinas virtuales, los contenedores comparten el mismo kernel del sistema operativo del host, lo que los hace más eficientes en términos de recursos y más rápidos de iniciar.


### 🧱 ¿Qué es un contenedor?

Un contenedor es similar a una **máquina virtual**, pero mucho más **ligero y eficiente**. A diferencia de una VM, un contenedor comparte el kernel del sistema operativo del host, lo que lo hace más rápido de arrancar y con menor consumo de recursos.


---

### 🚢 ¿Para qué sirve Docker?

* **Empaquetar una aplicación con todo lo que necesita para correr**
* **Asegurar que se comporta igual** sin importar en qué máquina o entorno esté (desarrollo, testing, producción)
* **Facilitar despliegues y CI/CD**
* **Aislar servicios y microservicios** en proyectos complejos

---

### 🔧 Ejemplo práctico

Supongamos que tienes una app en Node.js que usa MongoDB. Podés:

1. Crear una imagen Docker para tu app.
2. Usar una imagen oficial de MongoDB.
3. Levantar ambas con Docker Compose.
4. Ejecutar todo con un simple comando sin instalar nada en tu máquina, salvo Docker.

---

### 📦 Conceptos clave

| Concepto           | Descripción breve                                              |
| ------------------ | -------------------------------------------------------------- |
| **Imagen**         | Plantilla inmutable (como una receta) para crear contenedores. |
| **Contenedor**     | Instancia en ejecución de una imagen.                          |
| **Dockerfile**     | Archivo que define cómo construir una imagen.                  |
| **Docker Hub**     | Repositorio público de imágenes Docker.                        |
| **Docker Compose** | Herramienta para definir y correr múltiples contenedores.      |


