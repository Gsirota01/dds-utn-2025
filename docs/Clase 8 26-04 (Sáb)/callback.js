console.log("Esto está antes del llamado asíncrono.")

setTimeout(
() => {console.log ("Tarea asíncrona resuelta.")},3000)


console.log("Esto está despues del llamado asíncrono.")