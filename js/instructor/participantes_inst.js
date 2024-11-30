// Seleccionar elementos del DOM
const nuevoParticipanteBtn = document.getElementById('nuevoParticipanteBtn'); // Botón para abrir el modal
const localidadModal = document.getElementById('localidadModal'); // Modal de Nuevo Participante
const closeLocalidadModalBtn = document.getElementById('closeModalBtn'); // Botón para cerrar el modal
const localidadForm = document.getElementById('localidadForm'); // Formulario dentro del modal

// Función para abrir el modal
function openLocalidadModal() {
    localidadModal.style.display = 'block'; // Mostrar el modal
}

// Función para cerrar el modal
function closeLocalidadModal() {
    localidadModal.style.display = 'none'; // Ocultar el modal
    resetLocalidadForm(); // Limpiar los campos del formulario al cerrar
}

// Función para limpiar el formulario
function resetLocalidadForm() {
    localidadForm.reset();
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = 'Agregar Municipio'; // Restablecer el título al cerrar el modal
}

// Agregar eventos al botón de "Nuevo Participante"
nuevoParticipanteBtn.addEventListener('click', openLocalidadModal);

// Agregar evento al botón de "Cancelar" dentro del modal
closeLocalidadModalBtn.addEventListener('click', closeLocalidadModal);

// Cerrar el modal si se hace clic fuera de su contenido
window.addEventListener('click', (event) => {
    if (event.target === localidadModal) {
        closeLocalidadModal();
    }
});

// Manejo del envío del formulario
localidadForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar recarga de la página

    // Obtener datos del formulario
    const formData = new FormData(localidadForm);
    console.log('Datos del formulario:', Object.fromEntries(formData));

    closeLocalidadModal(); // Simulación de cierre del modal
});
