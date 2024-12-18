document.addEventListener('DOMContentLoaded', async () => {
    let botonJugar = document.getElementById("jugar");
    let errores = 0; //errores del usuario inicializada en 0
    //la puntuacion la guardamos en la session
    let puntuacion = 0;
    let topoAleatorio = null;
    let div = null;
    //guardamos la dificultad elegida por el usuario
    let dificultad = localStorage.getItem('dificultad');
    let tiempo = 2000;
    let tiempoAnimacion = 2;
    let multiplicador = 0;
    let numeroDivs =0;
    let numeroTopos =0;

    if (dificultad === 'dificil') {
        multiplicador = 0.6;
        numeroDivs = 7;
        numeroTopos =7;
    } else if (dificultad === 'medio') {
        multiplicador = 0.75;
        numeroDivs = 6;
        numeroTopos =6;
    } else if (dificultad === 'facil') {
        multiplicador = 1;
        numeroDivs = 5;
        numeroTopos =5;
    }
    //generamos el area de juego dinamicamente
    let areaJuego = document.getElementById('instrucciones-article');
    let contador =1;
    for(let x=0; x<numeroDivs; x++){
        const contenedor = document.createElement('div');
        contenedor.className = `fila`;
        contenedor.style.marginBottom = '0.3rem';
        for(let y=0; y < numeroTopos; y++){
            const topos = document.createElement('div');
            topos.className ='divTopo';
            topos.id = `${contador}`;
            contador++;
            contenedor.appendChild(topos);
            const img = document.createElement('img');
            img.src = "../img/topo.png";
            img.className ='topo';
            topos.appendChild(img);
        }
        areaJuego.appendChild(contenedor);
    }
    let tiempoSesion = 100;
    let tiempoTopo = null; //tiempo que estara el topo iniciada en null
    //vamos a guardar el variables ciertos elementos del dom que se mostrarán en la interfaz del juego
    let puntuacionUsuario = document.getElementById('puntuacion');
    let dificultadUsuario = document.getElementById('dificultad');
    let erroresUsuario = document.getElementById('errores');
    let tiempoUsuario = document.getElementById('tiempo');
    dificultadUsuario.textContent = 'Nivel de dificultad: ' + localStorage.getItem('dificultad');
    let juego = document.getElementById('juego');
    tiempoUsuario.textContent = 'tiempo de sesion restante: ' + tiempoSesion + 's';
    let animacionActiva = false;
    botonJugar.addEventListener('click', () => { //evento click

        botonJugar.parentNode.removeChild(botonJugar); // Eliminar el boton con ID jugar una vez presionado
        //llevamos al area de juego
        areaJuego.scrollIntoView({behavior: 'smooth'});
        setTimeout(()=>{
            partida(); //empezamos partida     
        },1000)
        setInterval(() =>{//iniciamos el tiempo de sesion
            tiempoSesion--;
            tiempoUsuario.textContent = 'tiempo de sesion restante: ' + tiempoSesion + 's';
            if (tiempoSesion ===0){//cuando se acabe redirigimos a login
                localStorage.clear();               
                location.href = '/index.html';
            }
        }, 1000)
    });

    function partida() {

        if (error(errores) == true) {//cada vez que se llama a partida se comprobará el numero de errores del usuario
            localStorage.setItem('tiempoJugado', (100-tiempoSesion));//guardamos el tiempo jugado          
            location.href = '../html/resultados.html';//mandamos a resultados
            //vamos a hacer que por cada 3 aciertos el tiempo sea menor
        } else {            
            let numeroAleatorio = Math.floor(Math.random() * (numeroDivs*numeroTopos)) + 1; //creamos un numero aleatorio entre el 1 y el numero de topos, ambos incluidos
            div = document.getElementById(numeroAleatorio.toString()); //seleccionamos el id del div del numero aleatorio y mostramos el topo
            div.style.backgroundColor = 'rgba(177, 225, 254, 1)'; //cambiamos el color de fondo del div
            topoAleatorio = div.querySelector('.topo'); //cogemos la classe topo de la img
            topoAleatorio.style.opacity = 1; //la ponemos visible

            //ahora gestionamos el tiempo visible del topo
            tiempoTopo = setTimeout(() => {
                if (topoAleatorio.style.opacity === '1') {
                    //animacion de error
                    topoAleatorio.classList.add('sacudirTopo');
                    topoAleatorio.style.animationDuration = (tiempoAnimacion * multiplicador) + 's';
                    errores++; // Contar como error si no se hizo clic
                    erroresUsuario.textContent = 'Errores: ' + errores;
                    //ocultamos el topo y llamamos a partida despues de la animacion
                    setTimeout(() => {
                        topoAleatorio.style.opacity = 0;
                        div.style.backgroundColor = 'rgb(205, 172, 133)';
                        animacionActiva = false;
                        partida();
                    }, tiempo * multiplicador)

                }
            }, tiempo * multiplicador); //el multiplicador se aplica según la dificultad
        }

    }
    //Gestionamos los clicks del jugador
    juego.addEventListener('click', (event) => {
        if (event.target === botonJugar) return; //si el click es de inicio
        if (animacionActiva === true) return; // si hay animacion no cuenta los clicks
        animacionActiva = true;

        if (event.target !== topoAleatorio) { //si el click no es encima del topo
            clearTimeout(tiempoTopo); //paramos el tiempo del topo
            errores++;
            erroresUsuario.textContent = 'Errores: ' + errores;

            //animacion de error
            topoAleatorio.classList.add('sacudirTopo');
            topoAleatorio.style.animationDuration = (tiempoAnimacion * multiplicador) + 's';

            setTimeout(() => {
                topoAleatorio.style.opacity = 0;
                div.style.backgroundColor = 'rgb(205, 172, 133)';
                topoAleatorio.classList.remove('sacudirTopo');
                animacionActiva = false;
            }, (tiempo * multiplicador));

            //si hace click encima del topo
        } else if (event.target === topoAleatorio) {
            clearTimeout(tiempoTopo);
            //animacion del topo golpeado
            topoAleatorio.classList.add('rotarTopo');
            topoAleatorio.style.animationDuration = (tiempoAnimacion * multiplicador) + 's';

            setTimeout(() => {
                topoAleatorio.style.opacity = 0;
                div.style.backgroundColor = 'rgb(205, 172, 133)';
                topoAleatorio.classList.remove('rotarTopo');
                animacionActiva = false;

            }, (tiempo * multiplicador));

            puntuacion++; //sumamos puntuacion
            puntuacionUsuario.textContent = 'Puntuacion: ' + puntuacion; //mostramos al usuario            
        }
        setTimeout(() => { //sincronizamos con las animaciones y generamos nuevo topo en partida
            partida();
        }, (tiempo * multiplicador));

    })

    function error(errores) {
        //si el jugador ya tiene 3 errores
        if (errores === 3) {
            //guardamos la puntuacion en locaStorage
            localStorage.setItem('puntuacion', puntuacion);
            return true;
        }
    }
    //animacion con evento del raton cuando pasa el raton en la zona de juego
    juego.addEventListener('mouseenter', () => {
        juego.style.cursor = "url(../img/mazo.png) 32 25, pointer";
    })
})