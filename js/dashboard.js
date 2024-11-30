// Obtener los talleres : /api/talleres
const obtenerTalleres = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/talleres");
        console.log("Datos obtenidos:", response.data); // Imprime los datos obtenidos
        const talleres = response.data;
        mostrarTalleres(talleres);
    } catch (error) {
        console.error("Error al obtener los talleres:", error);
    }
};

const mostrarTalleres = (talleres) => {
    // Selecciona el contenedor donde se muestra el número de talleres
    const talleresContenedor = document.querySelector(".stats-cards .card:nth-child(1) p");

    if (talleresContenedor) {
        talleresContenedor.textContent = talleres.length || 0; // Actualiza con la cantidad de talleres
    } else {
        console.error("No se encontró el contenedor para mostrar los talleres.");
    }
};

// Obtener las inscripcines : /api/inscripciones
const obtenerInscripciones = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/inscripciones");
        console.log("Datos de inscripciones obtenidos:", response.data); // Imprime los datos obtenidos
        const inscripciones = response.data;
        mostrarInscripciones(inscripciones);
    } catch (error) {
        console.error("Error al obtener las inscripciones:", error);
    }
};

const mostrarInscripciones = (inscripciones) => {
    // Selecciona el contenedor donde se muestra el número de inscripciones
    const inscripcionesContenedor = document.querySelector(".stats-cards .card:nth-child(2) p");

    if (inscripcionesContenedor) {
        inscripcionesContenedor.textContent = inscripciones.length || 0; // Actualiza con la cantidad de inscripciones
    } else {
        console.error("No se encontró el contenedor para mostrar las inscripciones.");
    }
};

// Obtener las Sesiones : /api/sesiones
const obtenerSesiones = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/sesiones");
        console.log("Datos de sesiones obtenidas:", response.data); // Imprime los datos obtenidos
        const sesiones = response.data;
        mostrarSesiones(sesiones);
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
    }
};

const mostrarSesiones = (sesiones) => {
    // Selecciona el contenedor donde se muestra el número de sesiones
    const sesionesContenedor = document.querySelector(".stats-cards .card:nth-child(3) p");

    if (sesionesContenedor) {
        sesionesContenedor.textContent = sesiones.length || 0; // Actualiza con la cantidad de sesiones
    } else {
        console.error("No se encontró el contenedor para mostrar las sesiones.");
    }
};

// Obtener los Instructores : /api/instructores
const obtenerInstructores = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/instructores");
        console.log("Datos de instructores obtenidos:", response.data); // Imprime los datos obtenidos
        const instructores = response.data;
        mostrarInstructores(instructores);
    } catch (error) {
        console.error("Error al obtener los instructores:", error);
    }
};

const mostrarInstructores = (instructores) => {
    // Selecciona el contenedor donde se muestra el número de instructores
    const instructoresContenedor = document.querySelector(".stats-cards .card:nth-child(4) p");

    if (instructoresContenedor) {
        instructoresContenedor.textContent = instructores.length || 0; // Actualiza con la cantidad de instructores
    } else {
        console.error("No se encontró el contenedor para mostrar los instructores.");
    }
};

// Llamamos a las funciones para obtener los datos
obtenerTalleres();
obtenerInscripciones();
obtenerSesiones();
obtenerInstructores();

