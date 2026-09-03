import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// 2. Capturar el contenedor usando su ID (ya no necesitamos el [0])

const contenedor = document.getElementById("contenedor-productos");

// Limpiamos el contenedor para evitar duplicados
contenedor.innerHTML = "";

// Iteramos el JSON para crear las tarjetas con diseño
datosProductos.forEach(producto => {
    const tarjeta = `
        <article class="column is-12-mobile is-4-tablet is-3-desktop">
            <div class="card" style="height: 100%; display: flex; flex-direction: column;">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <!-- Usamos object-fit para que las fotos no se deformen -->
                        <img src="${producto.img}" alt="${producto.titulo}" style="object-fit: cover;">
                    </figure>
                </div>
                <header class="card-content has-text-centered" style="flex-grow: 1;">
                    <h3 class="title is-5">${producto.titulo}</h3>
                    <p class="subtitle is-6 mt-2 has-text-weight-bold">
                        $${producto.precio.toLocaleString('es-CL')}
                    </p>
                    <!-- BOTÓN VER DETALLE CON EL ID DINÁMICO -->
                    <a href="pages/detalle.html?id=${producto.id}" class="button is-link is-fullwidth mt-auto">
                        Ver Detalles
                    </a>
                    <button class="button is-primary is-fullwidth mt-2">
                        Agregar al carrito
                    </button>
                </header>
            </div>
        </article>
    `;
    // Inyectamos la tarjeta en el HTML
    contenedor.innerHTML += tarjeta;
});