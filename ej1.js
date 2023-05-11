function ejercicio(palabra = "") {
    //seprar caracteres, invertirlos e unirlos al final
    let arreglo = []
    // palabra.forEach(element => {
    //     arreglo.push(element)
    // });

    for (let i = 0; i < palabra.length; i++) {
        const element = palabra[i];
        arreglo.push(element)
    }
    
    let arregloInvertido = []
    for (let i = arreglo.length - 1; i >= 0; i--) {
        const element = arreglo[i];
        arregloInvertido.push(element)
    }

    let palabraInvertida = ""
    for (let i = 0; i < arregloInvertido.length; i++) {
        const element = arregloInvertido[i];
        palabraInvertida += element
    }

    return (palabra === palabraInvertida)
}

console.log(ejercicio("otto"))