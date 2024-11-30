const modal = document.getElementById('tallerModal');
const addTallerBtn = document.getElementById('addTallerBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const API_URL = "http://localhost:8080/api/talleres";
const talleresTableBody = document.getElementById('talleresTableBody');
const filterForm = document.querySelector(".filters form"); // Seleccionar el formulario del filtro
const tallerForm = document.getElementById('tallerForm'); // Formulario del modal

let isEditing = false; // Bandera para saber si el modal está en modo edición
let editingTallerId = null; // ID del taller que se está editando

addTallerBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Taller';
    tallerForm.reset(); // Limpiar los campos del formulario
    isEditing = false; // Cambiar a modo creación
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    isEditing = false; // Reiniciar el modo edición
    editingTallerId = null; // Limpiar el ID de edición
});

// Función para obtener talleres desde la API
async function fetchTalleres() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error al obtener talleres: ${response.status}`);
        
        const talleres = await response.json();
        renderTalleres(talleres);
    } catch (error) {
        console.error(error);
    }
}

// Función para buscar talleres por nombre
async function fetchTalleresByNombre(nombre) {
    try {
        const response = await fetch(`${API_URL}/listByNombre/${nombre}`);
        if (!response.ok) throw new Error(`Error al buscar talleres: ${response.status}`);
        
        const talleres = await response.json();
        renderTalleres(talleres);
    } catch (error) {
        console.error("Error al buscar talleres por nombre:", error);
        alert("No se pudo buscar talleres. Por favor, verifica el nombre ingresado.");
    }
}

// Función para renderizar talleres en la tabla
function renderTalleres(talleres) {
    talleresTableBody.innerHTML = ""; // Limpiar contenido previo
    if (talleres.length === 0) {
        talleresTableBody.innerHTML = `<tr><td colspan="4">No se encontraron talleres con el nombre indicado.</td></tr>`;
        return;
    }
    talleres.forEach((taller) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${taller.id}</td>
            <td>${taller.nombre}</td>
            <td>${taller.descripcion}</td>
            <td>
                <button class="btn btn-edit" onclick="editTaller(${taller.id}, '${taller.nombre}', '${taller.descripcion}')">Editar</button>
                <button class="btn btn-delete" onclick="deleteTaller(${taller.id})">Eliminar</button>
            </td>
        `;
        talleresTableBody.appendChild(row);
    });
}

// Función para editar un taller
function editTaller(id, nombre, descripcion) {
    isEditing = true; // Cambiar a modo edición
    editingTallerId = id; // Guardar el ID del taller en edición

    // Configurar el modal con los datos existentes
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Editar Taller';
    document.getElementById('nombreTaller').value = nombre;
    document.getElementById('descripcionTaller').value = descripcion;
}

// Función para actualizar un taller
async function updateTaller(id, tallerData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tallerData)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar taller: ${response.status}`);
        }

        alert('Taller actualizado exitosamente');
        modal.style.display = 'none'; // Cerrar el modal
        isEditing = false; // Reiniciar el modo edición
        editingTallerId = null; // Limpiar el ID de edición
        fetchTalleres(); // Refrescar la lista de talleres
    } catch (error) {
        console.error("Error al actualizar el taller:", error);
        alert("No se pudo actualizar el taller. Por favor, intenta nuevamente.");
    }
}

// Función para crear un nuevo taller
async function createTaller(tallerData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tallerData)
        });

        if (!response.ok) {
            throw new Error(`Error al crear taller: ${response.status}`);
        }

        alert('Taller agregado exitosamente');
        modal.style.display = 'none'; // Cerrar el modal
        fetchTalleres(); // Refrescar la lista de talleres
    } catch (error) {
        console.error("Error al agregar el taller:", error);
        alert("No se pudo agregar el taller. Por favor, intenta nuevamente.");
    }
}

// Manejo del formulario del modal
tallerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    // Capturar datos del formulario
    const nombreTaller = document.getElementById('nombreTaller').value.trim();
    const descripcionTaller = document.getElementById('descripcionTaller').value.trim();

    if (!nombreTaller || !descripcionTaller) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const tallerData = {
        nombre: nombreTaller,
        descripcion: descripcionTaller
    };

    if (isEditing) {
        updateTaller(editingTallerId, tallerData); // Llamar a la función para actualizar
    } else {
        createTaller(tallerData); // Llamar a la función para crear
    }
});

// Función para eliminar un taller
async function deleteTaller(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Error al eliminar taller: ${response.status}`);
        
        alert('Taller eliminado exitosamente');
        fetchTalleres(); // Refrescar la lista
    } catch (error) {
        console.error(error);
    }
}

// Manejo del formulario de filtro
filterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar recarga de página
    const nombre = document.getElementById('name').value.trim(); // Obtener el valor del input
    if (nombre) {
        fetchTalleresByNombre(nombre); // Llamar a la función de búsqueda
    } else {
        alert("Por favor ingresa un nombre para filtrar.");
    }
});

// Inicializar el listado al cargar la página
document.addEventListener('DOMContentLoaded', fetchTalleres);
