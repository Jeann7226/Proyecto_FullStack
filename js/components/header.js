export function renderHeader() {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    
    let userMenu = `
        <a class="button is-light" href="/pages/login.html">
            <strong>Iniciar Sesión</strong>
        </a>
        <a class="button is-primary" href="/pages/registro.html">
            <strong>Registro</strong>
        </a>
    `;

    let adminLink = '';

    if (user) {
        userMenu = `
            <span class="navbar-item">Hola, ${user.nombre || user.correo}</span>
            <a class="button is-danger" id="logout-btn">
                <strong>Cerrar Sesión</strong>
            </a>
        `;
        
        if (user.tipo === 'Administrador') {
            adminLink = `<a class="navbar-item" href="/pages/admin.html">Admin</a>`;
        }
    }

    const headerHTML = `
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <strong>Mi Tienda</strong>
                </a>
            </div>
            <div class="navbar-menu is-active">
                <div class="navbar-start">
                    <a class="navbar-item" href="/index.html">Inicio</a>
                    <a class="navbar-item" href="/pages/productos.html">Productos</a>
                    <a class="navbar-item" href="/pages/nosotros.html">Nosotros</a>
                    <a class="navbar-item" href="/pages/blog.html">Blog</a>
                    <a class="navbar-item" href="/pages/contacto.html">Contacto</a>
                    ${adminLink}
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            ${userMenu}
                            <a class="button is-primary is-outlined" href="/pages/carrito.html">
                                <span class="icon">🛒</span>
                                <strong>Carrito</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
    
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("loggedUser");
                window.location.href = "/index.html";
            });
        }
    }
}
