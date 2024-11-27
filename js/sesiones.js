const sesionModal = document.getElementById('sesionModal');
const addSesionBtn = document.getElementById('addSesionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

addSesionBtn.addEventListener('click', () => {
    sesionModal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Sesión';
});

closeModalBtn.addEventListener('click', () => {
    sesionModal.style.display = 'none';
});
