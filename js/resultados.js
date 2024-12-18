document.addEventListener('DOMContentLoaded', async () => {
    //vamos a guardar el variables ciertos elementos del dom que se mostrarán en la interfaz del juego
    let puntuacionUsuario = document.getElementById('puntuacion');
    let dificultadUsuario = document.getElementById('dificultad');
    let tiempoUsuario = document.getElementById('tiempo');
    let nombre = document.getElementById('nombre');
    nombre.textContent = 'HAS PERDIDO ' + localStorage.getItem('nombre');
    puntuacionUsuario.textContent = 'Has alcanzado una puntuaciòn de: ' + localStorage.getItem('puntuacion');
    dificultadUsuario.textContent = 'Has jugado en una dificultad: ' + localStorage.getItem('dificultad');
    tiempoUsuario.textContent = 'Has estado jugando :' + localStorage.getItem('tiempoJugado') + 's';

    //redirecciones
    let reiniciar = document.getElementById('reiniciar');
    let inicio = document.getElementById('inicio');

    reiniciar.addEventListener('click', () =>{
        localStorage.removeItem('dificultad');
        localStorage.removeItem('tiempoJugado');
        localStorage.removeItem('puntuacion');
        window.location.href = '../html/instrucciones.html';
        
    })
    inicio.addEventListener('click', () =>{
        localStorage.clear();
        location.href = '../index.html';

    })
})