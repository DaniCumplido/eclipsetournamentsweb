// SELECTOR DE TABLA EN CLASIFICACIÓN

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el selector y las tablas
    var roundSelector = document.getElementById('roundSelector');
    var originalTable = document.getElementById('tablaOriginal');
    var clonedTables = [
        document.getElementById('tabla1'),
        document.getElementById('tabla2'),
        document.getElementById('tabla3'),
        document.getElementById('tabla4')
    ];

    // Mostrar la tabla correspondiente al seleccionar una opción
    roundSelector.addEventListener('change', function () {
        var selectedRound = roundSelector.value;

        // Ocultar todas las tablas clonadas
        clonedTables.forEach(function (table) {
            table.style.display = 'none';
        });

        // Mostrar la tabla correspondiente a la opción seleccionada
        if (selectedRound === '0') {
            originalTable.style.display = 'table';
        } else {
            // clonedTables[selectedRound - 1].style.display = 'table';
            // no usamos el "display" porque al usar "d-none" de bootstrap en las tablas, necesitamos indicarle "!important" para sobreponernos al este
            clonedTables[selectedRound - 1].style.cssText = 'display: table !important;';
            //por defecto la original aparece, tenemos que hacer que no lo haga con el "display none"
            originalTable.style.display = 'none';
        }
    });
});