// Seleccionar el formulario y los campos de entrada
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Credenciales predefinidas para el administrador
const ADMIN_CREDENTIALS = {
    username: "Sebastian Martinez",
    password: "10941094",
};

// Función para manejar el evento de envío del formulario
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir la recarga de la página

    // Obtener los valores ingresados por el usuario
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Verificar credenciales
    if (enteredUsername === ADMIN_CREDENTIALS.username && enteredPassword === ADMIN_CREDENTIALS.password) {
        // Redirigir al dashboard del administrador
        window.location.href = "dashboard.html";
    } else {
        // Redirigir al dashboard del instructor si no son las credenciales del administrador
        window.location.href = "dashboard_instructor.html";
    }
});
