document.addEventListener('DOMContentLoaded', () => {
    fetchSesiones(); // Carga las sesiones en la tabla
    fetchUbicaciones(); // Carga las ubicaciones en el select

    // Agregar el listener para el formulario de búsqueda
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto de recargar la página
        const searchName = document.getElementById('name').value.trim(); // Obtener el valor del input
        if (searchName) {
            fetchSesionesByNombre(searchName); // Llamar a la función de búsqueda con el nombre de la programación
        } else {
            fetchSesiones(); // Si no hay filtro, cargar todas las sesiones
        }
    });
});

const sesionModal = document.getElementById('sesionModal');
const addSesionBtn = document.getElementById('addSesionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const sesionForm = document.getElementById('sesionForm');
const sesionesTableBody = document.getElementById('sesionesTableBody');
const API_URL = "http://localhost:8080/api/sesiones";
let isEditing = false;
let editingSesionId = null;

// Abrir y cerrar modal
addSesionBtn.addEventListener('click', () => {
    sesionModal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Sesión';
    sesionForm.reset();
    isEditing = false;
});

closeModalBtn.addEventListener('click', () => {
    sesionModal.style.display = 'none';
    isEditing = false;
    editingSesionId = null;
});

// Obtener todas las sesiones
async function fetchSesiones() {
    try {
        const response = await axios.get(API_URL);
        renderSesiones(response.data);
    } catch (error) {
        console.error('Error al obtener sesiones:', error);
        alert('No se pudieron cargar las sesiones.');
    }
}

// Buscar sesiones por nombre de programación
async function fetchSesionesByNombre(nombre) {
    try {
        const response = await axios.get(`${API_URL}/listByProgramacionTallerNombre/${nombre}`);
        renderSesiones(response.data);
    } catch (error) {
        console.error('Error al buscar sesiones:', error);
        alert('No se pudo buscar sesiones. Verifica el nombre ingresado.');
    }
}

// Renderizar sesiones en la tabla
function renderSesiones(sesiones) {
    sesionesTableBody.innerHTML = '';
    if (sesiones.length === 0) {
        sesionesTableBody.innerHTML = `<tr><td colspan="7">No se encontraron sesiones.</td></tr>`;
        return;
    }

    sesiones.forEach(async (sesion) => {
        const row = document.createElement('tr');
        const porcentajeAsistencia = await getPorcentajeAsistencia(sesion.id);

        // Validar y formatear la hora
        let hora = 'No disponible';
        if (sesion.hora) {
            if (typeof sesion.hora === 'string') {
                // Si la hora ya es una cadena
                hora = sesion.hora.substring(0, 5); // Extraer HH:mm
            } else if (Array.isArray(sesion.hora)) {
                // Si la hora es un array (como [hour, minute])
                const hour = String(sesion.hora[0]).padStart(2, '0');
                const minute = String(sesion.hora[1]).padStart(2, '0');
                hora = `${hour}:${minute}`;
            }
        }

        row.innerHTML = `
            <td>${sesion.instructor?.nombre || 'No disponible'}</td>
            <td>${sesion.fecha || 'No disponible'}</td>
            <td>${hora}</td>
            <td>${sesion.programacion?.taller?.nombre || 'No disponible'}</td>
            <td>${sesion.ubicacion?.nombre || 'No disponible'}</td>
            <td>${porcentajeAsistencia || 'No disponible'}%</td>
            <td>
                <button class="btn btn-edit" onclick="editSesion(${sesion.id})">Editar</button>
                <button class="btn btn-delete" onclick="deleteSesion(${sesion.id})">Eliminar</button>
            </td>
        `;
        sesionesTableBody.appendChild(row);
    });
}

// Obtener porcentaje de asistencia
async function getPorcentajeAsistencia(sesionId) {
    try {
        const response = await axios.get(`${API_URL}/porcentajeAsistencia/${sesionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener porcentaje de asistencia para sesión ${sesionId}:`, error);
        return 'N/A';
    }
}

// Crear o actualizar sesión
sesionForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const horaSesion = document.getElementById('horaSesion').value.split(':');
    const sesionData = {
        fecha: document.getElementById('fechaSesion').value,
        hora: `${horaSesion[0]}:${horaSesion[1]}:00`,
        instructor: { id: parseInt(document.getElementById('idInstructorsesion').value) },
        programacion: { id: parseInt(document.getElementById('idProgramacionSesion').value) },
        ubicacion: { id: parseInt(document.getElementById('ubicacionSesion').value) }, // Asegurarse de tomar el valor actual
    };

    try {
        if (isEditing) {
            console.log('Datos enviados para editar:', sesionData);
            await axios.put(`${API_URL}/${editingSesionId}`, sesionData);
            alert('Sesión actualizada correctamente.');
        } else {
            await axios.post(API_URL, sesionData);
            alert('Sesión creada correctamente.');
        }
        fetchSesiones(); // Actualiza la lista después de guardar
        sesionModal.style.display = 'none'; // Cierra el modal
    } catch (error) {
        console.error('Error al guardar sesión:', error);
        alert('No se pudo guardar la sesión.');
    }
});

