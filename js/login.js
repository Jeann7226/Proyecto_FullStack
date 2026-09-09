import './components/alerta.js';
import { datosUsuarios } from './data/usuarios.js';
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
            
            // que el correo sirva
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
            
            // salto para probar el admin
            if (emailValue === "admin" && passwordInput.value === "admin123") {
                 // hack para entrar modo dios a admin
                 isValid = true;
            }
            
            // que la clave sea buena
            const passValue = passwordInput.value;
            if (passValue.length < 4 || passValue.length > 10) {
                // ignoramos validacion si entra el admin secreto
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
                // buscamos el usuario en los datos
                let userRole = "Cliente";
                const usuarioEncontrado = datosUsuarios.find(u => u.correo === emailValue && u.password === passValue);

                if (usuarioEncontrado) {
                    userRole = usuarioEncontrado.tipoUsuario;
                } else if ((emailValue === "admin" || emailValue === "admin@duoc.cl") && passValue === "admin123") {
                    // si no hay na usamos el admin manual
                    userRole = "Administrador";
                } else {
                    alert('Credenciales incorrectas');
                    return;
                }
                
                const loggedUser = {
                    correo: emailValue,
                    tipo: userRole,
                    tipoUsuario: userRole
                };
                
                localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
                
                if (userRole === "Administrador" || userRole === "Vendedor") {
                    window.location.href = "../pages/admin.html";
                } else {
                    window.location.href = "../index.html";
                }
            }
        });
    }
});
