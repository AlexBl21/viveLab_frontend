// Selección de elementos del DOM
const addParticipanteBtn = document.getElementById('addparticipante');
const participanteModal = document.getElementById('participanteModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalForm = document.getElementById('inscripcionForm');
const API_URL = "http://localhost:8080/api/participantes";

// Variable para almacenar el ID del participante que se está editando
let editingParticipanteId = null;
const colegioSelect = document.getElementById('colegioSeleccionado'); // Select de colegios

// Función para abrir el modal
function openModal() {
    participanteModal.style.display = 'flex'; // Mostrar el modal
    cargarTipoDocumentos();
    fetchColegios(); // Cargar los colegios cuando se abre el modal
}

// Función para cerrar el modal
function closeModal() {
    participanteModal.style.display = 'none'; // Ocultar el modal
    modalForm.reset(); // Limpiar los campos del formulario
    editingParticipanteId = null; // Resetear el ID de edición
}

// Event Listeners
addParticipanteBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === participanteModal) {
        closeModal();
    }
});

// Función para obtener los colegios
async function fetchColegios() {
    try {
        // Hacer la solicitud GET al endpoint de colegios
        const response = await axios.get("http://localhost:8080/api/colegios");
        const colegios = response.data;

        // Limpiar las opciones actuales del select
        colegioSelect.innerHTML = '<option value="" disabled selected>Seleccione un colegio</option>';

        // Agregar las nuevas opciones de colegios al select
        colegios.forEach((colegio) => {
            const option = document.createElement("option");
            option.value = colegio.id;
            option.textContent = colegio.nombre;
            colegioSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al obtener los colegios:", error);
        alert("No se pudo cargar la lista de colegios.");
    }
}

// Enviar el formulario (para crear o editar)
modalForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario

    // Capturar los datos del formulario
    const nombreParticipante = document.getElementById('nombreParticipante').value;
    const tipoDocumento = document.getElementById('tipoDocumentoSelect').value;
    const colegioSeleccionado = document.getElementById('colegioSeleccionado').value;

    const participanteData = {
        nombre: nombreParticipante,
        tipoDocumento: {
            id: tipoDocumento // Asegúrate de pasar solo el id del tipo de documento
        },
        colegio: {
            id: colegioSeleccionado // Asegúrate de pasar solo el id del colegio
        }
    };

    try {
        if (editingParticipanteId) {
            // Si estamos editando un participante, actualizamos con PUT
            await axios.put(`${API_URL}/${editingParticipanteId}`, participanteData);
            alert('Participante actualizado con éxito');
        } else {
            // Si no estamos editando, agregamos un nuevo participante con POST
            await axios.post(API_URL, participanteData);
            alert('Inscripción guardada con éxito');
        }

        // Cerrar el modal y limpiar el formulario
        closeModal();

        // Recargar la lista de participantes para reflejar los cambios
        fetchParticipantes();

    } catch (error) {
        console.error('Error al guardar el participante:', error);
        alert('No se pudo guardar el participante.');
    }
});

// Selección del tbody donde se mostrará la lista de participantes
const participantesTableBody = document.querySelector(".tabla-generica tbody");

// Función para obtener la lista de participantes del backend
async function fetchParticipantes() {
    try {
        // Hacer la solicitud GET al endpoint de participantes
        const response = await axios.get("http://localhost:8080/api/participantes");
        const participantes = response.data;

        // Limpiar el contenido actual de la tabla
        participantesTableBody.innerHTML = "";

        // Llenar la tabla con los datos de los participantes
        participantes.forEach((participante) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${participante.id}</td>
                <td>${participante.nombre}</td>
                <td>${participante.colegio.nombre}</td>
                <td>${participante.tipoDocumento.descripcion}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarParticipante(${participante.id})">
                        <i class="fas fa-pencil mr-2"></i> Editar
                    </button>
                    <button class="btn btn-delete" onclick="eliminarParticipante(${participante.id})">
                        <i class="fas fa-trash mr-2"></i> Eliminar
                    </button>
                </td>
            `;

            participantesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener la lista de participantes:", error);
        alert("No se pudo cargar la lista de participantes.");
    }
}

// Eliminar participante
async function eliminarParticipante(participanteId) {
    if (!confirm('¿Estás seguro de eliminar este participante?')) return;

    try {
        await axios.delete(`${API_URL}/${participanteId}`);
        alert('Participante eliminado correctamente.');
        fetchParticipantes(); // Vuelve a cargar la lista después de eliminar
    } catch (error) {
        console.error('Error al eliminar participante:', error);
        alert('No se pudo eliminar el participante.');
    }
}

// Función para editar un participante
function editarParticipante(participanteId) {
    editingParticipanteId = participanteId; // Establecer el ID del participante que estamos editando

    // Abrir el modal
    openModal();

    // Buscar el participante en la lista (o hacerlo con una llamada al backend)
    axios.get(`${API_URL}/${participanteId}`)
        .then(response => {
            const participante = response.data;

            // Rellenar los campos del formulario con los datos del participante
            document.getElementById('nombreParticipante').value = participante.nombre;
            document.getElementById('tipoDocumentoSelect').value = participante.tipoDocumento.id;
            document.getElementById('colegioSeleccionado').value = participante.colegio.id; // Rellenar el select con el colegio del participante
        })
        .catch(error => {
            console.error("Error al obtener el participante:", error);
            alert("No se pudo cargar la información del participante.");
        });
}

// Función para cargar los tipos de documento desde la API
async function cargarTipoDocumentos() {
    try {
        const response = await axios.get("http://localhost:8080/api/tipo_documentos");
        const tiposDocumentos = response.data;
        const tipoDocumentoSelect = document.getElementById('tipoDocumentoSelect');
        
        // Limpiar los tipos de documentos previos
        tipoDocumentoSelect.innerHTML = '<option value="">Seleccione...</option>';
        
        // Llenar el select con los tipos de documentos
        tiposDocumentos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.descripcion;
            tipoDocumentoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los tipos de documento:", error);
    }
}

// Llamar a la función para cargar los participantes al cargar la página
document.addEventListener("DOMContentLoaded", fetchParticipantes);