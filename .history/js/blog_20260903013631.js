// 1. Importamos los artículos
import { datosBlog } from "./productos/blog.js";

// 2. Capturamos el contenedor del HTML
const contenedorDetalle = document.getElementById("contenedor-detalle-blog");

// 3. Leemos el ID que viene en la URL (?id=1)
const parametrosURL = new URLSearchParams(window.location.search);
const idNoticia = parseInt(parametrosURL.get("id"));

// 4. Buscamos el artículo correspondiente
const articulo = datosBlog.find(item => item.id === idNoticia);

// 5. Mostramos el contenido completo en pantalla con Bulma
if (articulo) {
    contenedorDetalle.innerHTML = `
        <article class="box p-6">
            <h1 class="title is-2 mb-4">${articulo.titulo}</h1>
            
            <figure class="image is-16by9 mb-5">
                <img src="${articulo.img}" alt="${articulo.titulo}" style="object-fit: cover; border-radius: 8px;">
            </figure>

            <div class="content is-medium">
                <p>${articulo.contenido}</p>
            </div>

            <div class="buttons mt-5">
                <a href="blog.html" class="button is-dark is-medium">
                    ← Volver a Noticias
                </a>
            </div>
        </article>
    `;
} else {
    // Si no encuentra el artículo o no hay ID en la URL
    contenedorDetalle.innerHTML = `
        <div class="notification is-danger has-text-centered">
            <h2 class="title is-4">¡Ups! Noticia no encontrada.</h2>
            <a href="blog.html" class="button is-light mt-3">Volver al Blog</a>
        </div>
    `;
}