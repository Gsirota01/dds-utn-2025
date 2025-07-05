Un **custom hook** y **Emotion** son conceptos diferentes pero ambos se usan comúnmente en aplicaciones de React. Te explico cada uno:

---

### ✅ ¿Qué es un **Custom Hook**?

Un **custom hook** (hook personalizado) es una función en React que te permite reutilizar lógica de estado o efectos entre componentes. Se escribe usando otros hooks como `useState`, `useEffect`, `useContext`, etc.

#### 🔹 ¿Por qué usarlo?

Para **extraer lógica repetida** de los componentes y hacer el código más limpio y reutilizable.

#### 🔹 Ejemplo:

```js
// useContador.js
import { useState } from 'react';

function useContador(inicial = 0) {
  const [contador, setContador] = useState(inicial);

  const incrementar = () => setContador(c => c + 1);
  const decrementar = () => setContador(c => c - 1);
  const resetear = () => setContador(inicial);

  return { contador, incrementar, decrementar, resetear };
}

export default useContador;
```

```js
// En un componente
import useContador from './useContador';

function Contador() {
  const { contador, incrementar, decrementar, resetear } = useContador(5);

  return (
    <div>
      <p>Valor: {contador}</p>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={resetear}>Reset</button>
    </div>
  );
}
```

---

### 🎨 ¿Qué es **Emotion**?

**Emotion** es una librería de **CSS-in-JS** para React. Permite escribir estilos directamente dentro de tus componentes usando JavaScript o TypeScript, lo que da mucha flexibilidad.

#### 🔹 Dos formas principales de usar Emotion:

1. **Styled components** (como styled-components):

   ```js
   /** @jsxImportSource @emotion/react */
   import styled from '@emotion/styled';

   const Boton = styled.button`
     background: hotpink;
     color: white;
     padding: 10px;
   `;

   function App() {
     return <Boton>Click</Boton>;
   }
   ```

2. **CSS prop** (una prop especial que permite pasar estilos directamente):

   ```js
   import { css } from '@emotion/react';

   function App() {
     return (
       <div
         css={css`
           color: hotpink;
           font-size: 20px;
         `}
       >
         Hola mundo
       </div>
     );
   }
   ```

#### 🔹 ¿Por qué usar Emotion?

* Estilos dinámicos basados en props o estado.
* Scoped por defecto (no hay colisiones de clases).
* Es compatible con TypeScript.
* Buena performance.

---

### 🔁 Comparación: Custom Hook vs Hook Normal

| Aspecto                 | Hook normal (`useState`, `useEffect`, etc.)               | Custom hook (creado por vos)                              |
| ----------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| ¿Quién lo crea?         | Lo provee React (`react` package)                         | Lo creás vos mismo con lógica propia                      |
| ¿Para qué sirve?        | Manejar estado, efectos, contexto, refs, etc.             | Reutilizar lógica que combina uno o varios hooks normales |
| ¿Dónde se usa?          | Dentro de componentes funcionales o de otros custom hooks | Dentro de componentes o de otros custom hooks             |
| ¿Nombre?                | Siempre empieza con `use` (e.g. `useState`)               | También debe empezar con `use` (e.g. `useMiHook`)         |
| ¿Se puede personalizar? | No, su comportamiento es fijo                             | Sí, totalmente — es lógica de React que vos definís       |

---

### 🔧 Ejemplo práctico comparando

#### ✅ Usando un **hook normal**:

```js
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>Tiempo: {seconds}</p>;
}
```

#### 🔁 Extrayendo a un **custom hook**:

```js
// useTimer.js
import { useState, useEffect } from 'react';

function useTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return seconds;
}

export default useTimer;
```

```js
// Timer.js
import useTimer from './useTimer';

function Timer() {
  const seconds = useTimer();
  return <p>Tiempo: {seconds}</p>;
}
```

#### 🧠 ¿Qué ganamos con el custom hook?

* Reutilización: podés usar `useTimer()` en varios componentes sin copiar la lógica.
* Limpieza: el componente `Timer` es más simple y enfocado en renderizar.

---


*   **CSS-in-JS (CSS dentro de JavaScript)**:
    *   **Concepto**: Es un patrón donde el CSS se escribe y compone usando JavaScript, en lugar de definirlo en archivos `.css` externos.
    *   **Bibliotecas de Terceros**: No es una característica nativa de React, sino que es proporcionada por bibliotecas externas.
    *   **Ventajas**: Puede ser útil para evitar la incomodidad de tener un archivo CSS separado por cada componente, permitiendo tener todo junto. También ayuda a evitar duplicaciones, superposiciones y errores al generar nombres de clase únicos automáticamente, lo que soluciona problemas con CSS global. Los estilos se eliminan automáticamente si el componente no se usa.
    *   **Ejemplos de Bibliotecas**:
        *   **Emotion**: Permite escribir estilos CSS con JavaScript y ofrece una composición potente de estilos.
        *   **Styled Components**: Se enfoca en crear componentes ya estilados, inyectando los estilos de forma automática. Permite definir estilos directamente en variables o componentes que luego se renderizan como etiquetas HTML estiladas.
    *   **Recomendación**: La clase mencionó que React generalmente sugiere definir estilos en archivos CSS separados y referenciarlos con `className`. El uso de CSS-in-JS es una alternativa para casos específicos donde se prefiera encapsular estilos directamente con los componentes.
