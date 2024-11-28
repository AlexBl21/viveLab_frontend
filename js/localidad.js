// Mostrar el modal para Municipio
document.getElementById('btn-municipio').addEventListener('click', function() {
    document.getElementById('modal-municipio').style.display = 'flex';
});

// Mostrar el modal para Colegio
document.getElementById('btn-colegio').addEventListener('click', function() {
    document.getElementById('modal-colegio').style.display = 'flex';
});

// Cerrar el modal para Municipio
document.getElementById('close-municipio').addEventListener('click', function() {
    document.getElementById('modal-municipio').style.display = 'none';
});

// Cerrar el modal para Colegio
document.getElementById('close-colegio').addEventListener('click', function() {
    document.getElementById('modal-colegio').style.display = 'none';
});

// Cerrar los modales si se hace clic fuera de ellos
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal-municipio')) {
        document.getElementById('modal-municipio').style.display = 'none';
    }
    if (event.target === document.getElementById('modal-colegio')) {
        document.getElementById('modal-colegio').style.display = 'none';
    }
});
