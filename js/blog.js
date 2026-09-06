import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosBlog } from "./productos/blog.js";

renderHeader();
renderFooter();

const contenedorDetalle = document.getElementById("contenedor-detalle-blog");

if (contenedorDetalle) {
    // 1. Leemos el id de la URL (?id=X)
    const parametrosURL = new URLSearchParams(window.location.search);
    const idParam = parametrosURL.get("id");

    if (!idParam) {
        // MODO LISTA DE NOTICIAS
        // Limpiamos el contenedor
        contenedorDetalle.innerHTML = `
            <h1 class="title is-2 mb-5">Nuestro Blog</h1>
            <p class="subtitle is-5 mb-6">Aquí encontrarás artículos, noticias y novedades sobre nuestra tienda y el mundo del fútbol.</p>
            <div class="columns is-multiline" id="lista-blog"></div>
        `;

        const listaBlog = document.getElementById("lista-blog");

        datosBlog.forEach(noticia => {
            const tarjeta = `
                <div class="column is-12-mobile is-6-tablet is-4-desktop">
                    <div class="card is-hoverable" style="height: 100%; display: flex; flex-direction: column;">
                        <div class="card-image">
                            <figure class="image is-16by9">
                                <img src="../${noticia.img}" alt="${noticia.titulo}" style="object-fit: cover;">
                            </figure>
                        </div>
                        <div class="card-content" style="flex-grow: 1;">
                            <h3 class="title is-4">${noticia.titulo}</h3>
                            <p class="content mt-3">${noticia.resumen}</p>
                        </div>
                        <footer class="card-footer mt-auto">
                            <a href="blog.html?id=${noticia.id}" class="card-footer-item has-text-primary has-text-weight-bold">
                                Leer artículo completo &rarr;
                            </a>
                        </footer>
                    </div>
                </div>
            `;
            listaBlog.innerHTML += tarjeta;
        });

    } else {
        // MODO DETALLE DE NOTICIA
        const idNoticia = parseInt(idParam);
        const articulo = datosBlog.find(item => item.id === idNoticia);

        if (articulo) {
            contenedorDetalle.innerHTML = `
                <article class="box p-6">
                    <h1 class="title is-2 mb-4">${articulo.titulo}</h1>
                    
                    <figure class="image is-16by9 mb-5">
                        <img src="../${articulo.img}" alt="${articulo.titulo}" style="object-fit: cover; border-radius: 8px; width: 100%; max-height: 450px;">
                    </figure>

                    <div class="content is-medium">
                        <p>${articulo.contenido}</p>
                    </div>

                    <div class="buttons mt-5">
                        <a href="blog.html" class="button is-dark is-medium">
                            &larr; Volver a Noticias
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
}