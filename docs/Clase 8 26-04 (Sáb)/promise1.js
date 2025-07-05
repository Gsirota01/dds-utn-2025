function tareaAsincrona(){

    return new Promise ((res, rej)=>{
        const random = Math.random()
        if(random <= 0.5) {
            resolve("Datos obtenidos.")
        }else{
            reject
        }
    })
}