export function renderFooter() {
    const footerHTML = `
        <footer class="footer has-background-dark has-text-light mt-6">
            <div class="content has-text-centered">
                <p>
                    <strong>Mi Tienda</strong> by <a href="#" class="has-text-primary">Tu Nombre</a>. 
                    Todos los derechos reservados &copy; 2026.
                </p>
            </div>
        </footer>
    `;
    
    const footerElement = document.getElementById("main-footer");
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}
