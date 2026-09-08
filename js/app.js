import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";
import { renderCarrusel } from "./components/carrusel.js"; 

renderHeader();
renderFooter();
renderCarrusel();

const contenedor = document.getElementById("contenedor-productos-home") || document.getElementById("contenedor-productos");

if (contenedor) {
    contenedor.innerHTML = "";
    const isInsidePages = window.location.pathname.includes('/pages/');
    const productosAMostrar = isInsidePages ? datosProductos : datosProductos.slice(0, 8);

    productosAMostrar.forEach(producto => {
        const imgPath = isInsidePages ? `../${producto.img}` : producto.img;
        const linkDetalle = isInsidePages ? `detalle.html?id=${producto.id}` : `pages/detalle.html?id=${producto.id}`;

        const tarjeta = `
            <article class="column is-12-mobile is-4-tablet is-3-desktop">
                <a href="${linkDetalle}" style="display: block; height: 100%; text-decoration: none;">
                    <div class="card is-hoverable" style="height: 100%; display: flex; flex-direction: column;">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${imgPath}" alt="${producto.titulo}" style="object-fit: cover;">
                            </figure>
                        </div>
                        <header class="card-content has-text-centered" style="flex-grow: 1;">
                            <h3 class="title is-5 has-text-dark">${producto.titulo}</h3>
                            <p class="subtitle is-6 mt-2 has-text-weight-bold has-text-success">
                                $${producto.precio.toLocaleString('es-CL')}
                            </p>
                        </header>
                    </div>
                </a>
            </article>
        `;
        contenedor.innerHTML += tarjeta;
    });
}