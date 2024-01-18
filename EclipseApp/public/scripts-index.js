// CÓDIGO DE SECCIÓN "ESTADÍSTICAS"

let valueDisplays = document.querySelectorAll(".num");
let interval = 2000;
let counterStarted = false; // Bandera para verificar si el contador ya se ha iniciado

// Función para verificar si la sección de estadísticas es visible en la ventana gráfica
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para iniciar el contador si la sección es visible y el contador no ha comenzado
function startCounterIfVisible() {
    if (!counterStarted) {
        valueDisplays.forEach(valueDisplay => {
            if (isElementInViewport(valueDisplay)) {
                let startValue = 0;
                let endValue = parseInt(valueDisplay.getAttribute("data-val"));
                let duration = Math.floor(interval / endValue);
                let counter = setInterval(function () {
                    startValue += 1;
                    valueDisplay.textContent = startValue;
                    if (startValue == endValue) {
                        clearInterval(counter);
                    }
                }, duration);

                counterStarted = true; // Actualiza la bandera para indicar que el contador ha comenzado
            }
        });
    }
}

// Evento de desplazamiento para verificar la visibilidad al desplazarse
window.addEventListener('scroll', function () {
    startCounterIfVisible();
});

// También verifica la visibilidad cuando la página se carga
document.addEventListener('DOMContentLoaded', function () {
    startCounterIfVisible();
});