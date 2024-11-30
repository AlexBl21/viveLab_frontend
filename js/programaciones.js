// Selección de elementos del DOM
const modal = document.getElementById('programacionModal');
const addProgramacionBtn = document.getElementById('addProgramacionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const tableBody = document.querySelector(".tabla-generica tbody");
const filterForm = document.querySelector(".filters form");
const API_URL = "http://localhost:8080/api/programaciones";

let editingProgramacion = null; // Variable para manejar la programación que se está editando

// Mostrar el modal para agregar programación
addProgramacionBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Agregar Programación';
    document.getElementById('programacionForm').reset(); // Limpia el formulario
    editingProgramacion = null; // Restablece la edición
});

// Cerrar el modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Función para cargar las programaciones desde la API
const loadProgramaciones = (filters = {}) => {
    let url = `${API_URL}`;

    // Si se aplican filtros, añade parámetros a la URL
    if (filters.name || filters.date) {
        url += `?taller=${filters.name || ""}&fecha=${filters.date || ""}`;
    }

    axios
        .get(url)
        .then(response => {
            renderTable(response.data);
        })
        .catch(error => {
            console.error("Error al cargar las programaciones:", error);
        });
};

// Renderiza las programaciones en la tabla
const renderTable = (programaciones) => {
    tableBody.innerHTML = ""; // Limpia las filas existentes

    if (programaciones.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='11'>No se encontraron programaciones</td></tr>";
        return;
    }

    programaciones.forEach(programacion => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${programacion.id}</td>
            <td>${programacion.taller.nombre}</td>
            <td>${programacion.instructor.nombre}</td>
            <td>${programacion.colegio.nombre}</td>
            <td>${programacion.ubicacion.nombre}</td>
            <td>${programacion.fechaInicio} - ${programacion.fechaFin}</td>
            <td>${programacion.grado}</td>
            <td>${programacion.grupo}</td>
            <td>${programacion.cantidad}</td>
            <td>${programacion.observacion}</td>
            <td>
                <button class="btn btn-edit">Editar</button>
                <button class="btn btn-delete">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Escuchar el envío del formulario de filtros
filterForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const name = document.getElementById("name").value.trim(); // Obtiene el valor del filtro

    if (name) {
        // Llama al backend con el nombre del taller
        axios
            .get(`${API_URL}/listByNombreTaller/${encodeURIComponent(name)}`)
            .then(response => {
                renderTable(response.data); // Renderiza los datos filtrados
            })
            .catch(error => {
                console.error("Error al filtrar programaciones:", error);
                alert("No se encontraron programaciones con ese nombre.");
            });
    } else {
        alert("Por favor, ingresa un nombre para buscar.");
    }
});

// Cargar las programaciones al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    loadProgramaciones();
});
