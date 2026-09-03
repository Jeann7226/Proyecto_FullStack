import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

renderHeader();
renderFooter();

// Buscar el contenedor en index.html o en pages/productos.html
const contenedor = document.getElementById("contenedor-productos-home") || document.getElementById("contenedor-productos");

// Limpiamos el contenedor
if (contenedor) {
    contenedor.innerHTML = "";

    // Averiguamos si estamos dentro de la carpeta pages/
    const isInsidePages = window.location.pathname.includes('/pages/');

    // Si estamos en el home (no en pages), limitamos a 8 productos. Si no, mostramos todos.
    const productosAMostrar = isInsidePages ? datosProductos : datosProductos.slice(0, 8);

    // Iteramos el JSON para crear las tarjetas
    productosAMostrar.forEach(producto => {
        // Ajustamos la ruta de la imagen y del enlace dependiendo de dónde estemos
        const imgPath = isInsidePages ? `../${producto.img}` : producto.img;
        const linkDetalle = isInsidePages ? `detalle.html?id=${producto.id}` : `pages/detalle.html?id=${producto.id}`;

        const tarjeta = `
            <article class="column is-12-mobile is-4-tablet is-3-desktop">
                <!-- Envolvemos TODA la tarjeta en un enlace <a> hacia el detalle real -->
                <a href="${linkDetalle}" style="display: block; height: 100%; text-decoration: none;">
                    
                    <!-- Le agregamos 'is-hoverable' para que haga un efecto al pasar el mouse -->
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
        // Inyectamos la tarjeta en el HTML
        contenedor.innerHTML += tarjeta;
    });
}
