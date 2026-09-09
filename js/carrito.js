import './components/alerta.js';
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./data/productos.js";

// cargamos el menu y el footer
renderHeader();
renderFooter();

const contenedorCarrito = document.getElementById("contenedor-carrito");
const seccionTotal = document.getElementById("seccion-total");
const textoTotal = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

// esta funcion arma la pantalla leyendo la memoria
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

    // pasamos por cada producto del carrito
    carritoMemoria.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        totalMatematico += subtotal;

        // procesamos la ruta de las fotos
        let imgPath = producto.img || '';
        if (imgPath && !imgPath.startsWith('data:') && !imgPath.startsWith('http')) {
            imgPath = '../' + imgPath;
        }

        // acomodamos con grid pa que sea responsive
        contenedorCarrito.innerHTML += `
            <div class="box mb-3">
                <div class="columns is-vcentered is-mobile is-multiline">
                    <!-- 1. Imagen cuadrada y adaptada -->
                    <div class="column is-3-mobile is-2-tablet has-text-centered">
                        <img src="${imgPath}" alt="${producto.titulo}" class="img-carrito">
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
                                <input class="input is-small has-text-centered has-text-weight-bold w-42px" type="text" value="${producto.cantidad}" readonly>
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

    // le damos vida a los botones de accion
    activarBotonesCantidad(carritoMemoria);
}

// logica de los botoncitos de mas y menos
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

// pa vaciar todo el carrito
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carritoFutbol");
        renderizarCarrito();
    });
}

// pa cuando finalizan la compra
const btnComprar = document.getElementById("btn-comprar");
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        const carritoMemoria = JSON.parse(localStorage.getItem("carritoFutbol")) || [];
        if (carritoMemoria.length === 0) return;

        let adminProductos = JSON.parse(localStorage.getItem("adminProductos")) || datosProductos;
        
        carritoMemoria.forEach(itemCarrito => {
            const prod = adminProductos.find(p => p.id === itemCarrito.id);
            if (prod) {
                prod.stock = Math.max(0, (prod.stock || 0) - itemCarrito.cantidad);
            }
        });
        
        localStorage.setItem("adminProductos", JSON.stringify(adminProductos));

        alert("¡Gracias por tu compra! Tu pedido está siendo procesado.");
        localStorage.removeItem("carritoFutbol");
        renderizarCarrito();
    });
}

// echamos a andar la cosa apenas carga
renderizarCarrito();
