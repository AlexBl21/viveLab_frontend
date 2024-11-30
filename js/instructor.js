const modal = document.getElementById('instructorModal');
const addInstructorBtn = document.getElementById('addInstructorBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const API_URL = "http://localhost:8080/api/instructores";
const instructoresTableBody = document.getElementById('instructoresTableBody');
const filterForm = document.querySelector(".filters form");
const instructorForm = document.getElementById('instructorForm');

let isEditing = false; // Bandera para determinar si estamos editando
let editingInstructorId = null; // ID del instructor en edición

// Abrir el modal para agregar un instructor
addInstructorBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Instructor';
    instructorForm.reset(); // Limpiar el formulario
    isEditing = false; // Cambiar a modo creación
    editingInstructorId = null; // Reiniciar el ID en edición
});

// Cerrar el modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    isEditing = false; // Reiniciar el modo edición
    editingInstructorId = null;
});

// Cerrar el modal al hacer clic fuera de este
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Manejar el envío del formulario (crear o editar instructor)
instructorForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    const nombre = document.getElementById('nombreInstructor').value.trim();
    const documento = document.getElementById('documentoInstrcutor').value.trim();

    if (!nombre || !documento) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const instructorData = { nombre, documento };

    try {
        if (isEditing) {
            // Actualizar instructor
            const response = await fetch(`${API_URL}/${editingInstructorId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(instructorData),
            });

            if (!response.ok) throw new Error(`Error al editar instructor: ${response.status}`);
            alert("Instructor actualizado exitosamente.");
        } else {
            // Crear instructor
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(instructorData),
            });

            if (!response.ok) throw new Error(`Error al agregar instructor: ${response.status}`);
            alert("Instructor agregado exitosamente.");
        }

        fetchInstructores(); // Refrescar la tabla
        modal.style.display = 'none'; // Cerrar el modal
    } catch (error) {
        console.error(error);
        alert("Hubo un error al procesar la solicitud. Inténtalo nuevamente.");
    }
});

// Obtener instructores desde la API
async function fetchInstructores() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error al obtener instructores: ${response.status}`);
        const instructores = await response.json();
        renderInstructores(instructores);
    } catch (error) {
        console.error(error);
    }
}

// Filtrar instructores por nombre
async function fetchInstructoresByName(name) {
    try {
        const response = await fetch(`${API_URL}/listByNombre/${name}`);
        if (!response.ok) throw new Error(`Error al buscar instructores: ${response.status}`);
        const instructores = await response.json();
        renderInstructores(instructores);
    } catch (error) {
        console.error("Error al buscar instructores por nombre:", error);
        alert("No se pudo buscar instructores. Por favor verifica el nombre ingresado.");
    }
}

// Renderizar instructores en la tabla
function renderInstructores(instructores) {
    instructoresTableBody.innerHTML = ""; // Limpiar tabla
    if (instructores.length === 0) {
        instructoresTableBody.innerHTML = `<tr><td colspan="4">No se encontraron instructores con el nombre indicado.</td></tr>`;
        return;
    }
    instructores.forEach((instructor) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${instructor.id}</td>
            <td>${instructor.nombre}</td>
            <td>${instructor.documento}</td>
            <td>
                <button class="btn btn-edit" onclick="editInstructor(${instructor.id}, '${instructor.nombre}', '${instructor.documento}')">Editar</button>
                <button class="btn btn-delete" onclick="deleteInstructor(${instructor.id})">Eliminar</button>
            </td>
        `;
        instructoresTableBody.appendChild(row);
    });
}

// Editar instructor
function editInstructor(id, nombre, documento) {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Editar Instructor';
    document.getElementById('nombreInstructor').value = nombre;
    document.getElementById('documentoInstrcutor').value = documento;
    isEditing = true; // Cambiar a modo edición
    editingInstructorId = id; // Guardar ID del instructor a editar
}

// Eliminar instructor
async function deleteInstructor(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este instructor?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Error al eliminar instructor: ${response.status}`);
        alert('Instructor eliminado exitosamente.');
        fetchInstructores(); // Refrescar la lista
    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el instructor. Inténtalo nuevamente.");
    }
}

// Manejo del filtro por nombre
filterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de la página
    const name = document.getElementById('name').value.trim();
    if (name) {
        fetchInstructoresByName(name); // Buscar por nombre
    } else {
        alert("Por favor ingresa un nombre para buscar.");
    }
});

// Inicializar el listado al cargar la página
document.addEventListener('DOMContentLoaded', fetchInstructores);
