import { datosProductos } from "../productos/productos.js";

export function renderCarrusel() {
    const contenedor = document.getElementById("contenedor-carrusel");
    if (!contenedor) return;

    const isInsidePages = window.location.pathname.includes('/pages/');
    const productosDestacados = datosProductos.slice(0, 3);

    let slidesHTML = productosDestacados.map(producto => {
        const imgPath = isInsidePages ? `../${producto.img}` : producto.img;
        const linkDetalle = isInsidePages ? `detalle.html?id=${producto.id}` : `pages/detalle.html?id=${producto.id}`;

        return `
        <a href="${linkDetalle}" style="min-width: 100%; display: block; position: relative;">
            <img src="${imgPath}" alt="${producto.titulo}" style="width: 100%; height: 400px; object-fit: cover; object-position: center; border-radius: 8px;">
            <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); padding: 10px 20px; border-radius: 5px;">
                <h3 class="title is-5 has-text-white m-0">${producto.titulo}</h3>
                <p class="subtitle is-6 has-text-success m-0">$${producto.precio.toLocaleString('es-CL')}</p>
            </div>
        </a>
        `;
    }).join('');

    contenedor.innerHTML = `
        <div id="caja-banner" style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <button class="button is-dark is-rounded" id="btn-izq-banner" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); z-index: 10; opacity: 0.8; border: 2px solid white;">
                &#10094;
            </button>

            <div id="pista-banner" style="display: flex; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; width: 100%;">
                <style>
                    #pista-banner::-webkit-scrollbar { display: none; }
                    #pista-banner { -ms-overflow-style: none; scrollbar-width: none; }
                    #pista-banner > a { scroll-snap-align: start; flex-shrink: 0; }
                </style>
                ${slidesHTML}
            </div>

            <button class="button is-dark is-rounded" id="btn-der-banner" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); z-index: 10; opacity: 0.8; border: 2px solid white;">
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