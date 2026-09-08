import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// Renderizamos el menú de navegación y el pie de página
renderHeader();
renderFooter();

const contenedorCarrito = document.getElementById("contenedor-carrito");
const seccionTotal = document.getElementById("seccion-total");
const textoTotal = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

// Función principal que lee la memoria y dibuja la pantalla
function renderizarCarrito() {
    let carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];

    if (carritoMemoria.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="notification is-warning has-text-centered mt-5">
                <p class="is-size-5 mb-3">Tu carrito está vacío. ¡Ve a buscar una camiseta!</p>
                <a href="../index.html" class="button is-dark">Volver a la tienda</a>
            </div>
        `;
        seccionTotal.classList.add("is-hidden"); 
        return; 
    }

    contenedorCarrito.innerHTML = "";
    let totalMatematico = 0;

    // Recorremos cada producto
    carritoMemoria.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        totalMatematico += subtotal;

        // AQUÍ ESTÁ EL CAMBIO: Se añadió 'is-multiline' y distribución responsive por columnas
        contenedorCarrito.innerHTML += `
            <div class="box mb-3">
                <div class="columns is-vcentered is-mobile is-multiline">
                    <!-- 1. Imagen cuadrada y adaptada -->
                    <div class="column is-3-mobile is-2-tablet has-text-centered">
                        <img src="../${producto.img}" alt="${producto.titulo}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                    </div>

                    <!-- 2. Información del producto -->
                    <div class="column is-9-mobile is-4-tablet">
                        <h3 class="has-text-weight-bold is-size-6">${producto.titulo}</h3>
                        <p class="has-text-info has-text-weight-semibold is-size-7">Talla: ${producto.talla}</p>
                        <p class="has-text-grey is-size-7">Precio unidad: $${producto.precio.toLocaleString('es-CL')}</p>
                    </div>
                    
                    <!-- 3. Controles de cantidad (+ / -) -->
                    <div class="column is-6-mobile is-3-tablet has-text-centered">
                        <div class="field has-addons is-justify-content-center">
                            <p class="control">
                                <button class="button is-light is-small btn-restar-carrito" data-index="${index}">-</button>
                            </p>
                            <p class="control">
                                <input class="input is-small has-text-centered has-text-weight-bold" type="text" value="${producto.cantidad}" readonly style="width: 42px;">
                            </p>
                            <p class="control">
                                <button class="button is-light is-small btn-sumar-carrito" data-index="${index}">+</button>
                            </p>
                        </div>
                    </div>
                    
                    <!-- 4. Subtotal alineado -->
                    <div class="column is-6-mobile is-3-tablet has-text-right">
                        <p class="has-text-weight-bold has-text-success is-size-6 is-size-5-tablet">
                            $${subtotal.toLocaleString('es-CL')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });

    textoTotal.innerText = totalMatematico.toLocaleString('es-CL');
    seccionTotal.classList.remove("is-hidden");

    // Activamos los eventos de los botones
    activarBotonesCantidad(carritoMemoria);
}

// Función para darle vida a los botones de + y -
function activarBotonesCantidad(carritoMemoria) {
    const botonesRestar = document.querySelectorAll(".btn-restar-carrito");
    const botonesSumar = document.querySelectorAll(".btn-sumar-carrito");

    botonesRestar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            
            if (carritoMemoria[index].cantidad > 1) {
                carritoMemoria[index].cantidad--; 
            } else {
                carritoMemoria.splice(index, 1); 
            }
            
            localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria)); 
            renderizarCarrito(); 
        });
    });

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            carritoMemoria[index].cantidad++;
            localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria));
            renderizarCarrito();
        });
    });
}

// Lógica del botón "Vaciar Carrito"
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carritoFutbol");
        renderizarCarrito();
    });
}

// Lógica del botón "Finalizar Compra"
const btnComprar = document.getElementById("btn-comprar");
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        alert("¡Gracias por tu compra! Tu pedido está siendo procesado. 🏆");
        localStorage.removeItem("carritoFutbol");
        renderizarCarrito();
    });
}

// Ejecutamos la función apenas cargue la página
renderizarCarrito();