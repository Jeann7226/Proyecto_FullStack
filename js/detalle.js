import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

renderHeader();
renderFooter();

const urlParams = new URLSearchParams(window.location.search);
const idProducto = parseInt(urlParams.get("id")) || 1;
const producto = datosProductos.find(p => p.id === idProducto);

const contenedorDetalle = document.getElementById("contenedor-detalle");

if (producto && contenedorDetalle) {
    // Si el producto tiene un arreglo de imágenes lo usa, si no, creamos un set con frente y espalda
    // Ajusta según tus rutas en assets/ (ej: lau1 y lau2)
    const imagenes = producto.imagenes || [
        `../${producto.img}`,
        `../${producto.img.replace('1.', '2.')}` // Busca la espalda (ej: lau1 -> lau2)
    ];

    let indexActual = 0;

    contenedorDetalle.innerHTML = `
        <div class="columns is-vcentered">
            <!-- Columna Galería Interactiva -->
            <div class="column is-7">
                <div class="galeria-contenedor">
                    <!-- Miniaturas a la izquierda -->
                    <div class="galeria-miniaturas" id="miniaturas">
                        ${imagenes.map((img, i) => `
                            <div class="miniatura-item ${i === 0 ? 'activa' : ''}" data-index="${i}">
                                <img src="${img}" alt="Vista ${i + 1}">
                            </div>
                        `).join('')}
                    </div>

                    <!-- Imagen Grande con Flechas -->
                    <div class="galeria-principal">
                        <button class="btn-flecha izq" id="flecha-izq">&#10094;</button>
                        <img id="img-grande" src="${imagenes[0]}" alt="${producto.titulo}">
                        <button class="btn-flecha der" id="flecha-der">&#10095;</button>
                    </div>
                </div>
            </div>

            <!-- Columna Datos de Compra (Talla, Botón, etc.) -->
            <div class="column is-5">
                <h1 class="title is-3">${producto.titulo}</h1>
                <p class="subtitle is-4 has-text-success has-text-weight-bold">$${producto.precio.toLocaleString('es-CL')}</p>
                <hr>
                <p class="mb-4">Camiseta oficial temporada 2026. Confección de alta calidad con tecnología transpirable.</p>
                
                <!-- Selector de Tallas y botón comprar -->
                <button class="button is-primary is-fullwidth is-medium mt-4">Agregar al Carrito</button>
            </div>
        </div>
    `;

    // LÓGICA DE INTERACCIÓN (FLECHAS Y MINIATURAS)
    const imgGrande = document.getElementById("img-grande");
    const miniaturas = document.querySelectorAll(".miniatura-item");
    const btnIzq = document.getElementById("flecha-izq");
    const btnDer = document.getElementById("flecha-der");

    function actualizarGaleria(nuevoIndex) {
        indexActual = nuevoIndex;
        if (indexActual < 0) indexActual = imagenes.length - 1;
        if (indexActual >= imagenes.length) indexActual = 0;

        // Cambiar la foto principal
        imgGrande.src = imagenes[indexActual];

        // Resaltar miniatura activa
        miniaturas.forEach((mini, i) => {
            mini.classList.toggle("activa", i === indexActual);
        });
    }

    // Clic en miniaturas
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener("click", () => {
            const idx = parseInt(miniatura.dataset.index);
            actualizarGaleria(idx);
        });
    });

    // Clic en flechas
    btnIzq.addEventListener("click", () => actualizarGaleria(indexActual - 1));
    btnDer.addEventListener("click", () => actualizarGaleria(indexActual + 1));
}