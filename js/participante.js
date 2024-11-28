// Selección de elementos del DOM
const addParticipanteBtn = document.getElementById('addparticipante');
const participanteModal = document.getElementById('participanteModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalForm = document.getElementById('inscripcionForm');

// Función para abrir el modal
function openModal() {
    participanteModal.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    participanteModal.style.display = 'none'; // Ocultar el modal
    modalForm.reset(); // Limpiar los campos del formulario
}

// Event Listeners
addParticipanteBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === participanteModal) {
        closeModal();
    }
});

// Enviar el formulario
modalForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario

    // Capturar los datos del formulario
    const nombreParticipante = document.getElementById('nombreParticipante').value;
    const tipoDocumento = document.getElementById('tipoDocumentoSelect').value;
    const colegioSeleccionado = document.getElementById('colegioSeleccionado').value;

    // Aquí puedes manejar el envío de datos al backend usando Fetch o Axios
    console.log('Datos enviados:', {
        nombreParticipante,
        tipoDocumento,
        colegioSeleccionado,
    });

    // Simular el envío exitoso
    alert('Inscripción guardada con éxito');

    // Cerrar el modal y limpiar el formulario
    closeModal();
});
