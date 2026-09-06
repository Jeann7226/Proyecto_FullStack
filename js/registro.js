document.addEventListener("DOMContentLoaded", () => {
    // Array complementario de regiones y comunas
    const regionesYcomunas = [
        {
            region: "Región Metropolitana de Santiago",
            comunas: ["Santiago", "Puente Alto", "Maipú", "La Florida"]
        },
        {
            region: "Región de Valparaíso",
            comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
        },
        {
            region: "Región del Biobío",
            comunas: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"]
        },
        {
            region: "Región de La Araucanía",
            comunas: ["Temuco", "Padre Las Casas", "Villarrica"]
        },
        {
            region: "Región de Ñuble",
            comunas: ["Chillán", "San Carlos", "Bulnes"]
        }
    ];

    const regionSelect = document.getElementById("reg-region");
    const comunaSelect = document.getElementById("reg-comuna");

    if (regionSelect && comunaSelect) {
        // Cargar regiones
        regionesYcomunas.forEach(rc => {
            const option = document.createElement("option");
            option.value = rc.region;
            option.textContent = rc.region;
            regionSelect.appendChild(option);
        });

        // Evento cambio de región
        regionSelect.addEventListener("change", (e) => {
            const selectedRegion = e.target.value;
            const data = regionesYcomunas.find(rc => rc.region === selectedRegion);
            
            comunaSelect.innerHTML = '<option value="" disabled selected>Seleccione la comuna...</option>';
            if (data) {
                data.comunas.forEach(c => {
                    const option = document.createElement("option");
                    option.value = c;
                    option.textContent = c;
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            } else {
                comunaSelect.disabled = true;
            }
        });
    }

    const form = document.getElementById("registro-form");
    
    // Función auxiliar de validación
    const validateField = (id, condition, isValidRef) => {
        const input = document.getElementById(id);
        const error = document.getElementById(`error-${id.split('-')[1]}`);
        if (!input) return isValidRef;
        
        if (condition) {
            input.classList.remove("is-danger");
            if (error) error.classList.add("is-hidden");
        } else {
            input.classList.add("is-danger");
            if (error) error.classList.remove("is-hidden");
            isValidRef = false;
        }
        return isValidRef;
    };

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            // Validar RUN (sin puntos ni guion, 7-9 chars, num + final num o K)
            const runVal = document.getElementById("reg-run").value.trim();
            const runRegex = /^[0-9]{6,8}[0-9Kk]$/; 
            isValid = validateField("reg-run", runRegex.test(runVal) && runVal.length >= 7 && runVal.length <= 9, isValid);

            // Validar Nombre
            const nombreVal = document.getElementById("reg-nombre").value.trim();
            isValid = validateField("reg-nombre", nombreVal.length > 0 && nombreVal.length <= 50, isValid);

            // Validar Apellido
            const apellidoVal = document.getElementById("reg-apellido").value.trim();
            isValid = validateField("reg-apellido", apellidoVal.length > 0 && apellidoVal.length <= 100, isValid);

            // Validar Correo
            const correoVal = document.getElementById("reg-correo").value.trim();
            const emailDomains = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const hasValidDomain = emailDomains.some(domain => correoVal.endsWith(domain));
            isValid = validateField("reg-correo", correoVal.length > 0 && correoVal.length <= 100 && hasValidDomain, isValid);

            // Validar Region y Comuna
            isValid = validateField("reg-region", regionSelect.value !== "", isValid);
            isValid = validateField("reg-comuna", comunaSelect.value !== "", isValid);

            // Validar Dirección
            const direccionVal = document.getElementById("reg-direccion").value.trim();
            isValid = validateField("reg-direccion", direccionVal.length > 0 && direccionVal.length <= 300, isValid);

            if (isValid) {
                alert("Registro exitoso!");
                window.location.href = "/pages/login.html";
            }
        });
    }
});
