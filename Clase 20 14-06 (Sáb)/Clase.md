La clase se centró en la **integración del front-end con el back-end utilizando Axios** y en el **manejo del estado global en React a través de la Context API**. El objetivo principal fue refactorizar una aplicación existente para incorporar estas herramientas y mejorar la gestión de datos, especialmente en un carrito de compras.

Aquí tienes un resumen completo de los temas tratados:

### Integración Front-End/Back-End con Axios

*   **Eventos que disparan llamadas al backend**: Cualquier acción que requiera datos del servidor, como la carga inicial de una página, inicios de sesión, envío de formularios, apertura de modales, o el uso de un buscador del lado del back-end.
*   **Dónde realizar las llamadas**: Se recomienda hacerlas en archivos especializados como "services" o "APIs" para una mejor organización y para facilitar el "mocking" (simulación de respuestas del back-end).
*   **Manejo de estados de carga y errores**: Es crucial mostrar "spinners" o "skeletons" durante las llamadas al back-end para indicar que se está esperando una respuesta. También se debe manejar explícitamente los errores, por ejemplo, mostrando un modal de error.
*   **Axios como cliente HTTP**: Es una biblioteca basada en promesas para Node.js y navegadores que facilita las peticiones HTTP.
    *   **Características**: Soporta la API de Promise, intercepta `requests` y `responses`, transforma datos JSON automáticamente y protege contra `cross-site forgery`.
    *   **Uso básico**: Se realiza una petición `GET` o `POST` a una URL, se pueden incluir parámetros (`params`) y `headers`. La data de la respuesta se encapsula en el atributo `data` de la `response`.
    *   **Manejo de errores**: Es fundamental usar `try-catch` para capturar errores en las llamadas a la API.
    *   **Ejemplo de llamada API con paginación**:
        ```javascript
        // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Definida en .env para variables globales
        // En un archivo de servicios, por ejemplo:
        const getProducts = async (pageNumber, pageSize) => { // Recibe el número y tamaño de la página
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products`, { // URL base y endpoint
                    params: {
                        pageNumber: pageNumber, // Parámetro de paginación
                        pageSize: pageSize // Parámetro de tamaño de página
                    }
                });
                console.log(response); // Para ver la estructura de la respuesta de Axios
                return response.data; // Devuelve la data, que incluye productos, pageNumber, totalPages, etc.
            } catch (error) {
                console.error("Error al obtener productos:", error);
                // Manejar el error, por ejemplo, mostrar un mensaje global
            }
        };
        ```
*   **Paginación**: Se enfatizó la importancia de la paginación del lado del back-end para evitar cargar una gran cantidad de datos en el front-end, lo que podría consumir mucho ancho de banda y memoria del navegador.
    *   La API devuelve información sobre la página actual y el total de páginas (`page number`, `total pages`).
    *   El front-end maneja el `page number` y llama a la API nuevamente cuando cambia.
    *   Se implementaron funciones `handlePrev` y `handleNext` para navegar entre páginas, con validaciones para no ir más allá de la primera o última página.

### Context API de React para Manejo de Estado Global

*   **Problema del "Prop Drilling"**: Consiste en tener que pasar `props` a través de muchos niveles de componentes (`padre` -> `hijo` -> `nieto`, etc.), incluso cuando los componentes intermedios no necesitan esas `props`, solo las retransmiten. Esto hace el código denso y difícil de mantener.
*   **Solución: React Context API**: Permite que un componente padre provea datos a todo el árbol de componentes debajo de él sin la necesidad de pasar `props` directamente.
*   **Tres pasos para usar Context**:
    1.  **Crear un Contexto**: Se usa la función `createContext` de React. Recibe un valor inicial que puede ser un objeto vacío o cualquier estructura de datos.
        ```javascript
        import { createContext } from 'react';
        export const CardDrawerContext = createContext({}); // Exporta el contexto
        ```
    2.  **Proveer el Contexto (Provider)**: Se crea un componente "Provider" que "envuelve" a los componentes hijos que necesitan acceder a los datos. Este `Provider` es quien manejará el estado (`useState`) y las funciones que modificarán dicho estado.
        ```javascript
        import React, { useState } from 'react';
        import { CardDrawerContext } from './cardContext'; // Importa el contexto creado

        export const CardDrawerContextProvider = ({ children }) => { // Recibe 'children' como prop
            const [wishProducts, setWishProducts] = useState([]); // Estado para productos en el carrito
            const [openDrawer, setOpenDrawer] = useState(false); // Estado para abrir/cerrar el carrito (drawer)

            // Funciones para manejar el estado global, por ejemplo:
            const addWishProductWithAmount = (product, amount) => {
                // Lógica para añadir/actualizar cantidad de productos en wishProducts
                setWishProducts(prevProducts => {
                    const existingProduct = prevProducts.find(p => p.id === product.id);
                    if (existingProduct) {
                        return prevProducts.map(p =>
                            p.id === product.id ? { ...p, cantidad: Math.max(0, p.cantidad + amount) } : p
                        );
                    } else {
                        return [...prevProducts, { ...product, cantidad: Math.max(0, amount) }];
                    }
                });
            };

            const toggleDrawer = () => { // Función para alternar la visibilidad del drawer
                setOpenDrawer(prevOpen => !prevOpen);
            };

            const removeProduct = (productId) => {
                // Lógica para poner la cantidad en cero o eliminar el producto
                setWishProducts(prevProducts =>
                    prevProducts.map(p => (p.id === productId ? { ...p, cantidad: 0 } : p))
                );
            };

            return (
                <CardDrawerContext.Provider value={{ // Se proveen los estados y funciones a los hijos
                    wishProducts,
                    addWishProductWithAmount,
                    openDrawer,
                    toggleDrawer,
                    removeProduct,
                    // Otros estados o funciones como filterProducts
                }}>
                    {children} {/* Los componentes hijos se renderizan aquí */}
                </CardDrawerContext.Provider>
            );
        };
        ```
    3.  **Usar el Contexto (Consumer)**: Los componentes hijos importan el hook `useContext` y lo usan para acceder a los valores proveídos por el `Provider`.
        ```javascript
        import { useContext } from 'react';
        import { CardDrawerContext } from '../store/cardContext'; // Ruta al contexto

        function ProductItem({ product }) {
            const { addWishProductWithAmount, wishProducts } = useContext(CardDrawerContext); // Acceso a estados y funciones

            const isInWishProducts = wishProducts.some(p => p.id === product.id && p.cantidad > 0); // Validación si el producto ya está en el carrito

            const handleAddClick = () => {
                addWishProductWithAmount(product, 1); // Llama a la función del contexto para añadir
            };

            // ... renderiza el item, mostrando la cantidad si está en wishProducts, o 0 si no
            return (
                // ... JSX del ProductItem
                <span>Cantidad: {isInWishProducts ? wishProducts.find(p => p.id === product.id).cantidad : 0}</span>
                <button onClick={handleAddClick}>+</button>
                // ...
            );
        }
        ```
*   **Cuándo usar Context vs. Props**: No descarta el uso de `props`. Si un comportamiento es muy particular entre dos o tres componentes y no tiene sentido elevarlo a un contexto global, se pueden seguir usando `props`. También se pueden crear múltiples contextos si es necesario.

### Refactorización de la Aplicación de Carrito de Compras

Se realizó un refactoring significativo para trasladar la lógica del manejo del estado desde los componentes individuales (`Homepage`, `ProductItem`, `Carousel`) hacia el nuevo `CardDrawerContext`.

*   **Manejo de `WishProducts` (Productos del carrito)**: A diferencia de los productos traídos de la API (que pueden cambiar con la paginación), los `wishProducts` se manejan en el contexto para asegurar que persistan en el carrito sin perder la cantidad seleccionada por el usuario.
*   **Lógica de filtrado de productos**: La función `filterProducts` (originalmente en `Homepage`) también se puede trasladar al contexto para centralizar la lógica. Sin embargo, se mencionó que en retrospectiva, podría haber funcionado solo con `Homepage`.
*   **Manejo de cantidades**: La función que actualizaba la cantidad de un producto (`setCantidadProducto`) se reemplaza por `addWishProductWithAmount` dentro del contexto. Esta función verifica si el producto ya está en `wishProducts` para actualizar su cantidad o lo agrega si es un producto nuevo.
*   **Implementación del `Drawer` del carrito**:
    *   Se creó un componente `ShoppingCardDrawer.js` que utiliza el componente `Drawer` de Material UI.
    *   La visibilidad del `Drawer` (`openDrawer`) y la función para alternar su estado (`toggleDrawer`) se manejan en el `CardDrawerContext`.
    *   El botón del `Navbar` ahora utiliza `toggleDrawer` para abrir/cerrar el carrito.
    *   El `Drawer` muestra los `wishProducts` usando un `map` y puede mostrar un mensaje si el carrito está vacío. También incluye la opción de eliminar un producto del carrito, lo que implica poner su cantidad en cero.
*   **Ubicación del `Provider`**: Para que todas las páginas que necesiten el contexto se beneficien, se sugiere envolver (`wrap`) el `CardDrawerContextProvider` a nivel de las rutas (ej. `BrowserRouter`), antes de que se rendericen los componentes que van a consumir el contexto.
*   **Manejo de errores globales**: Se propuso tener un contexto específico para manejar errores globales, lo que permitiría, por ejemplo, mostrar un modal de error desde cualquier parte de la aplicación cuando falla una llamada a la API.

En resumen, la clase proporcionó una base sólida para **integrar el front-end con un back-end paginado** y para **gestionar de manera eficiente el estado de una aplicación React utilizando la Context API**, resolviendo problemas como el "prop drilling" y garantizando la persistencia de datos cruciales como los productos en el carrito.