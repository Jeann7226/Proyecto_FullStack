import './components/alerta.js';
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

    // Conservamos la lógica de main: Productos del LocalStorage (Admin)
    const productosActualizados = JSON.parse(localStorage.getItem('adminProductos')) || datosProductos;
    const productosAMostrar = isInsidePages ? productosActualizados : productosActualizados.slice(0, 8);

    productosAMostrar.forEach(producto => {
        // Conservamos la lógica de main: Soporte para imágenes base64 del Admin
        let imgPath = producto.img;
        if (imgPath && !imgPath.startsWith('data:') && !imgPath.startsWith('http')) {
            imgPath = isInsidePages ? `../${imgPath}` : imgPath;
        } else if (!imgPath) {
            imgPath = '';
        }

        const linkDetalle = isInsidePages ? `detalle.html?id=${producto.id}` : `pages/detalle.html?id=${producto.id}`;

        const tarjeta = `
            <article class="column is-12-mobile is-4-tablet is-3-desktop">
                <!-- Envolvemos TODA la tarjeta en un enlace <a> hacia el detalle real -->
                <a href="${linkDetalle}" class="card-link">
                    
                    <!-- Le agregamos 'is-hoverable' para que haga un efecto al pasar el mouse -->
                    <div class="card is-hoverable card-flex">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${imgPath}" alt="${producto.titulo}" class="img-cover">
                            </figure>
                        </div>
                        <header class="card-content has-text-centered flex-grow-1">
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
