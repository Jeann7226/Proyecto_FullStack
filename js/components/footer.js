export function renderFooter() {
    const footerContenedor = document.getElementById("main-footer");

    if (footerContenedor) {
        footerContenedor.innerHTML = `
            <footer class="has-background-dark" style="border-top: 1px solid #4a4a4a; padding: 4rem 1.5rem 2rem; font-size: 0.9rem;">
                <div class="container">
                    <!-- Sección Superior: Enlaces y Redes -->
                    <div class="columns is-multiline mb-5">
                        
                        <!-- Columna 1: Navegación de la Tienda -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Nuestra Tienda</h6>
                            <ul style="list-style: none; padding: 0; line-height: 2.2;">
                                <li><a href="../index.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Inicio</a></li>
                                <li><a href="../pages/carrito.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Carrito de Compras</a></li>
                                <li><a href="../pages/blog.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Blog / Noticias</a></li>
                            </ul>
                        </div>
                        
                        <!-- Columna 2: Cuentas y Accesos -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Mi Cuenta</h6>
                            <ul style="list-style: none; padding: 0; line-height: 2.2;">
                                <li><a href="../pages/login.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Iniciar Sesión</a></li>
                                <li><a href="../pages/registro.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Crear Cuenta</a></li>
                                <!-- Se eliminó el enlace de Administrador -->
                            </ul>
                        </div>
                        
                        <!-- Columna 3: Información -->
                        <div class="column is-3">
                            <h6 class="title is-6 has-text-weight-bold has-text-white mb-4">Acerca de</h6>
                            <ul style="list-style: none; padding: 0; line-height: 2.2;">
                                <li><a href="../pages/nosotros.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Nosotros</a></li>
                                <li><a href="../pages/contacto.html" class="has-text-grey-light" style="text-decoration: none; outline: none;">Contacto</a></li>
                            </ul>
                        </div>

                        <!-- Columna 4: Redes Sociales y Ubicación -->
                        <div class="column is-3 has-text-right-tablet">
                            <div class="is-flex is-justify-content-flex-end-tablet is-align-items-center mb-4" style="gap: 12px; flex-wrap: wrap;">
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center" style="width: 35px; height: 35px; border-radius: 50%; text-decoration: none; font-weight: bold; outline: none;" title="Twitter">X</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center" style="width: 35px; height: 35px; border-radius: 50%; text-decoration: none; font-weight: bold; outline: none;" title="Facebook">f</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center" style="width: 35px; height: 35px; border-radius: 50%; text-decoration: none; font-weight: bold; font-size: 0.75rem; outline: none;" title="YouTube">YT</a>
                                <a href="#" class="has-background-grey-dark has-text-white is-flex is-justify-content-center is-align-items-center" style="width: 35px; height: 35px; border-radius: 50%; text-decoration: none; font-weight: bold; font-size: 0.75rem; outline: none;" title="Instagram">IG</a>
                                
                                <span class="has-text-weight-bold ml-4 has-text-white is-flex is-align-items-center">
                                    <span class="mr-2 is-size-5">🌐</span> Chile
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Inferior - Copyright -->
                    <div class="pt-4" style="border-top: 1px solid #4a4a4a;">
                        <p class="has-text-grey-light is-size-7">
                            &copy; 2026 camisetasChile. Todos los derechos reservados
                        </p>
                    </div>

                </div>
            </footer>
        `;
    }
}