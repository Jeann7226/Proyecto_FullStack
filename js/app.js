import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// 2. Capturar el contenedor usando su ID (ya no necesitamos el [0])

const contenedor = document.getElementById("contenedor-productos");
// Limpiamos el contenedor
if (contenedor) {
    contenedor.innerHTML = "";

    // Iteramos el JSON para crear las tarjetaas
    datosProductos.forEach(producto => {
        const tarjeta = `
            <article class="column is-12-mobile is-4-tablet is-3-desktop">
                <!-- Envolvemos TODA la tarjeta en un enlace <a> -->
                <a href="producto.html?id=${producto.id}" style="display: block; height: 100%; text-decoration: none;">
                    
                    <!-- Le agregamos 'is-hoverable' para que haga un efecto al pasar el mouse -->
                    <div class="card is-hoverable" style="height: 100%; display: flex; flex-direction: column;">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${producto.img}" alt="${producto.titulo}" style="object-fit: cover;">
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
