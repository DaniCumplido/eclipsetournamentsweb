// Validación de bootstrap para registro
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

// HIDE/SHOW PASSWORD

document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los elementos con la clase 'eye-toggle'
    var eyeElements = document.querySelectorAll('.eye-toggle');

    // Iterar sobre cada elemento 'eye-toggle'
    eyeElements.forEach(function (eye) {
        // Encontrar el campo asociado usando el atributo 'data-target'
        var targetId = eye.dataset.target;
        var key = document.getElementById(targetId);

        // Agregar el evento 'mousedown'
        eye.addEventListener('mousedown', function () {
            key.type = 'text';
            eye.classList.remove('bi-eye-slash-fill');
            eye.classList.add('bi-eye-fill');
        });

        // Agregar el evento 'mouseup'
        eye.addEventListener('mouseup', function () {
            key.type = 'password';
            eye.classList.remove('bi-eye-fill');
            eye.classList.add('bi-eye-slash-fill');
        });
    });
});

// VALIDACIONES DE REGISTRO

// function validarFormulario() {
//     // Obtener los valores de los campos
//     const nombre = document.getElementById('inputName').value;
//     const apellidos = document.getElementById('validationCustom02').value;
//     const username = document.getElementById('validationCustomUsername').value;
//     const email = document.getElementById('validationEmail').value;
//     const password = document.getElementById('validationCustomUsername').value; // Asegúrate de obtener el valor correcto

//     // Validar que todos los campos estén completos
//     if (!nombre || !apellidos || !username || !email || !password) {
//         alert('Todos los campos son obligatorios');
//         return false;
//     }

//     // Puedes agregar más validaciones según tus requisitos

//     // Si la validación pasa, retorna true para enviar el formulario
//     return true;
// }