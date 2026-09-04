// 1. Importamos los artículos
import { datosBlog } from "./productos/blog.js";
const contenedorDetalle = document.getElementById("contenedor-detalle-blog");
// 1. Leemos el id de la URL (?id=X)
const parametrosURL = new URLSearchParams(window.location.search);
const idNoticia = parseInt(parametrosURL.get("id"));
// 2. Buscamos el artículo correspondiente
const articulo = datosBlog.find(item => item.id === idNoticia);
// 3. Mostramos la vista según el resultado
if (contenedorDetalle) {
    if (articulo) {
        contenedorDetalle.innerHTML = `
            <article class="box p-6">
                <h1 class="title is-2 mb-4">${articulo.titulo}</h1>
                
                <figure class="image is-16by9 mb-5">
                    <img src="${articulo.img}" alt="${articulo.titulo}" style="object-fit: cover; border-radius: 8px; width: 100%; max-height: 450px;">
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
        contenedorDetalle.innerHTML = `
            <div class="notification is-danger has-text-centered">
                <h2 class="title is-4">¡Ups! Noticia no encontrada.</h2>
                <p>El artículo que buscas no existe o la dirección es incorrecta.</p>
                <a href="blog.html" class="button is-light mt-3">Volver al Blog</a>
            </div>
        `;
    }
}