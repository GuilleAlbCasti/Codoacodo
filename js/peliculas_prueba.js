/*FUNCIÓN PARA PASAR DE PÁGINA*/
let pagina= 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 348) {
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
})


/*FUNCIÓN PARA C0NSUMO DE API*/
const cargarPeliculas = async() => {
    
    const URL = `https://movies-app1.p.rapidapi.com/api/movies?page=${pagina}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5ea0ca8a6bmshc3e3483d6f8eee6p112f02jsn97b1966321ca',
            'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com',
        }
    };

    try {
        const respuesta = await fetch(URL, options);

        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                        <div class="contenedorimagen">
                            <img class="banner" src="${pelicula.image}">  
                            <div class="textoimagen">
                                <div class="divtexto">
                                    <h2 class="titulo">${pelicula.title}</h2>
                                    <p>Sipnosis: </p>
                                    <p>${pelicula.description}</p>
                                    <hr>
                                    <p>Dirección: </p>
                                    <p>.........</p>
                                </div>
                                <button class="btnTrailer" onClick='cargarIframe(#)'>Ver Trailer</button>
                            </div>
                        </div>
                    `;
            });
/*
    <section class="flex">
        <div class="contenedorimagen">
            <img class="banner" src="img/Interestelar-002.jpg">
            <div class="textoimagen">
                <div class="divtexto">
                    <h2>Interstellar</h2>
                    <p>Sipnosis: </p>
                    <p>Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial
                        para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar
                        una nueva vida allí. La Tierra está llegando a su fin y este grupo necesita encontrar un planeta
                        más allá de nuestra galaxia que garantice el futuro de la raza humana.</h3>
                    </p>
                    <hr>
                    <h4>Dirección:Christopher Nolan <br>
                        Protagonistas:Matthew McConaughey <br>
                        Anne Hathaway <br>
                        Jessica Chastain <br>
                        Bill Irwin <br>
                        Ellen Burstyn <br>
                        Michael Caine <br>
                        Matt Damon</h4>
                </div>
                <button onClick='cargarIframe("https://www.youtube.com/embed/zSWdZVtXT7E")'>Ver Trailer</button>
            </div>
        </div>
    </section>

    */




            document.getElementById('contenedor').innerHTML = peliculas;
        
        } else {
            console.log("Hay un error");
            }

    } catch(error) {
        console.log(error);
        }
}
cargarPeliculas();

