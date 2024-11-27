const modal = document.getElementById('programacionModal');
const addProgramacionBtn = document.getElementById('addProgramacionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

addProgramacionBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Programación';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
