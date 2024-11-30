// Selección de elementos del DOM
const addParticipanteBtn = document.getElementById('addparticipante');
const participanteModal = document.getElementById('participanteModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalForm = document.getElementById('inscripcionForm');

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.tabla-generica tbody');

    // Cargar inscripciones desde el backend
    axios.get('http://localhost:8080/api/inscripciones')
        .then(response => {
            const inscripciones = response.data;

            // Limpiar el contenido de la tabla antes de agregar nuevas filas
            tableBody.innerHTML = '';

            inscripciones.forEach(inscripcion => {
                const row = document.createElement('tr');
                
                // Extraer datos necesarios de la inscripción
                const id = inscripcion.id;
                const participanteNombre = inscripcion.participante?.nombre || 'No disponible';
                const taller = inscripcion.programacion?.taller?.nombre || 'No disponible';
                const fecha = inscripcion.fecha ? inscripcion.fecha.join('-') : 'No disponible';

                // Crear celdas para la fila
                row.innerHTML = `
                    <td>${id}</td>
                    <td>${participanteNombre}</td>
                    <td>${taller}</td>
                    <td>${fecha}</td>
                    <td>
                        <button class="btn btn-edit"><i class="fas fa-pencil mr-2"></i> Editar</button>
                        <button class="btn btn-delete"><i class="fas fa-trash mr-2"></i> Eliminar</button>
                    </td>
                `;
                
                // Agregar fila a la tabla
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar las inscripciones:', error);
            alert('Hubo un problema al cargar las inscripciones. Por favor, inténtalo de nuevo más tarde.');
        });
});
