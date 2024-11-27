const modal = document.getElementById('tallerModal');
const addTallerBtn = document.getElementById('addTallerBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

addTallerBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Taller';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
