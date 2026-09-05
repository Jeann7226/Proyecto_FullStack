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
                
                <!-- TALLAS -->
                <div class="field mt-5">
                    <label class="label is-size-5 mb-3">Tallas</label>
                    <div class="buttons mt-2" id="contenedor-tallas">
                        <button class="button is-light is-medium talla-btn" data-talla="XS" style="width: 60px;">XS</button>
                        <button class="button is-light is-medium talla-btn" data-talla="S" style="width: 60px;">S</button>
                        <button class="button is-light is-medium talla-btn" data-talla="M" style="width: 60px;">M</button>
                        <button class="button is-light is-medium talla-btn" data-talla="L" style="width: 60px;">L</button>
                        <button class="button is-light is-medium talla-btn" data-talla="XL" style="width: 60px;">XL</button>
                        <button class="button is-light is-medium talla-btn" data-talla="2XL" style="width: 60px;">2XL</button>
                    </div>
                </div>

                <!-- NUEVO: CANTIDAD -->
                <div class="field mt-4">
                    <label class="label is-size-5 mb-3">Cantidad</label>
                    <div class="field has-addons">
                        <p class="control">
                            <button class="button is-light is-medium" id="btn-restar">-</button>
                        </p>
                        <p class="control">
                            <input class="input is-medium has-text-centered has-text-weight-bold" type="text" id="input-cantidad" value="1" readonly style="width: 60px;">
                        </p>
                        <p class="control">
                            <button class="button is-light is-medium" id="btn-sumar">+</button>
                        </p>
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

// --- LÓGICA DE TALLAS, CANTIDAD Y CARRITO ---

const btnAgregar = document.getElementById("btn-agregar");
const botonesTalla = document.querySelectorAll(".talla-btn");
const btnRestar = document.getElementById("btn-restar");
const btnSumar = document.getElementById("btn-sumar");
const inputCantidad = document.getElementById("input-cantidad");

let tallaElegida = ""; 
let cantidadElegida = 1; // Nueva variable para recordar cuántas quiere

// 1. Lógica de las tallas (botones)
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

// 2. Lógica de sumar y restar cantidad
if (btnRestar && btnSumar && inputCantidad) {
    btnRestar.addEventListener("click", () => {
        if (cantidadElegida > 1) { // Evitamos que compre 0 o números negativos
            cantidadElegida--;
            inputCantidad.value = cantidadElegida;
        }
    });

    btnSumar.addEventListener("click", () => {
        cantidadElegida++;
        inputCantidad.value = cantidadElegida;
    });
}

// 3. Lógica de agregar al carrito
if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
        
        if (tallaElegida === "") {
            alert("⚠️ Por favor, selecciona una talla antes de agregar al carrito.");
            return; 
        }

        let carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];
        
        const productoExistente = carritoMemoria.find(item => item.id === producto.id && item.talla === tallaElegida);
        
        if (productoExistente) {
            // Si ya existe, le sumamos la cantidad que eligió en los botones
            productoExistente.cantidad += cantidadElegida;
        } else {
            // Si es nueva, la guardamos con la cantidad exacta que eligió
            carritoMemoria.push({ ...producto, cantidad: cantidadElegida, talla: tallaElegida });
        }
        
        localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria));
        
        alert(`¡Se agregaron ${cantidadElegida} camiseta(s) ${producto.titulo} (Talla ${tallaElegida}) al carrito! ⚽`);
    });
}