// Modal para editar participante
const editarParticipanteModal = document.getElementById('editarParticipanteModal');
const editarButtons = document.querySelectorAll('.btn-edit');
const closeModalBtn = document.getElementById('closeModalBtn');

// Abrir modal al hacer clic en "Editar"
editarButtons.forEach(button => {
    button.addEventListener('click', () => {
        editarParticipanteModal.style.display = 'flex';

        // Simulación de cargar datos del participante seleccionado
        document.getElementById('nombreParticipante').value = "Juan Pérez";
        document.getElementById('tipoDocumento').value = "CC";
        document.getElementById('colegioParticipante').value = "Colegio Nacional";
    });
});

// Cerrar modal al hacer clic en "Cancelar"
closeModalBtn.addEventListener('click', () => {
    editarParticipanteModal.style.display = 'none';
});
