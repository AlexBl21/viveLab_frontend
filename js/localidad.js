// Función para abrir un modal
function abrirModal(id) {
    document.getElementById(id).style.display = "flex";
}

// Función para cerrar un modal
function cerrarModal(id) {
    document.getElementById(id).style.display = "none";
}

// Aquí puedes agregar más funciones para la lógica de los formularios y tablas si es necesario

// Ejemplo de cómo manejar el envío del formulario para agregar municipios (esto puede cambiar según tu necesidad)
document.getElementById('form-municipio')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario para manejarlo con JS

    // Obtener los valores del formulario
    const daneMunicipio = document.getElementById('dane-municipio').value;
    const nombreMunicipio = document.getElementById('nombre-municipio').value;

    // Aquí podrías enviar los datos al servidor o hacer alguna acción con los datos
    console.log('Municipio agregado:', daneMunicipio, nombreMunicipio);

    // Cerrar el modal después de guardar
    cerrarModal('modal-municipio');
    // Limpiar los campos del formulario
    document.getElementById('form-municipio').reset();
});

// Ejemplo de cómo manejar el envío del formulario para agregar colegios
document.getElementById('form-colegio')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario para manejarlo con JS

    // Obtener los valores del formulario
    const idColegio = document.getElementById('id-colegio').value;
    const nombreColegio = document.getElementById('nombre-colegio').value;
    const idMunicipio = document.getElementById('id-municipio').value;

    // Aquí podrías enviar los datos al servidor o hacer alguna acción con los datos
    console.log('Colegio agregado:', idColegio, nombreColegio, idMunicipio);

    // Cerrar el modal después de guardar
    cerrarModal('modal-colegio');
    // Limpiar los campos del formulario
    document.getElementById('form-colegio').reset();
});
