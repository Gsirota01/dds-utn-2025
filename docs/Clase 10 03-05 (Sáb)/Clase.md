[Video clase](https://youtu.be/ujvclaXx2Ew)

![alt text](img/image.png)

**1. Testing Unitario:**

*   **Definición:** El testing unitario se encarga de **testear cada componente aislado de la aplicación** (como una clase, un método o una función).
*   **Herramienta:** Para JavaScript, se utiliza **Jest** como framework de testing. Se instala como una dependencia de desarrollo (`npm install jest --save-dev`) y se configura un script en `package.json` para ejecutar los tests. Debido al uso de ES Modules, se requiere un comando especial para ejecutar Jest compatiblemente.
*   **Estructura de los Tests:**
    *   Los archivos de test deben terminar en `.test.js` (por ejemplo, `descuento.test.js`).
    *   Se utiliza `describe` para agrupar una serie de tests relacionados (por ejemplo, `describe('clase de descuento fijo', ...)`).
    *   Cada test individual se define con la palabra clave `test` (por ejemplo, `test('el valor descontado de un descuento fijo', ...)`).
*   **Validaciones (Expect):**
    *   Se usa `expect(valor)` seguido de un "matcher" como `toBe` para validar que un valor es el esperado (por ejemplo, `expect(descuentoFijo.valor).toBe(20)`).
    *   **Manejo de Errores:** Para validar que se lanza un error, se usa `expect` sobre una función que encapsule el código que debería lanzar la excepción, y se utiliza `toThrow` o `toThrowError` con el mensaje de error esperado.
*   **Importancia de los Tests que Fallan:** Un test exitoso es aquel que falla cuando el código subyacente está mal, ya que **nos comunica explícitamente qué parte del código está fallando y por qué**, permitiendo corregirlo.
*   **Cobertura:** Es fundamental probar cada una de las **ramas posibles de ejecución** del código para lograr la mayor cobertura y asegurar que el código es correcto y contempla todos los casos de uso.

```js
//Ejemplo de un test unitario con Jest
//test/descuento.test.js
 import {DescuentoFijo, DescuentoPorCantidad, DescuentoPorcentual} from '../src/descuento.js';

describe("Descuento fio",()=>{
    test("El valor descontado de un descuento fijo", ()=>{
        const descuentoFijo = new DescuentoFijo(20)
        expect(descuentoFijo.valor).toBe(20)
    })


    test("No se puede instanciar un descuento fijo con un valor negativo", () => {
        expect(() => {
            new DescuentoFijo(-20)
        }).toThrow("El valor del descuento no puede ser negativo")
    })
})

```

**2. Testing de Integración:**

*   **Definición:** El objetivo de los tests de integración es **testear cómo los componentes se relacionan entre sí** y si la integración entre ellos funciona correctamente. Esto puede incluir la interacción entre `controller`, `service` y `repository`, o incluso entre varias aplicaciones.
*   **Herramienta principal:** Se utiliza la dependencia **Supertest** para simular llamadas reales a los *endpoints* de la aplicación.
*   **Mocking:**
    *   **Concepto:** Para lograr cierto grado de aislamiento y facilitar los tests de integración, se usa el concepto de **mocks**. Los mocks son objetos que simulan ser otros, permitiendo **simular las respuestas** de partes de la aplicación (como las respuestas de la base de datos a través del repositorio).
    *   **Uso con Jest:** Jest proporciona funciones globales para moquear resultados de métodos (por ejemplo, `jest.fn().mockReturnValue(valor)` o `jest.fn().mockResolvedValue(valor)`).
    *   **Inyección de Dependencias:** Se configuran los *mocks* y se "inyectan" en las capas superiores (por ejemplo, el repositorio *mockeado* en el servicio, y el servicio en el controlador) para controlar el comportamiento de las dependencias.
    *   **Validar Llamadas a Métodos:** Una característica importante de los mocks es que permiten **validar si fueron llamados** (por ejemplo, `expect(repository.save).toHaveBeenCalled()`) y **con qué parámetros fueron llamados** (por ejemplo, `expect(repository.save).toHaveBeenCalledWith(expect.any(Producto))`).
*   **Ejemplo de Test de Integración:**
    *   Se inicializa el servidor de Express con las rutas necesarias.
    *   Se realiza una petición HTTP simulada (por ejemplo, `request(server.app).get('/products')`).
    *   Se validan características de la respuesta, como el **código de estado HTTP** (por ejemplo, `expect(response.status).toBe(200)`) y el **cuerpo de la respuesta** (por ejemplo, cantidad de productos, paginación, etc.).

    ```js
    import {buildTestServer} from '../src/server.js'
    import {productRoutes} from '../src/routes/productRoutes.js'

    const server = new buildTestServer
    server.addRoute(productRoutes)

    const productRepository = {
        findByPage : jest.fn().mockResolvedValue({
            products: [{id: 1, name: 'Producto 1'}, {id: 2, name: 'Producto 2'}],
            totalPages: 1,
            totalItems: 2
        }),

        countAll: jest.fn().mockResolvedValue(2),

        //Aca se definen todas las funciones que van a ser mockeadas
    }

    const productService = new ProductService(productRepository)
    const productController = new ProductController(productService)

    server.setController(ProductController,productController)

    describe("GET /products",()=>{
        test("",()=>{
            const response = await request(server.app).get("/products")
            expect(response.status).toBe(200)
            expect(response.page).toBe(1)
            expect(response.per_page).toBe(10)
            expect(response.per_page).toBe(10)
        })
    })

    describe("POST /products", () => {
    test("debe retornar un estado 201 y el producto creado", async () => {
        const newProduct = {
        nombre: "Producto 1",
        precioBase: 100,
        descripcion: "Descripcion 1",
        }

        productRepository.findByName = jest.fn().mockResolvedValue(null)

        productRepository.save = jest.fn()

        const response = await request(server.app)
        .post("/products")
        .send(newProduct)

        expect(response.status).toBe(201)
        expect(productRepository.save).toHaveBeenCalled()
        expect(productRepository.save).toHaveBeenCalledWith(expect.any(Producto))
    })
    })
    ```



*   **Postman para Tests de Integración:**
    *   Postman, además de ser una herramienta para probar manualmente el backend, permite **escribir tests scripteados** para validar las respuestas de la API.
    *   Estos tests se escriben en la pestaña "Scripts" de una request en Postman.
    *   La principal diferencia con los tests escritos en código es que en Postman **no se moquea nada**, lo que requiere tener la aplicación levantada en un entorno preparado para la ejecución de las pruebas.


**3. Linters (ESLint):**

*   **Problema que Resuelven:** JavaScript no controla errores comunes como nombres de variables mal escritos antes de la ejecución. Estos errores "tontos" solo saltan en tiempo de ejecución, lo que es molesto y potencialmente peligroso en producción.
*   **Solución:** Los **linters** son herramientas que realizan un **análisis estático previo del código** (antes de la ejecución) para validar estas cuestiones y encontrar problemas.
*   **Herramienta:** **ESLint** es el linter más común para JavaScript. Se instala como una dependencia de desarrollo (`npm install eslint --save-dev`) y se configura con un asistente interactivo que pregunta sobre el tipo de proyecto (módulos ES, Node.js, etc.).
*   **Configuración:** Se genera un archivo `eslint.config.js` donde se pueden añadir y configurar reglas para validar el código, como el uso de variables no utilizadas. También se configuran opciones para que ESLint reconozca variables globales de frameworks de testing como Jest.
*   **Beneficios:** Permite **detectar errores comunes y problemas de estilo en el código antes de la ejecución**, lo que ahorra tiempo de depuración y previene fallos en producción. La integración con el editor de código (como VS Code) muestra los errores directamente mientras se escribe el código.
