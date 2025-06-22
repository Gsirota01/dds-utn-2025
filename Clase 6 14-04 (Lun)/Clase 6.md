Temas:
- Desarrollo Backend - Parte II
- Capa de Dominio Capa de Services, Capa de Controladores, Capa de Repositorios.
- Manejo de errores.

La clase del 14 de abril de 2025 se centró en la **orquestación de casos de uso** y la **organización de proyectos** a través de la **separación de responsabilidades en distintas capas**. El objetivo principal fue clarificar cómo asignar responsabilidades para el desarrollo de un caso de uso completo.

Los temas principales abordados en la clase fueron:

*   **Orquestación de casos de uso**: Se discutió la importancia de ordenar las ideas para asignar responsabilidades a diferentes capas y cómo desglosar un caso de uso para su desarrollo completo.
    *   Se planteó una **confusión conceptual común**: asignar responsabilidades de casos de uso directamente a clases que representan actores en el sistema (ej., una clase `Huesped` con un método `crearReserva`). Esto se considera incorrecto porque mezcla el modelo de dominio con la orquestación de casos de uso y la lógica de presentación.
    *   La solución propuesta es **separar claramente la lógica de orquestación (casos de uso) de los modelos de dominio y las políticas de acceso**. El foco no debe estar en *quién* lo hace, sino en *qué* se hace y *cómo* se orquesta la lógica de negocio. No todo actor en un diagrama de casos de uso se transformará necesariamente en una clase de dominio.

*   **Capas del sistema**: La clase profundizó en la responsabilidad de cada una de las siguientes capas:
    *   **Capa de Dominio**:
        *   Contiene la **lógica de negocio pura**, incluyendo reglas, validaciones, entidades y objetos de valor.
        *   Es el **corazón del sistema** y debe ser diseñada de forma **independiente de la infraestructura o *frameworks*** (agnóstica).
        *   Todo lo visto en materias previas como Paradigmas y Diseño de Sistemas (entidades, lógica de negocio, reglas) corresponde a esta capa.
        *   Ejemplos incluyen las clases `Alumno`, `Calificacion` y `Materia`, las cuales son consideradas entidades *core* del sistema.
        *   Las entidades son **ricas en lógica** y **autocontenidas y validadas** (ej., `Calificacion` valida la nota entre 0 y 10 en `setNota`).
        *   Se evita mezclar permisos, interfaces o actores externos.
        *   Ventajas incluyen facilidad de testeo, maximización de reutilización y flexibilidad, y evitación de modelos de dominio anémicos (clases sin métodos) y duplicación de reglas de negocio. También propicia los principios SOLID de Abierto/Cerrado y Sustitución de Liskov.

    *   **Capa de Repositorios**:
        *   **Encapsula el acceso al medio persistente** (memoria, archivos, bases de datos).
        *   **Traduce las entidades del dominio** a un formato persistible y viceversa.
        *   Propone la existencia de **objetos *repository*** con métodos para agregar, modificar, eliminar y buscar objetos (ej., `agregarAlumno`, `buscarPorLegajo`).
        *   Es crucial que las **entidades de dominio no conozcan la existencia de los repositorios**, pero los repositorios sí conocen las entidades de dominio, asegurando un acoplamiento unidireccional.
        *   No toda entidad de dominio necesita su propio repositorio.
        *   Ventajas: permite **cambiar la tecnología de persistencia sin alterar el dominio** y facilita el *testing* mediante *mocks* o implementaciones en memoria (ej., un repositorio en memoria para pruebas).
        *   Beneficia los principios SOLID de Segregación de Interfaces (I) e Inversión de la Dependencia (D).

    *   **Capa de Services**:
        *   **Orquesta la ejecución de una operación de negocio** y llama a los objetos de dominio, repositorios y otros utilitarios.
        *   Separa **el *cómo* se hace algo (dominio) del *cuándo* y *en qué orden* se hace**.
        *   Se enfoca en las **reglas de flujo** (la secuencia de acciones de un caso de uso), no las reglas de negocio puras (que están en el dominio).
        *   Ejemplo: el flujo de registrar una calificación incluye validar la existencia del alumno y la materia, crear la calificación, agregarla al alumno y persistirla.
        *   Los *services* reciben los repositorios como interfaces (inyección de dependencias), lo que los hace **independientes de la implementación concreta de la persistencia**.

    *   **Capa de Controladores**:
        *   Se encuentra por encima de la capa de *services* y por debajo de la capa de presentación.
        *   **Recibe las solicitudes externas** (de la web, de una API, etc.), las traduce al lenguaje de dominio, las delega a las capas inferiores (*services*) y devuelve una respuesta.
        *   **Expone los *endpoints* del sistema** (ej., rutas REST).
        *   Es responsable de manejar excepciones, **códigos de estado HTTP** (ej., 200 OK, 400 Bad Request, 404 Not Found, 201 Created) y **validaciones superficiales** (ej., tipos de datos, campos faltantes).
        *   **No debe contener lógica de negocio real**; es un delegador.
        *   Ejemplo: `AlumnoController` recibe una *request*, extrae datos, realiza validaciones superficiales, llama al `AlumnoService` y genera la *response* (generalmente JSON).
        *   La **interacción general del sistema** (desde que un actor llama hasta que se devuelve una respuesta) sigue el flujo: Controlador -> Service -> Repositorio -> Entidades de Dominio.
        *   Ventajas incluyen la independencia de cambios en el *frontend* (a menos que se añadan nuevos campos) y su enfoque en el parseo y la respuesta.

*   **Manejo de Errores y Validaciones**:
    *   Las **validaciones** se realizan en **distintos niveles** del sistema: cliente (UI), controladores, servicios, dominio y persistencia. Cada capa valida cosas diferentes, como tipos de datos, presencia de campos, reglas de negocio y consistencia interna.
    *   Un buen **manejo de errores** permite separar responsabilidades, facilita el *debugging*, proporciona respuestas útiles al usuario y permite un adecuado *logging* de problemas.
    *   Se recomienda **declarar errores personalizados** (ej., `NotFoundError`, `ValidationError`) para un mejor tratamiento de las excepciones.
    *   Se introdujo el concepto de **middleware global de errores** en *Express*, que puede interceptar y manejar excepciones lanzadas desde cualquier capa, mejorando la limpieza del código del controlador.

La clase también mencionó brevemente la importancia de la fase de **análisis de requisitos** para modelar solo lo necesario, evitando funcionalidades superfluas (principios KISS y YAGNI).