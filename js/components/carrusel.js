import { datosProductos } from "../data/productos.js";

export function renderCarrusel() {
    const contenedor = document.getElementById("contenedor-carrusel");
    if (!contenedor) return;

    const isInsidePages = window.location.pathname.includes('/pages/');
    const productosDestacados = datosProductos.slice(0, 3);

    let slidesHTML = productosDestacados.map(producto => {
        const imgPath = isInsidePages ? `../${producto.img}` : producto.img;
        const linkDetalle = isInsidePages ? `detalle.html?id=${producto.id}` : `pages/detalle.html?id=${producto.id}`;

        return `
        <a href="${linkDetalle}" class="carrusel-slide-link">
            <img src="${imgPath}" alt="${producto.titulo}" class="carrusel-slide-img">
            <div class="carrusel-slide-info">
                <h3 class="title is-5 has-text-white m-0">${producto.titulo}</h3>
                <p class="subtitle is-6 has-text-success m-0">$${producto.precio.toLocaleString('es-CL')}</p>
            </div>
        </a>
        `;
    }).join('');

    contenedor.innerHTML = `
        <div id="caja-banner">
            <button class="button is-dark is-rounded" id="btn-izq-banner">
                &#10094;
            </button>

            <div id="pista-banner">
                ${slidesHTML}
            </div>

            <button class="button is-dark is-rounded" id="btn-der-banner">
                &#10095;
            </button>
        </div>
    `;

    const pista = document.getElementById("pista-banner");
    const cajaBanner = document.getElementById("caja-banner");
    
    // Funciones para deslizar manual
    document.getElementById("btn-izq-banner").addEventListener("click", () => {
        pista.scrollBy({ left: -pista.offsetWidth, behavior: 'smooth' });
    });
    
    document.getElementById("btn-der-banner").addEventListener("click", () => {
        pista.scrollBy({ left: pista.offsetWidth, behavior: 'smooth' });
    });

    // NUEVO: Lógica de Autoplay
    let intervaloAutoPlay;

    function iniciarAutoPlay() {
        intervaloAutoPlay = setInterval(() => {
            // Verificamos si llegamos al final del carrusel
            if (pista.scrollLeft + pista.offsetWidth >= pista.scrollWidth - 10) {
                // Volver al principio
                pista.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Avanzar una imagen
                pista.scrollBy({ left: pista.offsetWidth, behavior: 'smooth' });
            }
        }, 4000); // Cambia de imagen cada 4000 milisegundos (4 segundos)
    }

    // Pausar si el mouse está encima, reanudar si se quita
    cajaBanner.addEventListener("mouseenter", () => clearInterval(intervaloAutoPlay));
    cajaBanner.addEventListener("mouseleave", iniciarAutoPlay);

    // Arrancamos el autoplay al cargar
    iniciarAutoPlay();
}