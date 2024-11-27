document.getElementById('btnAddParticipante').addEventListener('click', () => {
    const modal = document.getElementById('editarParticipanteModal');
    modal.style.display = 'flex';
});

document.getElementById('closeModalBtn').addEventListener('click', () => {
    const modal = document.getElementById('editarParticipanteModal');
    modal.style.display = 'none';
});

// Función para mostrar el modal con datos precargados
function mostrarEditarParticipante(nombre, tipoDocumento, numeroDocumento, colegio) {
    const modal = document.getElementById('editarParticipanteModal');
    document.getElementById('nombreParticipante').value = nombre;
    document.getElementById('tipoDocumento').value = tipoDocumento;
    document.getElementById('colegioParticipante').value = colegio;
    modal.style.display = 'flex';
}
