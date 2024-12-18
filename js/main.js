//--------------VARIABLES GLOBALES---------------------//
const usuariosJsonPath = './models/usuarios.json';
//vamos iniciar los eventes del formulario y a cargar los datos del Json
document.addEventListener('DOMContentLoaded', async () => {

    await cargarDatosJson(usuariosJsonPath);
    // Inicializamos los eventos del formularios
    document.getElementById('fuel-form').addEventListener('submit', comprobarUsuario);

})
//metodo para cargar los datos iniciales
async function cargarDatosJson(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        // Almacenar los usuarios como un array en localStorage pasado a string
        localStorage.setItem('usuarios', JSON.stringify(data));

    }
    catch (error) {
        console.log('No se puedieron cargar los datos');
    }
}
function comprobarUsuario(event) {
    event.preventDefault();
    //guardamos del formulario el usuario y la contraseña
    const usuario = document.getElementById('usuario').value;
    const contraseina = document.getElementById('contraseina').value;
    //si la contraseña cumple con los caracteres alfanumericos
    if (contraValida(contraseina)) {
        //recuperamos los datos de usuarios del localStorage y lo parseamos
        const usuariosArray = JSON.parse(localStorage.getItem('usuarios'));
        //vamos a recorer el array de usuarios y comprobar
        usuariosArray.forEach(elemento => {
            if (elemento.usuario == usuario) {
                //si coinciden usuario y contraseña
                if (elemento.contraseña == contraseina) {
                    console.log('usuario correcto');
                    //guardamos en la sesion el usuario
                    localStorage.setItem('usuario', usuario);
                    localStorage.setItem('nombre', elemento.nombre);
                    //redirigimos a la pagina de las instrucciones
                    window.location.href = "./html/instrucciones.html";
                    exit;
                } else {
                    alert('contraseña incorrecta');
                    document.getElementById('fuel-form').reset();
                }
            } else {
                console.log('Datos incorrectos');
            }
        });
    }else{
        document.getElementById('fuel-form').reset();
    }

    function contraValida(contraseina) {
        const expresion = /^[a-zZ-z0-9]+$/;
        if (expresion.test(contraseina)) {
            return true;
        }
        else {
            alert('La contraseña solo puede contener carácteres alfanuméricos');
            return false;
        }
    }
}
