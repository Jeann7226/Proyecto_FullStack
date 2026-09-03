import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// Capturamos el contenedor del HTML
const contenedorDetalle = document.getElementById("contenedor-detalle");

// 1. Leer la URL para saber qué ID buscar
const parametrosURL = new URLSearchParams(window.location.search);
const idProducto = parseInt(parametrosURL.get("id")); // Convertimos el texto a número

// 2. Buscar la camiseta en el JSON
const producto = datosProductos.find(item => item.id === idProducto);

// 3. Mostrar el producto en pantalla
if (producto) {
    // Si la camiseta existe, armamos el diseño con Bulma CSS
    contenedorDetalle.innerHTML = `
        <article class="columns is-vcentered">
            <div class="column is-half">
                <figure class="image is-4by3">
                    <img src="../${producto.img}" alt="${producto.titulo}"">
                    
                </figure>
                <figure class="image is-4by3">
                <img src="../${producto.img2}" alt="${producto.titulo}"">
                </figure>
            </div>
            <div class="column is-half">
                <h1 class="title is-2">${producto.titulo}</h1>
                <p class="subtitle is-3 has-text-success mt-3">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="content is-medium mt-4">${producto.descripcion}</p>
                
                <div class="buttons mt-5">
                    <button class="button is-primary is-large" id="btn-agregar">
                        Agregar al Carrito
                    </button>
                    <a href="../index.html" class="button is-light is-large">
                        Volver al inicio
                    </a>
                </div>
            </div>
        </article>
    `;
} else {
    // Mensaje de error por si alguien entra sin ID
    contenedorDetalle.innerHTML = `
        <div class="notification is-danger has-text-centered">
            <h2 class="title is-4">¡Ups! Producto no encontrado.</h2>
            <a href="../index.html" class="button is-light mt-3">Volver al inicio</a>
        </div>
    `;
}