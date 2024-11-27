// Modales para sesiones y asistencia
const sesionModal = document.getElementById('sesionModal');
const asistenciaModal = document.getElementById('asistenciaModal');
const addSesionBtn = document.getElementById('addSesionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeAsistenciaModalBtn = document.getElementById('closeAsistenciaModalBtn');
const asistenciaButtons = document.querySelectorAll('.btn-asistencia');

// Abrir modal para agregar sesión
addSesionBtn.addEventListener('click', () => {
    sesionModal.style.display = 'flex';
});

// Cerrar modal para agregar sesión
closeModalBtn.addEventListener('click', () => {
    sesionModal.style.display = 'none';
});

// Abrir modal para registrar asistencia
asistenciaButtons.forEach(button => {
    button.addEventListener('click', () => {
        asistenciaModal.style.display = 'flex';
    });
});

// Cerrar modal para registrar asistencia
closeAsistenciaModalBtn.addEventListener('click', () => {
    asistenciaModal.style.display = 'none';
});
