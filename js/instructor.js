const modal = document.getElementById('instructorModal');
const addInstructorBtn = document.getElementById('addInstructorBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Abrir el modal al hacer clic en "Agregar Instructor"
addInstructorBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Instructor';
});

// Cerrar el modal al hacer clic en "Cancelar"
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
