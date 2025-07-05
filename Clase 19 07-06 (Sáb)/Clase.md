### Árbol de Renderizado (Rendering Tree)
*   Al anidar componentes, se forman relaciones de **componentes padre e hijo**.
*   Cada componente padre puede, a su vez, ser hijo de otro componente.
*   React crea un **árbol de renderizado**, que está constituido por todos los componentes que se renderizan en un único paso.
*   Se puso como ejemplo una aplicación con `app.js` como el componente padre de todos, que definía rutas para mostrar diferentes componentes como la `homepage`. La `homepage` a su vez contenía componentes anidados como el banner, la barra de navegación (navbar) y los productos.

### Renderizado Condicional (Conditional Rendering)
*   Se definió como la capacidad de **mostrar o no mostrar elementos HTML** dependiendo de diferentes condiciones.
*   Permite renderizar JSX (sintaxis para mezclar JavaScript con HTML) de forma condicional, utilizando sintaxis de JavaScript.
*   Para volver a la sintaxis de JavaScript dentro de JSX, se deben usar **llaves `{}`**.
*   Las formas de implementar el renderizado condicional son:
    *   **Declaraciones `if`**.
    *   **Operador `&&` (AND)**: Renderiza JSX cuando una condición es verdadera y no renderiza nada en caso contrario.
    *   **Operadores ternarios (`condición ? expresión1 : expresión2`)**: Permite evitar la duplicación del `return` y mostrar algo distinto según la condición.

### Hooks de React
*   Los Hooks son **funciones de JavaScript que permiten utilizar características de React** (como manejar el estado y el ciclo de vida de los componentes) **dentro de componentes funcionales**.
*   Históricamente, React usaba componentes de clase para esto, pero a partir de la versión 16, los Hooks permiten estas funcionalidades en componentes funcionales.
*   **Reglas de los Hooks**:
    1.  Solo se pueden llamar **dentro de componentes funcionales**.
    2.  Solo se pueden llamar en el **nivel superior de un componente** (al principio, antes del `return`), no dentro de condicionales, bucles o funciones anidadas.
    3.  **No pueden ser condicionales**: se utilizan siempre, y si una condición no los usa, la situación lo gestiona.
*   Se mencionó la posibilidad de crear **Hooks personalizados** para reutilizar lógica con estado en varios componentes.

### Tipos de Hooks
La clase hizo hincapié en `useState` y `useEffect`, pero se mencionaron otros tipos de Hooks:
*   **De estado (`useState`, `useReducer`)**: Permiten que un componente "recuerde" información, como la entrada del usuario, y manipular el estado para que el componente se vuelva a renderizar. Sin ellos, los cambios de variables no generan dinamismo en la interfaz.
*   **De efecto (`useEffect`)**: Permiten ejecutar código **después de que el componente se renderiza**, basado en dependencias concretas. Son útiles para efectos secundarios como obtener datos de APIs, actualizar directamente el DOM o usar temporizadores.
*   **De referencia (`useRef`)**: Para manejar referencias directamente a nodos del DOM y rescatar información que no se utiliza para la renderización.
*   **De contexto (`useContext`)**: Permiten que un componente reciba información de componentes principales distantes sin pasarla como props, formando parte de la Context API de React. Este tema se verá con más detalle en clases futuras para manejar un estado global.
*   **De performance (`useMemo`, `useCallback`)**: Para optimizar el re-renderizado omitiendo trabajo innecesario, "cacheando" cálculos si los datos no cambiaron.

#### `useState` en Detalle
*   Sintaxis: **`[variableDeEstado, setterDeVariableDeEstado]`**. Por ejemplo: `[contador, setContador]`.
*   El `setter` (`setContador`) es una función que React sabe que modificará la variable de estado y **provocará un re-renderizado** del componente.
*   Recibe un **valor inicial** como argumento (ej. `useState(0)` para un contador inicializado en cero).

