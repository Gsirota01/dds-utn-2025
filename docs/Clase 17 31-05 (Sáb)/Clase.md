### Repaso de Renderizado (SSR vs. CSR)
En una arquitectura web típica cliente-servidor:
*   **Server-Side Rendering (SSR) / Cliente Liviano:** El servidor devuelve directamente una vista **HTML ya formada**. La lógica de interacción recae en el servidor. Ejemplos: Wikipedia.
*   **Client-Side Rendering (CSR) / Cliente Pesado:** El servidor devuelve **JSON**, y la vista debe ser generada por el cliente. Esto puede hacer que la **carga inicial sea más lenta** porque se debe renderizar el JavaScript. El procesamiento en el cliente es mucho mayor, implicando mayor uso de memoria y batería en dispositivos móviles. La lógica de interacción recae en el cliente. Ejemplos: LinkedIn, Instagram.

### El DOM y el Virtual DOM
*   **DOM (Document Object Model):** Es una representación estructurada de un documento HTML o XML en forma de árbol jerárquico. JavaScript se usa para manipular este DOM, permitiendo a los desarrolladores interactuar dinámicamente con el contenido y la estructura de una página web (ej., cambiar colores al hacer clic en un botón).
*   **Virtual DOM:** React utiliza una **representación en memoria** de los elementos DOM reales de una página web. Es una **abstracción basada en JavaScript** que existe completamente en memoria y es una copia del DOM real.
    *   **Eficiencia:** Al manipular esta representación virtual en lugar del DOM real, las actualizaciones son más eficientes.
    *   **Proceso:** Cuando el estado de la aplicación cambia, React crea un **nuevo árbol del Virtual DOM**. Luego, compara este nuevo Virtual DOM con el anterior mediante un proceso llamado **reconciliación**, identificando las diferencias. Finalmente, React aplica **solo las actualizaciones necesarias al DOM real**, lo que optimiza el proceso al no tener que renderizar todo el DOM de nuevo.

### ¿Qué es React?
*   **Origen:** Fue desarrollado por **Facebook** y se hizo **open source en 2013**.
*   **Propósito:** Surge de la necesidad de Facebook de manejar la **constante renderización del DOM** debido a la alta interacción en su plataforma (nuevas publicaciones, notificaciones), lo cual generaba mucho consumo de memoria y no era eficiente al cargar toda la aplicación de nuevo.
*   **Definición:** React es una **biblioteca de JavaScript** para construir interfaces de usuario **declarativas y basadas en componentes**.
*   **Características Clave:**
    *   **Componentes:** Son **bloques de código reutilizables** que representan una pieza de la interfaz de usuario con su propia lógica y apariencia. Pueden ser pequeños (un botón) o grandes (una página completa). Fomentan la **reutilización** para facilitar cambios y mantenimiento (ej., cambiar el color de todos los botones en un solo lugar). En código, un componente es una **función de JavaScript que devuelve marcado utilizando JSX**.
    *   **Virtual DOM:** (Ya explicado arriba).
    *   **JSX (JavaScript XML):** Una sintaxis que permite escribir **etiquetas HTML directamente dentro del código JavaScript**. Por ejemplo, se puede tener una función JavaScript que retorna un botón como etiqueta HTML.


