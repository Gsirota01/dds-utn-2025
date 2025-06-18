[[26/04/2025]]

Temas:
- Construcción de una API simple sin persistencia - Parte II.
- Incorporación de manejo de errores

- Asincronismo

![tareaAsincrona](image.png)

<span style="color:#ffff66">_Reject, resolve_</span>: Funciones a las que se acceden en el constructor de una promesa

_Si sale bien se ejecuta el then, si sale mal se captura con el catch_

![then catch](image-1.png)

La palabra reservada async ya hace que la función devuelva una promesa
![alt text](image-2.png)

por lo tanto en caso de no querer que nos tire abajo el proceso principal se puede agregar un catch: 

![alt text](image-3.png)




![alt text](image-4.png)