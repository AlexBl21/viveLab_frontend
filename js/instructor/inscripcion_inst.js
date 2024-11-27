const modal = document.getElementById('inscripcionModal');
const addInscripcionBtn = document.getElementById('addInscripcionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

addInscripcionBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Inscripción';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


