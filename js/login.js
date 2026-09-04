document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById("login-email");
            const passwordInput = document.getElementById("login-password");
            const emailError = document.getElementById("error-email");
            const passwordError = document.getElementById("error-password");
            
            let isValid = true;
            
            // Validar Correo
            const emailValue = emailInput.value.trim();
            const emailDomains = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const hasValidDomain = emailDomains.some(domain => emailValue.endsWith(domain));
            
            if (emailValue.length === 0 || emailValue.length > 100 || !hasValidDomain) {
                emailError.classList.remove("is-hidden");
                emailInput.classList.add("is-danger");
                isValid = false;
            } else {
                emailError.classList.add("is-hidden");
                emailInput.classList.remove("is-danger");
            }
            
            // Allow admin bypass for requirements
            if (emailValue === "admin" && passwordInput.value === "admin123") {
                 // Hack for admin testing based on user prompt.
                 isValid = true;
            }
            
            // Validar Contraseña
            const passValue = passwordInput.value;
            if (passValue.length < 4 || passValue.length > 10) {
                // Ignore validation error if using the hardcoded admin credentials
                if (!(emailValue === "admin" && passValue === "admin123")) {
                    passwordError.classList.remove("is-hidden");
                    passwordInput.classList.add("is-danger");
                    isValid = false;
                }
            } else {
                passwordError.classList.add("is-hidden");
                passwordInput.classList.remove("is-danger");
            }
            
            if (isValid) {
                let userRole = "Cliente"; // Default role
                
                // Admin mock check
                if (emailValue === "admin" || emailValue === "admin@duoc.cl") {
                    if (passValue === "admin123") {
                        userRole = "Administrador";
                    }
                }
                
                const loggedUser = {
                    correo: emailValue,
                    tipo: userRole
                };
                
                localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
                
                if (userRole === "Administrador") {
                    window.location.href = "/pages/admin.html";
                } else {
                    window.location.href = "/index.html";
                }
            }
        });
    }
});
