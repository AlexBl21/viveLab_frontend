// Mostrar modal con detalles de la evidencia
function verDetallesEvidencia(archivo, observaciones) {
    document.getElementById('detalleArchivo').value = archivo;
    document.getElementById('detalleObservaciones').value = observaciones;

    document.getElementById('detalleEvidenciaModal').style.display = 'flex';
}

// Cerrar modal
document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('detalleEvidenciaModal').style.display = 'none';
});

// Manejar envío del formulario
document.getElementById('subirEvidenciaForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const archivo = document.getElementById('evidenciaArchivo').files[0];
    const observaciones = document.getElementById('observaciones').value;

    if (archivo && observaciones) {
        alert('Evidencia subida exitosamente.');
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
