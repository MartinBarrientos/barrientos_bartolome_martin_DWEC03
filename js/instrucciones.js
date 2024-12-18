document.addEventListener('DOMContentLoaded', async () => {
    let botones = document.getElementsByClassName("boton");
    //iniciamos dificultad
    let dificultad = null;
    //iteramos
    for (let boton of botones){
        boton.addEventListener('click', () => {
            // Eliminar la clase 'presionar' de todos los botones
            for (let btn of botones) {
                btn.classList.remove('presionar');
            }
            //añade la clase presionar al pulsado
            boton.classList.add('presionar');
            dificultad = boton.getAttribute('id');
            localStorage.setItem('dificultad', dificultad);
        });
    }
    console.log(sessionStorage.getItem('usuario'))
    let enviar = document.getElementById("enviar");
    enviar.addEventListener('click', () => {
        //redirigimos a la pagina del juego si hemos seleccionado la dificultad
        if(dificultad != null){
            location.href = '../html/topoSmash.html'
        }else{
            alert('Tienes que seleccionar una dificultad');
            location.reload();
        }
        
    })
})
