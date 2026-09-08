export function initAlertOverride() {
    window.alert = function(mensaje) {
        const existing = document.getElementById('custom-alert-modal');
        if (existing) existing.remove();

        const modalHtml = `
        <div class="modal is-active" id="custom-alert-modal" style="z-index: 9999;">
            <div class="modal-background" style="background-color: rgba(0,0,0,0.6);"></div>
            <div class="modal-content" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 1rem;">
                <div class="box has-text-centered" style="max-width: 400px; width: 100%; border-radius: 8px;">
                    <p class="is-size-5 mb-4 has-text-weight-medium">${mensaje}</p>
                    <button class="button is-primary w-100" id="custom-alert-close" style="width: 100%;">Aceptar</button>
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
