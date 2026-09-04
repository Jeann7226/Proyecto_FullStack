import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

const contenedorDetalle = document.getElementById("contenedor-detalle");
const parametrosURL = new URLSearchParams(window.location.search);
const idProducto = parseInt(parametrosURL.get("id")); 
const producto = datosProductos.find(item => item.id === idProducto);

if (producto) {
    contenedorDetalle.innerHTML = `
        <div class="mb-5">
            <a href="../index.html" class="has-text-dark is-size-5 has-text-weight-bold">
                &larr; Volver a la tienda
            </a>
        </div>

        <article class="columns is-vcentered">
            <div class="column is-half">
                <figure class="image is-4by3 mb-3">
                    <img src="../${producto.img}" alt="${producto.titulo}">
                </figure>
                <figure class="image is-4by3">
                    <img src="../${producto.img2}" alt="${producto.titulo}">
                </figure>
            </div>
            <div class="column is-half">
                <h1 class="title is-2">${producto.titulo}</h1>
                <p class="subtitle is-3 has-text-success mt-3">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="content is-medium mt-4">${producto.descripcion}</p>
                
                <!-- NUEVO DISEÑO DE TALLAS TIPO CAJAS -->
                <div class="field mt-5">
                    <label class="label is-size-5 mb-3">Tallas</label>
                    <div class="buttons mt-2" id="contenedor-tallas">
                        <!-- Usamos data-talla para guardar el valor oculto en cada botón -->
                        <button class="button is-light is-medium talla-btn" data-talla="XS" style="width: 60px;">XS</button>
                        <button class="button is-light is-medium talla-btn" data-talla="S" style="width: 60px;">S</button>
                        <button class="button is-light is-medium talla-btn" data-talla="M" style="width: 60px;">M</button>
                        <button class="button is-light is-medium talla-btn" data-talla="L" style="width: 60px;">L</button>
                        <button class="button is-light is-medium talla-btn" data-talla="XL" style="width: 60px;">XL</button>
                        <button class="button is-light is-medium talla-btn" data-talla="2XL" style="width: 60px;">2XL</button>
                    </div>
                </div>
                
                <div class="buttons mt-6">
                    <button class="button is-primary is-large" id="btn-agregar">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </article>
    `;
} else {
    contenedorDetalle.innerHTML = `
        <div class="notification is-danger has-text-centered">
            <h2 class="title is-4">¡Ups! Producto no encontrado.</h2>
            <a href="../index.html" class="button is-light mt-3">Volver al inicio</a>
        </div>
    `;
}

// --- LÓGICA DE TALLAS Y CARRITO ---

const btnAgregar = document.getElementById("btn-agregar");
const botonesTalla = document.querySelectorAll(".talla-btn");
let tallaElegida = ""; // Variable para recordar qué talla eligió el usuario

// 1. Lógica para pintar el botón de talla seleccionado
if (botonesTalla.length > 0) {
    botonesTalla.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // A. Primero le quitamos el color oscuro a TODOS los botones
            botonesTalla.forEach(b => {
                b.classList.remove("is-dark");
                b.classList.add("is-light");
            });
            
            // B. Le ponemos el color oscuro SOLO al botón que clickeamos
            const btnClickeado = e.target;
            btnClickeado.classList.remove("is-light");
            btnClickeado.classList.add("is-dark");
            
            // C. Guardamos la talla seleccionada
            tallaElegida = btnClickeado.getAttribute("data-talla");
        });
    });
}

// 2. Lógica de agregar al carrito
if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
        
        // Bloqueo de seguridad: Si no ha elegido talla, no lo dejamos avanzar
        if (tallaElegida === "") {
            alert("⚠️ Por favor, selecciona una talla antes de agregar al carrito.");
            return; // Corta la ejecución aquí
        }

        let carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];
        
        // Buscamos si ya existe el producto con esa TALLA ESPECÍFICA
        const productoExistente = carritoMemoria.find(item => item.id === producto.id && item.talla === tallaElegida);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carritoMemoria.push({ ...producto, cantidad: 1, talla: tallaElegida });
        }
        
        localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria));
        
        alert(`¡La camiseta ${producto.titulo} (Talla ${tallaElegida}) se agregó al carrito! ⚽`);
    });
}