import './components/alerta.js';
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./data/productos.js";

renderHeader();
renderFooter();

const urlParams = new URLSearchParams(window.location.search);
const idProducto = parseInt(urlParams.get("id")) || 1;

// buscamos productos en memoria o usamos los por defecto
const productosActualizados = JSON.parse(localStorage.getItem('adminProductos')) || datosProductos;
const producto = productosActualizados.find(p => p.id === idProducto);

const contenedorDetalle = document.getElementById("contenedor-detalle");

if (producto && contenedorDetalle) {
    // arreglamos la ruta de las fotos
    let imgSrc = producto.img || '';
    if (imgSrc && !imgSrc.startsWith('data:') && !imgSrc.startsWith('http')) {
        imgSrc = '../' + imgSrc;
    }

    let imgSrc2 = producto.img2 || '';
    if (imgSrc2 && !imgSrc2.startsWith('data:') && !imgSrc2.startsWith('http')) {
        imgSrc2 = '../' + imgSrc2;
    } else if (!imgSrc2 && !imgSrc.startsWith('data:') && imgSrc) {
        // si no tiene segunda foto probamos algo por defecto
        imgSrc2 = imgSrc.replace('1.', '2.');
    }

    const imagenes = producto.imagenes || [];
    if (imagenes.length === 0) {
        if (imgSrc) imagenes.push(imgSrc);
        if (imgSrc2) imagenes.push(imgSrc2);
    }

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

            <!-- Columna Datos de Compra (Talla, Boton, etc.) -->
            <div class="column is-5">
                <h1 class="title is-3">${producto.titulo}</h1>
                <p class="subtitle is-4 has-text-success has-text-weight-bold">$${producto.precio.toLocaleString('es-CL')}</p>
                <hr>
                <p class="content is-medium mt-4">${producto.descripcion || 'Sin descripción'}</p>
                
                <!-- TALLAS -->
                <div class="field mt-5">
                    <label class="label is-size-5 mb-3">Tallas</label>
                    <div class="buttons mt-2" id="contenedor-tallas">
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="XS">XS</button>
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="S">S</button>
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="M">M</button>
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="L">L</button>
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="XL">XL</button>
                        <button class="button is-light is-medium talla-btn w-60px" data-talla="2XL">2XL</button>
                    </div>
                </div>

                <!-- CANTIDAD -->
                <div class="field mt-4">
                    <label class="label is-size-5 mb-3">Cantidad</label>
                    <div class="field has-addons">
                        <p class="control">
                            <button class="button is-light is-medium" id="btn-restar">-</button>
                        </p>
                        <p class="control">
                            <input class="input is-medium has-text-centered has-text-weight-bold w-60px" type="text" id="input-cantidad" value="1" readonly>
                        </p>
                        <p class="control">
                            <button class="button is-light is-medium" id="btn-sumar">+</button>
                        </p>
                    </div>
                </div>
                
                <!-- Boton comprar -->
                <button class="button is-primary is-fullwidth is-medium mt-4" id="btn-agregar">Agregar al Carrito</button>
            </div>
        </div>
    `;

    // lo de las flechitas y fotos chicas
    const imgGrande = document.getElementById("img-grande");
    const miniaturas = document.querySelectorAll(".miniatura-item");
    const btnIzq = document.getElementById("flecha-izq");
    const btnDer = document.getElementById("flecha-der");

    function actualizarGaleria(nuevoIndex) {
        indexActual = nuevoIndex;
        if (indexActual < 0) indexActual = imagenes.length - 1;
        if (indexActual >= imagenes.length) indexActual = 0;

        // cambiamos la foto grande
        imgGrande.src = imagenes[indexActual];

        // marcamos cual foto chica esta viendose
        miniaturas.forEach((mini, i) => {
            mini.classList.toggle("activa", i === indexActual);
        });
    }

    // al pinchar foto chica
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener("click", () => {
            const idx = parseInt(miniatura.dataset.index);
            actualizarGaleria(idx);
        });
    });

    // al pinchar flechas
    if (btnIzq && btnDer) {
        btnIzq.addEventListener("click", () => actualizarGaleria(indexActual - 1));
        btnDer.addEventListener("click", () => actualizarGaleria(indexActual + 1));
    }

    // tallas sumar cosas y agregar al carrito
    const btnAgregar = document.getElementById("btn-agregar");
    const botonesTalla = document.querySelectorAll(".talla-btn");
    const btnRestar = document.getElementById("btn-restar");
    const btnSumar = document.getElementById("btn-sumar");
    const inputCantidad = document.getElementById("input-cantidad");

    let tallaElegida = ""; 
    let cantidadElegida = 1;

    // botonera de tallas
    if (botonesTalla.length > 0) {
        botonesTalla.forEach(boton => {
            boton.addEventListener("click", (e) => {
                botonesTalla.forEach(b => {
                    b.classList.remove("is-dark");
                    b.classList.add("is-light");
                });
                const btnClickeado = e.target;
                btnClickeado.classList.remove("is-light");
                btnClickeado.classList.add("is-dark");
                tallaElegida = btnClickeado.getAttribute("data-talla");
            });
        });
    }

    // lo de mas y menos cantidad
    if (btnRestar && btnSumar && inputCantidad) {
        btnRestar.addEventListener("click", () => {
            if (cantidadElegida > 1) { 
                cantidadElegida--;
                inputCantidad.value = cantidadElegida;
            }
        });

        btnSumar.addEventListener("click", () => {
            cantidadElegida++;
            inputCantidad.value = cantidadElegida;
        });
    }

    // boton de agregar al carrito
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            if (tallaElegida === "") {
                alert("Por favor, selecciona una talla antes de agregar al carrito.");
                return; 
            }

            let carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];
            const productoExistente = carritoMemoria.find(item => item.id === producto.id && item.talla === tallaElegida);
            
            if (productoExistente) {
                productoExistente.cantidad += cantidadElegida;
            } else {
                carritoMemoria.push({ ...producto, cantidad: cantidadElegida, talla: tallaElegida });
            }
            
            localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria));
            alert(`Se agregaron ${cantidadElegida} camiseta(s) ${producto.titulo} (Talla ${tallaElegida}) al carrito!`);
        });
    }
}
