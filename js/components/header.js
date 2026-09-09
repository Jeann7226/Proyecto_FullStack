export function renderHeader() {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const inPages = window.location.pathname.includes('/pages/');
    const basePath = inPages ? '../' : './';
    
    let userMenu = `
        <a class="button is-light" href="${basePath}pages/login.html">
            <strong>Iniciar Sesión</strong>
        </a>
        <a class="button is-primary" href="${basePath}pages/registro.html">
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
        
        if (user.tipo === 'Administrador' || user.tipo === 'Vendedor') {
            adminLink = `<a class="navbar-item" href="${basePath}pages/admin.html">Admin</a>`;
        }
    }

    const headerHTML = `
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="${basePath}index.html">
                    <img src="${basePath}assets/images/logo/logo.png" alt="logo" class="img-cover">
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="${basePath}index.html">Inicio</a>
                    <a class="navbar-item" href="${basePath}pages/productos.html">Productos</a>
                    <a class="navbar-item" href="${basePath}pages/nosotros.html">Nosotros</a>
                    <a class="navbar-item" href="${basePath}pages/blog.html">Blog</a>
                    <a class="navbar-item" href="${basePath}pages/contacto.html">Contacto</a>
                    ${adminLink}
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            ${userMenu}
                            <a class="button is-primary is-outlined" href="${basePath}pages/carrito.html">
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
        
        // para q el menu de celu ande bien
        const burger = headerElement.querySelector('.navbar-burger');
        const menu = headerElement.querySelector('.navbar-menu');
        
        if (burger && menu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            });
        }

        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("loggedUser");
                window.location.href = basePath + "index.html";
            });
        }
    }
}
