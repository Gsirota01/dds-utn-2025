### Modelado en Capas

Se busca pasar de tener toda la lógica en un solo archivo a definirla en distintas capas, cada una con mayor cercanía al *frontend* o a la base de datos. Las capas principales mencionadas son:

*   **Controladores (Controllers)**:
    *   Es la capa más cercana al *frontend* y la más alta en el negocio.
    *   **Exponen las distintas APIs** y **definen los *endpoints***.
    *   **Reciben las solicitudes externas** (GET, POST, etc.) y luego las pasan a la capa de *services*.
    *   Ejemplo: `ver todos los productos`, `ver un determinado producto`, `crear un producto nuevo`, `eliminar un producto`, `cambiar algún parámetro`.
*   **Servicios (Services)**:
    *   Se encarga del "**cómo**" se genera una entidad o se orquesta una acción.
    *   Llama a los sujetos de dominio y a los repositorios.
    *   Indica **cómo se hace algo** y se focaliza en las **reglas de flujo**.
    *   El controlador inyecta un *service*, y el *service* a su vez inyecta un repositorio.
    *   Ejemplo: en la creación de un producto, el *service* crea el objeto producto y lo envía al repositorio para que lo persista.
*   **Repositorios (Repositories)**:
    *   Es la capa más cercana a la base de datos.
    *   Se encarga de **persistir la información**, ya sea en una base de datos o de manera dinámica en una lista (como se vio en el ejemplo con una lista en memoria).
    *   **Traduce las entidades del dominio** a un formato persistible y viceversa.
    *   Es el que va a buscar la información (ej: un producto) y se la pasa al *service*, quien a su vez la provee al controlador.
    *   Se recomienda tener un repositorio por cada elemento del dominio (ej: `producto repository` para productos).
*   **Modelos (Models / Entidades de Dominio)**:
    *   Se encuentran dentro de la carpeta `models`.
    *   Contienen las **entidades centrales del dominio** (ej: `categoría`, `producto`).
    *   Son los objetos que interactúan entre sí dentro de la lógica de negocio.

**Flujo de Interacción:**
Un controlador inyecta un *service*, pasándole los distintos *requests* con la información necesaria (ej: buscar, crear, eliminar un producto). A su vez, el *service* tiene inyectado un *repository* al que le envía las acciones para guardar o buscar productos. Por ejemplo, al crear un producto, el controlador recibe la solicitud, la envía al *service*, el *service* instancia el producto y se lo envía al *repository* para que lo persista en la lista. De esta forma, cada entidad tiene una responsabilidad específica, delegando a quien le corresponde.

El proyecto se estructura de forma modularizada, con archivos separados para el puerto, las rutas, el `index.js` (que importa todo lo necesario para levantar la aplicación) y el `server.js` (que recibe el controlador y las rutas para levantar el proyecto).

### Paginación

La paginación es una técnica crucial para construir APIs, ya que permite **dividir grandes cantidades de datos en pequeñas porciones llamadas páginas**.

*   **Problema que Resuelve**: Evita que el cliente se cuelgue, que la red se sature y que el navegador no pueda renderizar miles de registros en una sola llamada a la API, mejorando la experiencia del usuario al eliminar el "scroll infinito".
*   **Beneficios**:
    *   **Mejora mucho el rendimiento** al trabajar con menos datos.
    *   **Reduce el uso de la red**, importante en lugares con poca señal.
    *   Es **más cómodo para el usuario**.
*   **Funcionamiento**:
    *   Se utilizan dos parámetros comunes como *query params* en la API: `page` (indica en qué página se está) y `limit` (cuántos registros se quieren por página).
    *   El servidor calcula el *offset* con la fórmula: `offset = (page - 1) * limit`.
    *   Luego, el servidor usa el *offset* para cortar la lista de registros y traer solo los que corresponden a la página solicitada (ej: `slice` de 10 a 20 para la página 2 con un límite de 10).
    *   Una respuesta típica de la API incluye información sobre la página actual, registros por página, total de registros y total de páginas.
