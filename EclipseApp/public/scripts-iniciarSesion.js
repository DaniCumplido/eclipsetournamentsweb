// Supongamos que este es tu código para iniciar sesión.
function iniciarSesion() {
    // Lógica para iniciar sesión...

    // Almacena el estado de inicio de sesión en localStorage.
    localStorage.setItem('isUserLoggedIn', 'true');

    // Actualiza la barra de navegación.
    actualizarBarraNavegacion();
}

// Función para verificar el estado de inicio de sesión y actualizar la barra de navegación.
function actualizarBarraNavegacion() {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';

    if (isUserLoggedIn) {
        document.getElementById('navbarLogin').style.display = 'none';
        document.getElementById('navbarLoggedIn').style.display = 'block';
    } else {
        document.getElementById('navbarLogin').style.display = 'block';
        document.getElementById('navbarLoggedIn').style.display = 'none';
    }
}

// Llama a la función al cargar la página para verificar el estado de inicio de sesión.
actualizarBarraNavegacion();