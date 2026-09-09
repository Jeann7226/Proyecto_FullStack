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
    
    // pa mover las fotos a mano
    document.getElementById("btn-izq-banner").addEventListener("click", () => {
        pista.scrollBy({ left: -pista.offsetWidth, behavior: 'smooth' });
    });
    
    document.getElementById("btn-der-banner").addEventListener("click", () => {
        pista.scrollBy({ left: pista.offsetWidth, behavior: 'smooth' });
    });

    // logica pa que se mueva sola la cosa
    let intervaloAutoPlay;

    function iniciarAutoPlay() {
        intervaloAutoPlay = setInterval(() => {
            // vemos si tamos en la ultima foto
            if (pista.scrollLeft + pista.offsetWidth >= pista.scrollWidth - 10) {
                // volvemos al incio
                pista.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // pasamos a la que sigue
                pista.scrollBy({ left: pista.offsetWidth, behavior: 'smooth' });
            }
        }, 4000); // cambiamos cada 4 segundos
    }

    // si pone el mouse encima pausamos
    cajaBanner.addEventListener("mouseenter", () => clearInterval(intervaloAutoPlay));
    cajaBanner.addEventListener("mouseleave", iniciarAutoPlay);

    // le damos start de una al cargar
    iniciarAutoPlay();
}