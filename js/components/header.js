export function renderHeader() {
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
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <a class="button is-primary" href="/pages/carrito.html">
                            <strong>Carrito</strong>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `;
    
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }
}
