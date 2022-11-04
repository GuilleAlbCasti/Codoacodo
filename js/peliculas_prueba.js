const cargarPeliculas = async () => {
    
    try {
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5ea0ca8a6bmshc3e3483d6f8eee6p112f02jsn97b1966321ca',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com',
            }
        };
        
        const respuesta = await fetch('https://movies-app1.p.rapidapi.com/api/movies', options);

        if (respuesta.status === 200) {
            console.log(respuesta);
            const datos = await respuesta.json();
        } 
        
        else if (respuesta.status === 401) {
			console.log("Pusiste la key mal");
		} 
        
        else if (respuesta.status === 404) {
			console.log("La pelicula que buscas no existe");
		} 
        
        else {
			console.log("Hubo un error, si continua llame al 0800-444-xxx");
		}
    }
}; 

cargarPeliculas();
/*ME QUEDE TRATANDO DE ARMAR EL RESPONSIVE*/ 