// Editar sesión
async function editSesion(sesionId) {
    try {
        const response = await axios.get(`${API_URL}/${sesionId}`);
        const sesion = response.data;

        // Validar y formatear la hora para el input
        let horaSesion = '00:00'; // Valor por defecto
        if (sesion.hora) {
            if (typeof sesion.hora === 'string') {
                // Si la hora es una cadena en formato "HH:MM:SS"
                horaSesion = sesion.hora.substring(0, 5); // Extraer "HH:MM"
            } else if (Array.isArray(sesion.hora)) {
                // Si la hora es un array [hour, minute]
                const hour = String(sesion.hora[0]).padStart(2, '0');
                const minute = String(sesion.hora[1]).padStart(2, '0');
                horaSesion = `${hour}:${minute}`;
            } else if (typeof sesion.hora === 'object') {
                // Si la hora es un objeto con propiedades hour y minute
                const hour = String(sesion.hora.hour).padStart(2, '0');
                const minute = String(sesion.hora.minute).padStart(2, '0');
                horaSesion = `${hour}:${minute}`;
            }
        }

        // Rellenar los campos del formulario
        document.getElementById('fechaSesion').value = sesion.fecha;
        document.getElementById('horaSesion').value = horaSesion;
        document.getElementById('idInstructorsesion').value = sesion.instructor.id;
        document.getElementById('idProgramacionSesion').value = sesion.programacion.id;

        // Cargar la ubicación actual en el formulario
        const ubicacionSelect = document.getElementById('ubicacionSesion');
        ubicacionSelect.value = sesion.ubicacion.id; // Establecer la ubicación actual

        // Configurar el modal para edición
        sesionModal.style.display = 'flex';
        document.getElementById('modalTitle').innerText = 'Editar Sesión';
        isEditing = true;
        editingSesionId = sesionId;
    } catch (error) {
        console.error('Error al editar sesión:', error);
        alert('No se pudo cargar la sesión.');
    }
}

// Eliminar sesión
async function deleteSesion(sesionId) {
    if (!confirm('¿Estás seguro de eliminar esta sesión?')) return;

    try {
        await axios.delete(`${API_URL}/${sesionId}`);
        alert('Sesión eliminada correctamente.');
        fetchSesiones(); // Vuelve a cargar la lista después de eliminar
    } catch (error) {
        console.error('Error al eliminar sesión:', error);
        alert('No se pudo eliminar la sesión.');
    }
}

// Obtener ubicaciones
async function fetchUbicaciones() {
    try {
        const response = await axios.get('http://localhost:8080/api/ubicaciones');
        const ubicaciones = response.data;

        const ubicacionSelect = document.getElementById('ubicacionSesion');
        ubicacionSelect.innerHTML = '<option value="">Seleccione una opción</option>';

        ubicaciones.forEach((ubicacion) => {
            const option = document.createElement('option');
            option.value = ubicacion.id;
            option.textContent = ubicacion.nombre;
            ubicacionSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar ubicaciones:', error);
        alert('No se pudieron cargar las ubicaciones. Por favor, inténtalo más tarde.');
    }
}