*   **Implementación en Capas**:
    *   El **controlador** recibe `page` y `limit` (con valores por defecto si no se especifican, ej: página 1, límite 10) y se los pasa al *Product Service*.
    *   El **service** a su vez, pasa estos valores al **repositorio**.
    *   El **repositorio** es quien calcula el *offset* y corta la lista de datos para devolver solo los registros correspondientes a la página.    
---

## Paginacion

¡Claro! Basándonos en la explicación de la Clase 04 sobre Modelado en Capas y Paginación, te proporciono un ejemplo de implementación de paginación en JavaScript, utilizando una estructura de capas (Controlador, Servicio, Repositorio) y datos en memoria para simplificar.

La **paginación** es una técnica crucial para las APIs que permite **dividir grandes volúmenes de datos en porciones más pequeñas, llamadas páginas**. Esto mejora el rendimiento, reduce el uso de la red y ofrece una experiencia de usuario más cómoda al evitar el "scroll infinito".

En este ejemplo, simularemos una lista de productos almacenada en memoria y expondremos una API REST paginada.

### Estructura del Proyecto:

```
.
├── src/
│   ├── controllers/
│   │   └── productController.js
│   ├── services/
│   │   └── productService.js
│   └── repositories/
│       └── productRepository.js
└── app.js
```

### 1. Capa de Repositorios (`src/repositories/productRepository.js`)

Esta capa es la más cercana a la fuente de datos. En este ejemplo, el repositorio **simula una base de datos con una lista de productos en memoria**. Es el encargado de calcular el `offset` y "cortar" la lista de registros para devolver solo los de la página solicitada.

```javascript
// src/repositories/productRepository.js

// Simulación de datos en memoria (29 productos, como en el ejemplo de la clase)
const products = [];
for (let i = 1; i <= 29; i++) {
    products.push({
        id: i,
        name: `Producto ${String.fromCharCode(64 + i)}`, // Genera A, B, C...
        price: 10 + i * 0.5,
        description: `Descripción del Producto ${i}`
    });
}

class ProductRepository {
    /**
     * Busca productos paginados de la lista en memoria.
     * @param {number} page - El número de página solicitado (empezando en 1).
     * @param {number} limit - La cantidad de registros por página.
     * @returns {object} Un objeto con los datos paginados y metadatos.
     */
    async findPaginated(page, limit) {
        // Calcula el offset (desplazamiento) para saber desde qué índice empezar.
        // Fórmula: offset = (page - 1) * limit
        const offset = (page - 1) * limit;

        // Corta la lista de productos para obtener solo los de la página actual
        const paginatedItems = products.slice(offset, offset + limit);

        // Calcula el total de elementos y el total de páginas
        const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / limit);

        // Retorna la información paginada junto con los metadatos
        return {
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages,
            data: paginatedItems
        };
    }
}

module.exports = new ProductRepository();
```

### 2. Capa de Servicios (`src/services/productService.js`)

El servicio de productos recibe los parámetros `page` y `limit` del controlador y **los delega al repositorio** para que este realice la operación de paginación. Aquí se podría añadir lógica de negocio adicional si fuera necesario, pero para la paginación, su rol principal es orquestar la llamada al repositorio.

```javascript
// src/services/productService.js
const productRepository = require('../repositories/productRepository');

class ProductService {
    constructor() {
        this.productRepository = productRepository;
    }

    /**
     * Encuentra productos paginados delegando al repositorio.
     * @param {number} page - Número de página.
     * @param {number} limit - Límite de registros por página.
     * @returns {Promise<object>} El resultado paginado del repositorio.
     */
    async findPaginatedProducts(page, limit) {
        const paginatedResult = await this.productRepository.findPaginated(page, limit);
        return paginatedResult;
    }
}

module.exports = new ProductService();
```

### 3. Capa de Controladores (`src/controllers/productController.js`)

