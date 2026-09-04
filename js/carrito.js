import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// Renderizamos el menú de navegación y el pie de página
renderHeader();
renderFooter();

// Capturamos los elementos del HTML que acabamos de crear
const contenedorCarrito = document.getElementById("contenedor-carrito");
const seccionTotal = document.getElementById("seccion-total");
const textoTotal = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

// Función principal que lee la memoria y dibuja la pantalla
function renderizarCarrito() {
    // 1. Abrimos la mochila del LocalStorage
    let carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];

    // 2. Si la mochila está vacía, mostramos un mensaje amigable
    if (carritoMemoria.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="notification is-warning has-text-centered mt-5">
                <p class="is-size-5 mb-3">Tu carrito está vacío. ¡Ve a buscar una camiseta!</p>
                <a href="../index.html" class="button is-dark">Volver a la tienda</a>
            </div>
        `;
        seccionTotal.classList.add("is-hidden"); // Escondemos el total
        return; // Detenemos la función aquí
    }

    // 3. Si hay productos, limpiamos el contenedor y preparamos el total matemático
    contenedorCarrito.innerHTML = "";
    let totalMatematico = 0;

    // Recorremos cada producto guardado
    carritoMemoria.forEach(producto => {
        // Multiplicamos el precio por la cantidad de veces que se agregó
        const subtotal = producto.precio * producto.cantidad;
        totalMatematico += subtotal;

        // Dibujamos el producto en una "caja" (box) de Bulma
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
                        <!-- AQUÍ AGREGAMOS LA TALLA -->
                        <p class="has-text-info has-text-weight-semibold">Talla: ${producto.talla}</p>
                        <p class="has-text-grey">Precio unidad: $${producto.precio.toLocaleString('es-CL')}</p>
                    </div>
                    <div class="column is-2 has-text-centered">
                        <p class="has-text-weight-bold">Cant: ${producto.cantidad}</p>
                    </div>
                    <div class="column is-4 has-text-right">
                        <p class="has-text-weight-bold has-text-success is-size-5">Subtotal: $${subtotal.toLocaleString('es-CL')}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // 4. Actualizamos el número del total en pantalla y mostramos la caja de cobro
    textoTotal.innerText = totalMatematico.toLocaleString('es-CL');
    seccionTotal.classList.remove("is-hidden");
}

// 5. Lógica del botón "Vaciar Carrito"
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        // Borramos la mochila entera
        localStorage.removeItem("carritoFutbol");
        // Volvemos a dibujar la pantalla (que ahora mostrará el mensaje de vacío)
        renderizarCarrito();
    });
}

// Ejecutamos la función apenas cargue la página
renderizarCarrito();

// 6. Lógica del botón "Finalizar Compra"
const btnComprar = document.getElementById("btn-comprar");

if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        // Lanzamos una alerta de éxito
        alert("¡Gracias por tu compra! Tu pedido está siendo procesado. 🏆");
        // Borramos la mochila porque la compra ya se realizó
        localStorage.removeItem("carritoFutbol");
        // Volvemos a dibujar la pantalla (mostrará el carrito vacío)
        renderizarCarrito();
    });
}