import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

renderHeader();
renderFooter();

const contenedorContacto = document.getElementById("contenedor-contacto");

if (contenedorContacto) {
    contenedorContacto.innerHTML = `
        <div class="columns is-centered">
            <div class="column is-6-tablet is-5-desktop">
                <div class="box p-5">
                    <div class="notification is-light has-text-centered has-text-weight-bold mb-4">
                        FORMULARIO DE CONTACTOS
                    </div>

                    <div id="mensaje-exito" class="notification is-success is-light is-hidden mb-4">
                        ¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.
                    </div>

                    <form id="formulario-contacto" novalidate>
                        <!-- Campo para Nombre Completo -->
                        <div class="field mb-4">
                            <label class="label is-size-7" for="nombre">NOMBRE COMPLETO</label>
                            <div class="control">
                                <input class="input" type="text" id="nombre" placeholder="Tu nombre">
                            </div>
                        </div>

                        <!-- Campo para Correo Electrónico -->
                        <div class="field mb-4">
                            <label class="label is-size-7" for="correo">CORREO</label>
                            <div class="control">
                                <input class="input" type="email" id="correo" placeholder="ejemplo@correo.com">
                            </div>
                            <p class="help is-danger" id="error-correo"></p>
                        </div>

                        <!-- Campo para Contenido o Mensaje -->
                        <div class="field mb-5">
                            <label class="label is-size-7" for="contenido">CONTENIDO</label>
                            <div class="control">
                                <textarea class="textarea" id="contenido" rows="4" placeholder="Escribe tu mensaje..."></textarea>
                            </div>
                            <p class="help is-danger" id="error-contenido"></p>
                        </div>

                        <!-- Botón de envío -->
                        <div class="field has-text-centered">
                            <button type="submit" class="button is-dark is-fullwidth has-text-weight-semibold">
                                ENVIAR MENSAJE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // 1. Obtener elementos usando los IDs exactos del HTML inyectado
    const form = document.getElementById("formulario-contacto");
    const inputEmail = document.getElementById("correo");
    const inputMensaje = document.getElementById("contenido");

    const errorEmail = document.getElementById("error-correo");
    const errorMensaje = document.getElementById("error-contenido");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Expresión regular para validar formato correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 2. Evento submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let esValido = true;

        // Validación 1: Correo
        if (!regexEmail.test(inputEmail.value.trim())) {
            inputEmail.classList.add("is-danger");
            errorEmail.textContent = "Ingresa un correo electrónico válido.";
            esValido = false;
        } else {
            inputEmail.classList.remove("is-danger");
            errorEmail.textContent = "";
        }

        // Validación 2: Contenido (mínimo 10 caracteres)
        if (inputMensaje.value.trim().length < 10) {
            inputMensaje.classList.add("is-danger");
            errorMensaje.textContent = "El mensaje debe contener al menos 10 caracteres.";
            esValido = false;
        } else {
            inputMensaje.classList.remove("is-danger");
            errorMensaje.textContent = "";
        }

        // Si pasa ambas validaciones
        if (esValido) {
            mensajeExito.classList.remove("is-hidden");
            form.reset();
            setTimeout(() => {
                mensajeExito.classList.add("is-hidden");
            }, 4000);
        }
    });
}