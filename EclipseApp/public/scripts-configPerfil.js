// URL de la API de agentes de Valorant
const apiAgentesUrl = 'https://valorant-api.com/v1/agents';
const apiRangosUrl = 'https://valorant-api.com/v1/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04?language=es-ES';

// Obtener la lista de agentes al cargar la página
fetch(apiAgentesUrl)
    .then(response => response.json())
    .then(data => {
        const agentes = data.data;
        const agenteSelector = document.getElementById('agentSelector');
        const agenteImg = document.getElementById('agenteImg');

        // Filtrar los agentes jugables (isPlayableCharacter=true) para evitar el duplicado de "Sova"
        const agentesJugables = agentes.filter(agente => agente.isPlayableCharacter);

        // Agregar opciones al selector de agentes
        agentesJugables.forEach(agente => {
            const option = document.createElement('option');
            option.value = agente.uuid;
            option.text = agente.displayName;
            agenteSelector.appendChild(option);
            // console.log(agente.displayName);
        });

        // Actualizar la imagen al cargar la página
        actualizarIconoAgente();
    })
    .catch(error => console.error('Error al cargar la lista de agentes:', error));

fetch(apiRangosUrl)
    .then(response => response.json())
    .then(data => {
        const rangos = data.data.tiers; // EDITAR ESTO
        const rankSelector = document.getElementById('rankSelector');
        const rankImg = document.getElementById('rankImg');

        // Agregar opciones al selector de agentes

        var divisionAnterior = "";
        rangos.forEach(rango => {
            const option = document.createElement('option');
            option.value = rango.tier;
            if (divisionAnterior != rango.divisionName && rango.divisionName != 'Unused1' && rango.divisionName != 'Unused2') {
                divisionAnterior = rango.divisionName;
                option.text = rango.divisionName;
                rankSelector.appendChild(option);
                // console.log(rango.divisionName);
            }
        });

        // Actualizar la imagen al cargar la página
        actualizarIconoRango();
    })
    .catch(error => console.error('Error al cargar la lista de rangos:', error));

function actualizarIconoRango() {
    const rankSelector = document.getElementById('rankSelector');
    const rankImg = document.getElementById('rankImg');

    // Obtener el valor seleccionado del selector de agentes
    const rangoSeleccionado = rankSelector.value;

    // Hacer una solicitud a la API para obtener detalles del agente
    fetch(apiRangosUrl)

        .then(response => response.json())
        .then(data => {
            // Obtener la URL de la imagen del agente
            const imagenUrl = data.data.tiers[rangoSeleccionado].smallIcon;

            // Actualizar la imagen en el elemento <img>
            rankImg.src = imagenUrl;
        })
        .catch(error => console.error('Error al obtener información del rango:', error));
}

function actualizarIconoAgente() {
    const agenteSelector = document.getElementById('agentSelector');
    const agenteImg = document.getElementById('agenteImg');

    // Obtener el valor seleccionado del selector de agentes
    const agenteSeleccionado = agenteSelector.value;

    // Obtener la URL de la imagen del agente desde la API
    const agenteUrl = `https://valorant-api.com/v1/agents/${agenteSeleccionado}`;


    // Hacer una solicitud a la API para obtener detalles del agente
    fetch(agenteUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener la URL de la imagen del agente
            const imagenUrl = data.data.displayIcon;

            // Actualizar la imagen en el elemento <img>
            agenteImg.src = imagenUrl;
        })
        .catch(error => console.error('Error al obtener información del agente:', error));
}

function guardarConfiguracion() {
    // Obtener el agente seleccionado
    const agenteSeleccionado = document.getElementById('agentSelector').value;
    // Obtener el rango seleccionado
    const rangoSeleccionado = document.getElementById('rankSelector').value;
    // Obtener el rango seleccionado
    const cuentaX = document.getElementById('cuentaX').value;
    // Obtener el rango seleccionado
    const cuentaRiot = document.getElementById('cuentaRiot').value;
    // Obtener el rango seleccionado
    const cuentaTwitch = document.getElementById('cuentaTwitch').value;
    // Obtener el rango seleccionado
    const cuentaDiscord = document.getElementById('cuentaDiscord').value;

    // Guardar la configuración, por ejemplo, en localStorage
    localStorage.setItem('agenteSeleccionado', agenteSeleccionado);
    localStorage.setItem('rangoSeleccionado', rangoSeleccionado);
    localStorage.setItem('cuentaX', cuentaX);
    localStorage.setItem('cuentaRiot', cuentaRiot);
    localStorage.setItem('cuentaTwitch', cuentaTwitch);
    localStorage.setItem('cuentaDiscord', cuentaDiscord);

    // Actualizar la imagen del agente en el perfil
    const agentePerfil = document.getElementById('agentePerfil');
    const agenteUrl = `https://valorant-api.com/v1/agents/${agenteSeleccionado}`;

    fetch(agenteUrl)
        .then(response => response.json())
        .then(data => {
            const imagenUrl = data.data.displayIcon;
            agentePerfil.src = imagenUrl;
        })
        .catch(error => console.error('Error al obtener información del agente:', error));
}