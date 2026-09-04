import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// Capturar el contenedor usando su ID
const contenedor = document.getElementById("contenedor-nosotros");

// Limpiamos el contenedor
contenedor.innerHTML = "";

// Inyectamos la información de la empresa y el equipo
contenedor.innerHTML = `
    <h1 class="title has-text-centered mb-2">Sobre Nosotros</h1>
    <p class="subtitle has-text-centered has-text-grey mb-6">Conoce la historia de nuestra tienda y al equipo de desarrollo.</p>

    <!-- Información de la Empresa -->
    <article class="box p-5 mb-6">
        <h2 class="title is-4 mb-3">Nuestra Empresa</h2>
        <div class="content is-medium">
            <p>
                Somos una tienda especializada en la venta y rescate de indumentaria deportiva histórica y actual. Nuestro objetivo es ofrecer a los hinchas y coleccionistas camisetas oficiales de clubes y selecciones, combinando calidad con el trasfondo cultural y deportivo que representa cada uniforme.
            </p>
        </div>
    </article>

    <!-- Información del Equipo de Desarrolladores -->
    <h2 class="title is-4 has-text-centered mb-5">Equipo de Desarrolladores</h2>
    <div class="columns is-multiline">
        
        <!-- Jean Gutiérrez -->
        <article class="column is-12-mobile is-4-tablet">
            <div class="card p-4 has-text-centered" style="height: 100%;">
                <div class="card-content">
                    <p class="title is-5">Jean Gutiérrez</p>
                    <p class="subtitle is-6 has-text-grey">Desarrollador</p>
                    <span class="tag is-dark mb-3">Lógica & Datos</span>
                    <p class="is-size-7">Modularización de datos, renderizado dinámico de productos y blogs mediante JavaScript.</p>
                </div>
            </div>
        </article>

        <!-- Daniel Mora -->
        <article class="column is-12-mobile is-4-tablet">
            <div class="card p-4 has-text-centered" style="height: 100%;">
                <div class="card-content">
                    <p class="title is-5">Daniel Mora</p>
                    <p class="subtitle is-6 has-text-grey">Desarrollador</p>
                    <span class="tag is-dark mb-3">Estructura & Vistas</span>
                    <p class="is-size-7">Maquetación semántica con Bulma CSS y diseño responsivo de las páginas del sitio.</p>
                </div>
            </div>
        </article>

        <!-- Darien Lizama -->
        <article class="column is-12-mobile is-4-tablet">
            <div class="card p-4 has-text-centered" style="height: 100%;">
                <div class="card-content">
                    <p class="title is-5">Darien Lizama</p>
                    <p class="subtitle is-6 has-text-grey">Desarrollador</p>
                    <span class="tag is-dark mb-3">Validaciones & DOM</span>
                    <p class="is-size-7">Gestión de interacciones de usuario, eventos del navegador y control de formularios.</p>
                </div>
            </div>
        </article>

    </div>
`;