import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosBlog } from "./productos/blog.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// Aquí puedes agregar la lógica específica solo para la página del "Blog"
console.log("Página del blog cargada correctamente.");


const contenedor = document.getElementById("contenedor-blogs");

datosBlog.forEach(noticia => {
    // 1. Creamos la caja gris con Bulma
    const card = document.createElement("article");
    card.className = "box has-background-light mb-5 p-5";

    // 2. Estructura idéntica al mockup: texto izquierda, foto derecha
    card.innerHTML = `
        <div class="columns is-vcentered">
            <div class="column is-half is-flex is-flex-direction-column is-justify-content-space-between" style="min-height: 200px;">
                <div>
                    <h2 class="title is-4 has-text-weight-bold mb-3">${noticia.titulo}</h2>
                    <p class="has-text-grey-dark">${noticia.resumen}</p>
                </div>
                <div>
                    <!-- El botón ejecuta la redirección por JS -->
                    <button class="button is-dark mt-4 btn-ver-caso" data-id="${noticia.id}">
                        VER CASO ▾
                    </button>
                </div>
            </div>
            <div class="column is-half">
                <figure class="image is-16by9">
                    <img src="${noticia.img}" alt="${noticia.titulo}" style="object-fit: cover; border-radius: 6px;">
                </figure>
            </div>
        </div>
    `;

    contenedor.appendChild(card);
});

// 3. Escuchamos los clics de todos los botones "VER CASO"
document.querySelectorAll(".btn-ver-caso").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const idSeleccionado = e.target.getAttribute("data-id");
        // Redirige a la ventana de detalle pasando el ID en la URL
        window.location.href = `detalle-blog.html?id=${idSeleccionado}`;
    });
});
