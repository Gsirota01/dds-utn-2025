
setTimeout(
() => {
    console.log ("1. Tarea asíncrona resuelta.")
    setTimeout (()=>{
        console.log ("2. Tarea asíncrona resuelta.")
        setTimeout(()=>{
            console.log ("3. Tarea asíncrona resuelta."),3000      
        })
        
    },3000)
},3000
)

