export function renderFooter() {
    const footerContenedor = document.getElementById("main-footer");

    const inPages = window.location.pathname.includes('/pages/');
    const basePath = inPages ? '../' : './';

    if (footerContenedor) {
        footerContenedor.innerHTML = `
            <footer class="has-background-dark custom-footer">
                <div class="container">
                    <!-- Sección Superior: Enlaces y Redes -->
                    <div class="columns is-multiline mb-5">
                        
                        <!-- Columna 1: Navegación de la Tienda -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Nuestra Tienda</h6>
                            <ul class="footer-list">
                                <li><a href="${basePath}index.html" class="has-text-grey-light footer-link">Inicio</a></li>
                                <li><a href="${basePath}pages/carrito.html" class="has-text-grey-light footer-link">Carrito de Compras</a></li>
                                <li><a href="${basePath}pages/blog.html" class="has-text-grey-light footer-link">Blog / Noticias</a></li>
                            </ul>
                        </div>
                        
                        <!-- Columna 2: Cuentas y Accesos -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Mi Cuenta</h6>
                            <ul class="footer-list">
                                <li><a href="${basePath}pages/login.html" class="has-text-grey-light footer-link">Iniciar Sesión</a></li>
                                <li><a href="${basePath}pages/registro.html" class="has-text-grey-light footer-link">Crear Cuenta</a></li>
                                <!-- Se eliminó el enlace de Administrador -->
                            </ul>
                        </div>
                        
                        <!-- Columna 3: Información -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Acerca de</h6>
                            <ul class="footer-list">
                                <li><a href="${basePath}pages/nosotros.html" class="has-text-grey-light footer-link">Nosotros</a></li>
                                <li><a href="${basePath}pages/contacto.html" class="has-text-grey-light footer-link">Contacto</a></li>
                            </ul>
                        </div>

                        <!-- Columna 4: Redes Sociales y Ubicación -->
                        <div class="column is-3 has-text-right-tablet">
                            <div class="is-flex is-justify-content-flex-end-tablet is-align-items-center mb-4 footer-socials">
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center footer-social-link" title="Twitter">X</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center footer-social-link" title="Facebook">f</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center footer-social-link footer-social-link-small" title="YouTube">YT</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center footer-social-link footer-social-link-small" title="Instagram">IG</a>
                                
                                <span class="has-text-weight-bold ml-4 has-text-white is-flex is-align-items-center">
                                    <span class="mr-2 is-size-5">🌐</span> Chile
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Inferior - Copyright -->
                    <div class="pt-4 footer-bottom">
                        <p class="has-text-grey-light is-size-7">
                            &copy; 2026 camisetasChile. Todos los derechos reservados
                        </p>
                    </div>

                </div>
            </footer>
        `;
    }
}