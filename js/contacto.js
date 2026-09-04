import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();
// Elementos del formulario
const formulario = document.getElementById("formulario-contacto");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputContenido = document.getElementById("contenido");
const mensajeExito = document.getElementById("mensaje-exito");

// Mensajes de error en el DOM
const errorNombre = document.getElementById("error-nombre");
const errorCorreo = document.getElementById("error-correo");
const errorContenido = document.getElementById("error-contenido");

// Expresión regular para validar formato de correo
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const mostrarError = (input, elementoError, mensaje) => {
    input.classList.remove("is-success");
    input.classList.add("is-danger");
    elementoError.textContent = mensaje;
    elementoError.classList.remove("is-hidden");
};

const marcarValido = (input, elementoError) => {
    input.classList.remove("is-danger");
    input.classList.add("is-success");
    elementoError.textContent = "";
    elementoError.classList.add("is-hidden");
};

const validarNombre = () => {
    const valor = inputNombre.value.trim();
    if (valor === "") {
        mostrarError(inputNombre, errorNombre, "El nombre completo es obligatorio.");
        return false;
    }
    if (valor.length < 3) {
        mostrarError(inputNombre, errorNombre, "El nombre debe tener al menos 3 caracteres.");
        return false;
    }
    marcarValido(inputNombre, errorNombre);
    return true;
};
const validarCorreo = () => {
    const valor = inputCorreo.value.trim();
    if (valor === "") {
        mostrarError(inputCorreo, errorCorreo, "El correo electrónico es obligatorio.");
        return false;
    }
    if (!regexCorreo.test(valor)) {
        mostrarError(inputCorreo, errorCorreo, "Ingresa un correo electrónico válido.");
        return false;
    }
    marcarValido(inputCorreo, errorCorreo);
    return true;
};

const validarContenido = () => {
    const valor = inputContenido.value.trim();
    if (valor === "") {
        mostrarError(inputContenido, errorContenido, "El mensaje no puede estar vacío.");
        return false;
    }
    if (valor.length < 10) {
        mostrarError(inputContenido, errorContenido, "El mensaje debe contener al menos 10 caracteres.");
        return false;
    }
    marcarValido(inputContenido, errorContenido);
    return true;
};

// Escucha en tiempo real
inputNombre.addEventListener("input", validarNombre);
inputCorreo.addEventListener("input", validarCorreo);
inputContenido.addEventListener("input", validarContenido);

// Control de envío
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const okNombre = validarNombre();
    const okCorreo = validarCorreo();
    const okContenido = validarContenido();

    if (okNombre && okCorreo && okContenido) {
        mensajeExito.classList.remove("is-hidden");
        formulario.reset();

        [inputNombre, inputCorreo, inputContenido].forEach(campo => {
            campo.classList.remove("is-success");
        });

        setTimeout(() => {
            mensajeExito.classList.add("is-hidden");
        }, 4000);
    }
});