El controlador es la capa que **recibe los parámetros `page` y `limit` de la solicitud HTTP** (generalmente como `query parameters` en una API REST). También puede establecer **valores por defecto** si no se proporcionan estos parámetros. Luego, **pasa estos valores a la capa de servicios**.

```javascript
// src/controllers/productController.js
const productService = require('../services/productService');

class ProductController {
    constructor() {
        this.productService = productService;
    }

    /**
     * Obtiene productos paginados desde el servicio.
     * Extrae `page` y `limit` de los query parameters de la request.
     * @param {object} req - Objeto de la solicitud HTTP.
     * @param {object} res - Objeto de la respuesta HTTP.
     */
    async getProducts(req, res) {
        // Extrae 'page' y 'limit' de los query parameters.
        // parseInt convierte el string a número.
        // Si no se proporcionan, usa valores por defecto: page=1, limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            // Delega al servicio para obtener los productos paginados
            const products = await this.productService.findPaginatedProducts(page, limit);
            // Envía la respuesta al cliente con estado 200 OK
            res.status(200).json(products);
        } catch (error) {
            // Manejo de errores (en una app real, usar un middleware global de errores)
            console.error('Error al obtener productos paginados:', error.message);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}

module.exports = new ProductController();
```

### 4. Archivo Principal (`app.js`)

Este archivo se encarga de configurar el servidor Express y **conectar las distintas capas**, exponiendo el endpoint de la API.

```javascript
// app.js
const express = require('express');
const productController = require('./src/controllers/productController');

const app = express();
const port = 3000;

// Middleware para parsear JSON bodies (si tuvieras POST/PUT requests)
app.use(express.json());

// Definición de la ruta para obtener productos paginados
// Este endpoint es un GET y llama al método getProducts del controlador.
// Se accede vía /api/products?page=X&limit=Y
app.get('/api/products', productController.getProducts);

// Manejador de errores básico (para fines de este ejemplo)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log('Puedes probar los siguientes endpoints:');
    console.log(`- http://localhost:${port}/api/products`);
    console.log(`- http://localhost:${port}/api/products?page=1&limit=5`);
    console.log(`- http://localhost:${port}/api/products?page=3&limit=10`);
    console.log(`- http://localhost:${port}/api/products?page=10&limit=5`); // Página sin resultados
});
```

### Cómo Probarlo:

1.  **Guarda los archivos** con la estructura de carpetas indicada.
2.  Asegúrate de tener Node.js instalado.
3.  **Instala Express** en tu proyecto: Abre tu terminal en la raíz de tu proyecto (`donde está app.js`) y ejecuta:
    ```bash
    npm init -y
    npm install express
    ```
4.  **Ejecuta la aplicación**:
    ```bash
    node app.js
    ```
    Verás un mensaje en la consola indicando que el servidor está escuchando.

5.  **Abre tu navegador o una herramienta como Postman/Insomnia** y prueba los siguientes URLs:

    *   **`http://localhost:3000/api/products`**
        *   Esto debería devolver la primera página con 10 productos (valores por defecto). El output incluirá `page: 1`, `limit: 10`, `totalItems: 29`, `totalPages: 3`.

    *   **`http://localhost:3000/api/products?page=1&limit=5`**
        *   Devolverá los primeros 5 productos. `page: 1`, `limit: 5`, `totalItems: 29`, `totalPages: 6`.

    *   **`http://localhost:3000/api/products?page=3&limit=10`**
        *   Devolverá los productos de la tercera página. `page: 3`, `limit: 10`, `totalItems: 29`, `totalPages: 3`. (Los productos del 21 al 29).

    *   **`http://localhost:3000/api/products?page=10&limit=5`**
        *   Devolverá un arreglo `data` vacío, ya que la página 10 no tiene productos con un límite de 5. `page: 10`, `limit: 5`, `totalItems: 29`, `totalPages: 6`.

Esta implementación muestra cómo cada capa cumple su rol específico, permitiendo que el código sea **"mucho más clean, mucho más prolijo"** al delegar responsabilidades y mantener las operaciones de persistencia centralizadas.