
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
                    <!-- Título superior del formulario -->
                    <div class="notification is-light has-text-centered has-text-weight-bold mb-4">
                        FORMULARIO DE CONTACTOS
                    </div>

                    <!-- Mensaje de confirmación (inicia oculto con la clase is-hidden) -->
                    <div id="mensaje-exito" class="notification is-success is-light is-hidden mb-4">
                        ¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.
                    </div>

                    <!-- novalidate apaga las alertas por defecto del navegador para usar nuestras validaciones JS -->
                    <form id="formulario-contacto" novalidate>
                        <!-- Campo para Nombre Completo -->
                        <div class="field mb-4">
                            <label class="label is-size-7" for="nombre">NOMBRE COMPLETO</label>
                            <div class="control">
                                <input class="input" type="text" id="nombre" placeholder="Ej: Jean Gutiérrez">
                            </div>
                            <!-- Párrafo para mostrar mensaje de error (inicia oculto) -->
                            <p class="help is-danger is-hidden" id="error-nombre"></p>
                        </div>

                        <!-- Campo para Correo Electrónico -->
                        <div class="field mb-4">
                            <label class="label is-size-7" for="correo">CORREO</label>
                            <div class="control">
                                <input class="input" type="email" id="correo" placeholder="ejemplo@correo.com">
                            </div>
                            <!-- Párrafo para mostrar mensaje de error (inicia oculto) -->
                            <p class="help is-danger is-hidden" id="error-correo"></p>
                        </div>

                        <!-- Campo para Contenido o Mensaje -->
                        <div class="field mb-5">
                            <label class="label is-size-7" for="contenido">CONTENIDO</label>
                            <div class="control">
                                <textarea class="textarea" id="contenido" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
                            </div>
                            <!-- Párrafo para mostrar mensaje de error (inicia oculto) -->
                            <p class="help is-danger is-hidden" id="error-contenido"></p>
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

    const formulario = document.getElementById("formulario-contacto");
    const inputNombre = document.getElementById("nombre");
    const inputCorreo = document.getElementById("correo");
    const inputContenido = document.getElementById("contenido");
    const mensajeExito = document.getElementById("mensaje-exito");

    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");
    const errorContenido = document.getElementById("error-contenido");

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


    // ==========================================
    // 7. ESCUCHA DE EVENTOS EN TIEMPO REAL
    // ==========================================

    // Con el evento "input" evaluamos cada campo inmediatamente mientras el usuario teclea
    inputNombre.addEventListener("input", validarNombre);
    inputCorreo.addEventListener("input", validarCorreo);
    inputContenido.addEventListener("input", validarContenido);

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

}