#### `useEffect` en Detalle
*   Sintaxis: **`useEffect(funciónDeEfecto, [arrayDeDependencias])`**.
*   La `funciónDeEfecto` contiene el código a ejecutar.
*   **React renderiza primero y luego ejecuta los efectos**; por lo tanto, `useEffect` se ejecuta después del primer renderizado.
*   Si una variable de estado se utiliza dentro del efecto, debe incluirse en el `arrayDeDependencias` para que el efecto se re-ejecute cuando esa variable cambie.
*   Un **array de dependencias vacío `[]`** significa que el efecto se ejecutará **solo una vez, al montar el componente** (útil para cargar datos de una API).

### Ejemplos Combinados y Aplicaciones Prácticas
*   **Contador simple**: Uso de `useState` para `count` y `useEffect` para actualizar el `document.title` al cambiar `count`.
*   **Integración con APIs (simulada)**:
    *   Se utilizó `useEffect` para llamar a una función que simulaba una API (`fetchProducts`) y `useState` para almacenar los productos obtenidos.
    *   Se introdujo una función `getProductsSlowly` para simular latencia con `setTimeout` (5000ms) y demostrar el uso de un **spinner** (componente de Material UI) con **renderizado condicional** para indicar la carga.
*   **Mejoras Visuales y Bibliotecas de Componentes**:
    *   Se introdujeron bibliotecas como **Material UI** y React Bootstrap para crear componentes visualmente atractivos y reutilizables.
    *   Se demostró la configuración de un **tema (theme)** con `ThemeProvider` para definir colores globales (ej. modo oscuro/claro), que encapsula toda la aplicación.
*   **Buscador en el Front-end**:
    *   Implementación de un campo de búsqueda con `TextField` de Material UI y un botón.
    *   Se usó `useState` para el texto de búsqueda (`searchText`) y para los productos filtrados (`filteredProducts`), actualizando el estado y re-renderizando el carrusel de productos.
    *   El evento `onChange` del `TextField` actualiza el `searchText` usando `e.target.value`.
    *   Se aclaró que, para grandes volúmenes de datos, el filtrado debería hacerse en el backend.
    *   Se mencionó la herramienta **React DevTools** para inspeccionar componentes y su estado.
*   **Control de Cantidad de Productos (Carrito)**:
    *   Se modificó el `ProductItem` para incluir botones de "más" y "menos" (`Button`, `ButtonGroup` de Material UI) para controlar la cantidad de cada producto.
    *   Se usó **`useState` para la cantidad (`quantity`)** de cada producto. Se demostró que **manipular una variable simple sin `useState` no provoca re-renderizado**, mientras que usar `setQuantity` sí lo hace.
    *   Se explicó el concepto de **"Prop Drilling" (pasamanos de props)**: la necesidad de pasar funciones y datos a través de múltiples componentes intermedios (ej. de `Homepage` a `Carousel` y luego a `ProductItem`) porque no hay un estado global disponible aún. Se indicó que esto se resolverá en la próxima clase con el "contexto global".
    *   Se enfatizó que es una **mala práctica** que un componente hijo modifique directamente el estado del padre; en su lugar, el padre debe pasar una función (un "handler") que el hijo llame para solicitar la modificación.
*   **Formularios y `useNavigate` (Checkout)**:
    *   Creación de una nueva ruta `/checkout` y navegación a ella usando el Hook **`useNavigate`** (para navegación programática, alternativa a `Link`).
    *   Creación de un formulario con `TextField`s para capturar datos (nombre, apellido, email).
    *   Manejo del estado del formulario con **`useState` (`formData`)** para almacenar los valores de los campos.
    *   Implementación de una función `setValue` para actualizar dinámicamente `formData` a medida que el usuario escribe, utilizando `e.target.value`.
    *   **Validación básica del formulario**: deshabilitar el botón de submit (`disabled` prop) si los campos requeridos no están completos, usando renderizado condicional.
    *   Mención de **`e.preventDefault()`** en el evento `onSubmit` para evitar el comportamiento predeterminado del formulario (recargar la página).
    *   Se demostró cómo el `formData` en el estado se actualiza correctamente y se imprime en consola al hacer submit.
    *   Se discutió brevemente la implementación de formularios en el TP, sugiriendo el uso de validaciones más complejas y la precarga de datos del usuario desde un contexto global en el futuro. La seguridad de las contraseñas, como JWT, se mencionó brevemente como fuera del alcance de la clase.

