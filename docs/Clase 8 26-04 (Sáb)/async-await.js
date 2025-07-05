async function obtenerUsuarios() {
    let data
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
        data = await response.json()
    } catch {
        data = { error: "Error al obtener los datos." }     
    } 
    return data
}

async function imprimirUsuarios() {
    const usuarios = await obtenerUsuarios(2)
    console.log(usuarios)
}
imprimirUsuarios().catch(e => {
    // Contingencia del error... Cuidado con tirar el server!
})

// obtenerUsuarios().then(d => {
//     console.log(d)
// })
