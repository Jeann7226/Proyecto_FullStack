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

    // Recorremos cada producto. Usamos 'index' para saber exactamente qué producto estamos modificando
    carritoMemoria.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        totalMatematico += subtotal;

        contenedorCarrito.innerHTML += `
            <div class="box mb-3">
                <div class="columns is-vcentered is-mobile">
                    <div class="column is-2">
                        <figure class="image is-64x64">
                            <img src="../${producto.img}" alt="${producto.titulo}" style="object-fit: cover; border-radius: 4px;">
                        </figure>
                    </div>
                    <div class="column is-4">
                        <h3 class="has-text-weight-bold">${producto.titulo}</h3>
                        <p class="has-text-info has-text-weight-semibold">Talla: ${producto.talla}</p>
                        <p class="has-text-grey">Precio unidad: $${producto.precio.toLocaleString('es-CL')}</p>
                    </div>
                    
                    <!-- NUEVO: SELECTOR DE CANTIDAD EN EL CARRITO -->
                    <div class="column is-3 has-text-centered">
                        <div class="field has-addons is-justify-content-center">
                            <p class="control">
                                <!-- Guardamos el 'index' en un data-attribute para saber cuál restar -->
                                <button class="button is-light is-small btn-restar-carrito" data-index="${index}">-</button>
                            </p>
                            <p class="control">
                                <input class="input is-small has-text-centered has-text-weight-bold" type="text" value="${producto.cantidad}" readonly style="width: 45px;">
                            </p>
                            <p class="control">
                                <button class="button is-light is-small btn-sumar-carrito" data-index="${index}">+</button>
                            </p>
                        </div>
                    </div>
                    
                    <div class="column is-3 has-text-right">
                        <p class="has-text-weight-bold has-text-success is-size-5">Subtotal:<br>$${subtotal.toLocaleString('es-CL')}</p>
                    </div>
                </div>
            </div>
        `;
    });

    textoTotal.innerText = totalMatematico.toLocaleString('es-CL');
    seccionTotal.classList.remove("is-hidden");

    // Una vez que el HTML está dibujado, activamos los botones
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
                // Si tiene más de 1, simplemente le restamos 1
                carritoMemoria[index].cantidad--; 
            } else {
                // MAGIA AQUÍ: Si tiene 1 y presiona restar, lo eliminamos de la lista
                // splice(index, 1) significa "párate en este índice y borra 1 elemento"
                carritoMemoria.splice(index, 1); 
            }
            
            // Guardamos la mochila actualizada y redibujamos la pantalla
            localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria)); 
            renderizarCarrito(); 
        });
    });

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            carritoMemoria[index].cantidad++; // Sumamos 1
            localStorage.setItem("carritoFutbol", JSON.stringify(carritoMemoria));
            renderizarCarrito(); // Redibujamos
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