### Práctica de React
* **Repositorio de la clase:** [Repositorio de la clase](https://github.com/ddso-utn/esto-es-happy-new-year)

### Levantando una Aplicación React
*   **`create-react-app`:** Es una forma de crear aplicaciones SPA en React con un setup sencillo y sin necesidad de mucha configuración.
    *   **Estado actual:** Aunque es oficial, está **deprecado** y no tendrá mantenimiento. Se utiliza en la clase por su facilidad de configuración para empezar a trabajar rápidamente.
    *   **Vulnerabilidades:** La dependencia `react-scripts` que usa `create-react-app` puede introducir vulnerabilidades en aplicaciones en producción.
*   **Comandos:**
    *   `npx create-react-app nombre-de-tu-app`: Para crear la aplicación.
    *   `npm start`: Para iniciar la aplicación de React, generalmente en el puerto 3000.
*   **Hot Reloading:** Durante el desarrollo, al guardar cambios en Visual Studio Code, la página se recarga automáticamente sin necesidad de recargarla manualmente en el navegador.

### Estructura y Refactorización de Componentes
*   **`index.html` y `index.js`:** En una SPA, `index.html` sigue siendo el punto de partida, pero está "cubierto" por `index.js`, que crea un `div` básico como la raíz de la aplicación.
*   **Organización:** Es recomendable **segmentar la aplicación en componentes**.
    *   Evitar poner toda la aplicación en `App.js`.
    *   Crear **nuevos archivos para componentes** (ej., `Header.jsx`, `Navbar.jsx`).
    *   Los elementos deben estar **envueltos en una única etiqueta** (un `div` o un **React Fragment** `<></>`) al ser retornados por una función componente.
    *   Los componentes deben ser **exportados** (ej., `export default Header`) para poder ser importados en otros archivos.
    *   Importancia de **segmentar también el CSS** por componente para mantenerlo más organizado y personalizado.
*   **Estructura de Carpetas Sugerida:**
    *   `components`: Para componentes reutilizables.
    *   `features` o `pages`: Para las distintas vistas o páginas de la aplicación (ej., `Home.jsx`, `ProductPage.jsx`).

### Comunicación entre Componentes: Props
*   **Propiedades (Props):** Los componentes pueden recibir **parámetros** o propiedades del componente padre al componente hijo.
*   **Personalización:** Permiten que los componentes sean **personalizables y dinámicos** (ej., pasar un nombre de usuario al `Header` para un mensaje personalizado).
*   **Renderización:** Si los props cambian, el componente se volverá a renderizar.
*   **Desestructuración:** Las props, que son un objeto, pueden desestructurarse en los parámetros de la función componente para acceder directamente a sus atributos (ej., `function ProductItem({ product, key })`).

### Renderizado de Listas y la Prop `key`
*   **Función `map`:** Para mostrar listas de elementos (ej., productos), se utiliza el método **`map` de JavaScript** sobre una colección (un array). Esto transforma cada elemento de la colección en un componente React (ej., `ProductItem`).
*   **Prop `key`:** Es **necesaria** al usar `map` para renderizar una lista de componentes. Ayuda a React a identificar qué elementos han cambiado, se han agregado o se han eliminado. Debe ser **única y estable** para cada elemento de la lista (ej., `product.id` o un `index` si no hay un ID único).

### Enrutamiento con React Router DOM
Para manejar el cambio de vistas en una SPA, se utiliza la biblioteca **React Router DOM**.
*   **Instalación:** `npm install react-router-dom`.
*   **Componentes Clave:**
    *   **`BrowserRouter`:** El componente principal que envuelve toda la aplicación para habilitar el enrutamiento.
    *   **`Routes`:** Un contenedor para todas las definiciones de rutas.
    *   **`Route`:** Define una ruta específica. Recibe un `path` (la URL) y un `element` (el componente a renderizar).
        *   **Rutas Dinámicas:** Se usa un **`:` (dos puntos)** para definir un parámetro dinámico en la URL (ej., `path="/products/:title"`).
        *   **`index` prop:** Se usa para indicar que una ruta es la principal dentro de un `Route` padre con un `layout` (ej., `<Route index element={<HomePage />} />`).
    *   **`Link`:** Un componente utilizado para crear **enlaces internos** dentro de la aplicación. Similar a la etiqueta `<a>` de HTML, pero maneja el enrutamiento sin recargar la página completa. Recibe la prop `to` para indicar la ruta de destino.
*   **`useParams` Hook:** Es un **hook de React Router** que permite **acceder a los parámetros dinámicos de la URL** (ej., obtener el `title` de `/products/:title`) dentro de un componente.
*   **Renderizado Condicional (`Conditional Rendering`):** Permite mostrar o no un componente o parte de la UI basándose en una condición (ej., mostrar "Product not found" si un producto no se encuentra).

### Layouts y `Outlet`
*   **Concepto:** Para mantener **componentes fijos** (como el header y el footer) en todas las vistas, se puede crear un componente **`Layout`**.
*   **Implementación:**
    *   Se define una **ruta padre** que renderiza el `Layout`.
    *   Dentro del `Layout` se colocan los componentes que deben ser comunes (ej., `Header`, `Navbar`, `Footer`).
    *   Se usa el componente **`Outlet` de React Router** dentro del `Layout` para indicar dónde se debe renderizar el contenido específico de las rutas hijas.
    *   Las rutas hijas se anidan dentro de la ruta padre del `Layout`.

### Próximos Pasos y Trabajo Práctico
*   Se continuará explorando los **Hooks de React** para trabajar con el **estado del componente** y manejar la información dinámica (ej., filtrado, carga de nuevos productos).
*   **Tarea/Recomendación:** Instalar el repositorio de la clase, correr la aplicación, y experimentar añadiendo más componentes (como el footer) y jugando con la estructura.
*   **Trabajo Práctico (TP):** Los conceptos vistos son cruciales para la **entrega 3 y 4 del TP**, donde se debe implementar la parte de **front con integración al backend**. Se recomienda comenzar a implementar las pantallas básicas para no acumular el trabajo.
*   **Modelado de Diseño:** Para esbozar el diseño de una página web, se recomienda usar **wireframes** y herramientas como **Figma**.