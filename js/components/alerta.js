export function initAlertOverride() {
    window.alert = function(mensaje) {
        const existing = document.getElementById('custom-alert-modal');
        if (existing) existing.remove();

        const modalHtml = `
        <div class="modal is-active" id="custom-alert-modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box has-text-centered">
                    <p class="is-size-5 mb-4 has-text-weight-medium">${mensaje}</p>
                    <button class="button is-primary w-100" id="custom-alert-close">Aceptar</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Enfocar el botón para poder darle Enter
        const btnClose = document.getElementById('custom-alert-close');
        if (btnClose) {
            btnClose.focus();
            btnClose.addEventListener('click', () => {
                const modal = document.getElementById('custom-alert-modal');
                if (modal) modal.remove();
            });
        }
    };
}

// Auto-inicializar al importar
initAlertOverride();
