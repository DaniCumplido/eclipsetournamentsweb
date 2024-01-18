document.addEventListener('DOMContentLoaded', function () {

    const agentePerfil = document.getElementById('agentePerfil');

    // Recuperar la URL almacenada en localStorage
    const imagenUrlAlmacenada = localStorage.getItem('agenteSeleccionado');

    const agenteUrl = `https://valorant-api.com/v1/agents/${imagenUrlAlmacenada}`;

    fetch(agenteUrl)
        .then(response => response.json())
        .then(data => {
            const imagenUrl = data.data.displayIcon;
            agentePerfil.src = imagenUrl;
        })
        .catch(error => console.error('Error al obtener información del agente:', error));

    // Llama a la función al cargar la página para verificar el estado de inicio de sesión.
    actualizarBarraNavegacion();
});

// Update the document when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Make a request to get user information
    fetch('/getUserInfo')
        .then(response => response.json())
        .then(data => {
            // Assuming data.usuario contains user information
            const username = data.usuario ? data.usuario.username : 'USERNAME';

            // Update the displayed username
            document.getElementById('usernameTitle').textContent = username;
        })
        .catch(error => console.error('Error fetching user information:', error));
});

// Update the document when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Make a request to get user information
    fetch('/getUserInfo')
        .then(response => response.json())
        .then(data => {
            // Assuming data.usuario contains user information
            const username = data.usuario ? data.usuario.username : 'USERNAME';

            // Update the displayed username
            document.getElementById('usernameTitle').textContent = username;
        })
        .catch(error => console.error('Error fetching user information:', error));
});


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

// Supongamos que este es tu código para cerrar sesión.
function cerrarSesion() {
    // Lógica para cerrar sesión...

    // Elimina el estado de inicio de sesión de localStorage.
    localStorage.removeItem('isUserLoggedIn');

    // Actualiza la barra de navegación.
    actualizarBarraNavegacion();
}
