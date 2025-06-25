# Despliegue & Seguridad

#### Definición 
El `despliegue` se refiere al proceso de implementar, distribuir y poner en funcionamiento una aplicación, software, sistema o cualquier otro producto tecnológico en una infraestructura específica.

*  ¿Que necesitamos para que un sistema funcione? 
    * Software
    * Nodos de procesamiento
    * Red

# Definición de nube
**Cloud computing** es un modelo para permitir el acceso por la red de forma conveniente y bajo demanda a un conjunto compartido de recursos informáticos configurables (por ejemplo, redes, servidores, almacenamiento, aplicaciones y servicios) que pueden ser provisionados y liberados con un esfuerzo mínimo de gestión o interacción con el proveedor de servicios.

El modelo de cloud está compuesto por características esenciales, tres modelos de 
servicio y cuatro modelos de despliegue.


## ¿Donde está mi infraestructura? 
* Bare metal / Bajo mi mantenimiento
    * 💵Inversión inicial 
        * Es alta debido a la compra de hardware y software.
    * 🔧Mantenimiento Infraestructura y equipos 
        * Soy encargado de mantener la infraestructura, los equipos y el software.
* Nube privada 
    * 💵Tengo la infraestructura 
    * 💻La virtualizo
* Nube pública 
    * 🤝La alquilo/contrato la infra a un proveedor de servicios

--- 

# Tipos de servicios :
## Software as a Service (SaaS)
* La capacidad provista al usuario es usar aplicaciones del proveedor que se ejecutan en la nube.
* Las aplicaciones son accedidas desde varios tipos de dispositivos a través de clientes livianos como un Web Browser o aplicaciones de interface

... Falta completar

## Infrastructure as a Service (IaaS)
* La capacidad provista al cliente es proveer procesamiento, almacenamiento, red y otros recursos informáticos fundamentales donde el cliente puede desplegar y ejecutar software, que puede incluir sistemas operativos y aplicaciones.

* El cliente no gestiona o controla la infraestructura subyacente, pero tiene control sobre los sistemas operativos, almacenamiento, implementaciones de aplicaciones y posiblemente algunas configuraciones de red.

![alt text](image-1.png)

* El cliente pide por ejemplo : 
    * Un servidor virtual con 4 vCPU, 8GB de RAM y 100GB de disco.
    * Un balanceador de carga.
    * Un firewall.
    * Un sistema de almacenamiento.
* El proveedor de IaaS se encarga de la infraestructura física, la virtualización, el almacenamiento y la red.
* El cliente gestiona los sistemas operativos, las aplicaciones y la configuración de red.


## Platform as a Service (PaaS)
* La capacidad provista al clietne es desplegar sobre la infraestructura cloud aplicaciones del cluiente que fueron desarrolladas usando lenguajes de programación y heramientas soportadas por el proveedor.

* El cliente no gestiuona o controla la infraestructura subyacente, la red, los servidores, el sistema operativo o el almacenamiento, pero tiene control sobre las aplicaciones implementadas y posiblemente sobre la configuración del ambiente en que está ejecutandose.

* EL cliente pide por ejemplo : 
    * Un ambiente de desarrollo con un lenguaje de programación específico.
    * Un sistema de base de datos.
    * Un sistema de mensajería.

* El proveedor de PaaS se encarga de la infraestructura física, la virtualización, el almacenamiento, la red y el sistema operativo. 

![alt text](image-2.png)


![alt text](image-3.png)


## Vms vs contenedores
![alt text](image-4.png)



