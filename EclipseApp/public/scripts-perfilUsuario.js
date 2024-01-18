document.addEventListener('DOMContentLoaded', function () {

    const agentImg = document.getElementById('agentImg');
    const agentName = document.getElementById('agentName');

    // Recuperar la URL almacenada en localStorage
    const agenteSeleccionado = localStorage.getItem('agenteSeleccionado');

    const agenteUrl = `https://valorant-api.com/v1/agents/${agenteSeleccionado}`;

    fetch(agenteUrl)
        .then(response => response.json())
        .then(data => {
            const imagenUrl = data.data.displayIcon;
            agentImg.src = imagenUrl;
            // console.log(data.data.displayName);
            agentName.value = data.data.displayName;
        })
        .catch(error => console.error('Error al obtener información del agente:', error));

    const rankImg = document.getElementById('rankImg');
    const rankName = document.getElementById('rankName');

    // Recuperar la URL almacenada en localStorage
    const imagenRangoUrlAlmacenada = localStorage.getItem('rangoSeleccionado');

    const apiRangosUrl = 'https://valorant-api.com/v1/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04?language=es-ES';

    // Hacer una solicitud a la API para obtener detalles del agente
    fetch(apiRangosUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener la URL de la imagen del agente
            const imagenUrl = data.data.tiers[imagenRangoUrlAlmacenada].smallIcon;

            // Actualizar la imagen en el elemento <img>
            rankImg.src = imagenUrl;
            rankName.value = data.data.tiers[imagenRangoUrlAlmacenada].divisionName;
        })
        .catch(error => console.error('Error al obtener información del rango:', error));

    const cuentaXText = document.getElementById('cuentaXText');
    const cuentaRiotText = document.getElementById('cuentaRiotText');
    const cuentaTwitchText = document.getElementById('cuentaTwitchText');
    const cuentaDiscordText = document.getElementById('cuentaDiscordText');

    // Recuperar la URL almacenada en localStorage
    cuentaXText.value = localStorage.getItem('cuentaX');
    cuentaRiotText.value = localStorage.getItem('cuentaRiot');
    cuentaTwitchText.value = localStorage.getItem('cuentaTwitch');
    cuentaDiscordText.value = localStorage.getItem('cuentaDiscord');
});