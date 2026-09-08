import { datosProductos } from './productos/productos.js';
import { datosUsuarios } from './usuarios/usuarios.js';

document.addEventListener("DOMContentLoaded", () => {
    // Protección de ruta básica (simulada)
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (!loggedUser || loggedUser.tipoUsuario !== 'Administrador') {
        // En un entorno real se descomentaría esto para bloquear el acceso
        // window.location.href = '../index.html'; 
    }

    // --- Navegación del Panel ---
    const navDashboard = document.getElementById('nav-dashboard');
    const navProductos = document.getElementById('nav-productos');
    const navUsuarios = document.getElementById('nav-usuarios');
    const navLogout = document.getElementById('nav-logout');

    const viewDashboard = document.getElementById('view-dashboard');
    const viewProductos = document.getElementById('view-productos');
    const viewUsuarios = document.getElementById('view-usuarios');
    const viewFormProducto = document.getElementById('view-form-producto');
    const viewFormUsuario = document.getElementById('view-form-usuario');

    const views = [viewDashboard, viewProductos, viewUsuarios, viewFormProducto, viewFormUsuario];
    const navs = [navDashboard, navProductos, navUsuarios];

    function hideAllViews() {
        for (let i = 0; i < views.length; i++) {
            if (views[i]) views[i].classList.add('is-hidden');
        }
        for (let i = 0; i < navs.length; i++) {
            if (navs[i]) navs[i].classList.remove('is-active');
        }
    }

    navDashboard.addEventListener('click', () => {
        hideAllViews();
        viewDashboard.classList.remove('is-hidden');
        navDashboard.classList.add('is-active');
    });

    navProductos.addEventListener('click', () => {
        hideAllViews();
        viewProductos.classList.remove('is-hidden');
        navProductos.classList.add('is-active');
        renderTablaProductos();
    });

    navUsuarios.addEventListener('click', () => {
        hideAllViews();
        viewUsuarios.classList.remove('is-hidden');
        navUsuarios.classList.add('is-active');
        renderTablaUsuarios();
    });

    if (navLogout) {
        navLogout.addEventListener('click', () => {
            localStorage.removeItem('loggedUser');
            window.location.href = '../index.html';
        });
    }

    // --- Lógica de Productos ---
    let productosLocales = JSON.parse(localStorage.getItem('adminProductos')) || datosProductos;
    let imgBase64 = "";
    let img2Base64 = "";
    let currentProdEditId = null;

    function guardarProductos() {
        localStorage.setItem('adminProductos', JSON.stringify(productosLocales));
    }

    function renderTablaProductos() {
        const tbody = document.querySelector('#tabla-productos tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        for (let i = 0; i < productosLocales.length; i++) {
            const p = productosLocales[i];
            const tr = document.createElement('tr');
            
            // Validar si es imagen base64 o ruta normal
            let imgSrc = p.img;
            if (imgSrc && !imgSrc.startsWith('data:') && !imgSrc.startsWith('http')) {
                imgSrc = '../' + imgSrc;
            } else if (!imgSrc) {
                imgSrc = ''; 
            }

            tr.innerHTML = `
                <td>${p.id}</td>
                <td><img src="${imgSrc}" alt="${p.titulo}" class="img-admin-table"></td>
                <td>${p.titulo}</td>
                <td>${p.categoria || 'N/A'}</td>
                <td>$${p.precio}</td>
                <td>${p.stock}</td>
                <td>
                    <button class="button is-small is-info" onclick="editarProducto(${p.id})">Editar</button>
                    <button class="button is-small is-danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    // Manejo de archivos (imágenes)
    const inputImg = document.getElementById('prod-img');
    if (inputImg) {
        inputImg.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (e) => imgBase64 = e.target.result;
                reader.readAsDataURL(file);
            } else {
                imgBase64 = "";
            }
        });
    }

    const inputImg2 = document.getElementById('prod-img2');
    if (inputImg2) {
        inputImg2.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (e) => img2Base64 = e.target.result;
                reader.readAsDataURL(file);
            } else {
                img2Base64 = "";
            }
        });
    }

    document.getElementById('btn-nuevo-producto').addEventListener('click', () => {
        document.getElementById('form-producto').reset();
        currentProdEditId = null;
        imgBase64 = "";
        img2Base64 = "";
        
        // Autoincrementar ID
        const maxId = productosLocales.reduce((max, p) => p.id > max ? p.id : max, 0);
        document.getElementById('prod-codigo').value = (maxId + 1).toString();
        
        document.getElementById('titulo-form-producto').textContent = "NUEVO PRODUCTO";
        hideAllViews();
        viewFormProducto.classList.remove('is-hidden');
    });

    document.getElementById('btn-cancelar-producto').addEventListener('click', () => {
        navProductos.click();
    });

    document.getElementById('form-producto').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isEditing = currentProdEditId !== null;
        const assignedId = isEditing ? currentProdEditId : parseInt(document.getElementById('prod-codigo').value);

        // Si estamos editando y no seleccionamos nueva imagen, mantenemos la anterior
        let finalImg = imgBase64;
        let finalImg2 = img2Base64;
        
        if (isEditing) {
            const p = productosLocales.find(item => item.id === assignedId);
            if (p) {
                if (!finalImg) finalImg = p.img;
                if (!finalImg2) finalImg2 = p.img2;
            }
        }

        const nuevoProducto = {
            id: assignedId,
            titulo: document.getElementById('prod-nombre').value,
            precio: parseFloat(document.getElementById('prod-precio').value),
            descripcion: document.getElementById('prod-descripcion').value,
            img: finalImg,
            img2: finalImg2,
            stock: parseInt(document.getElementById('prod-stock').value),
            stockCritico: parseInt(document.getElementById('prod-stock-critico').value || 0),
            categoria: document.getElementById('prod-categoria').value
        };

        if (isEditing) {
            // Editar
            for (let i = 0; i < productosLocales.length; i++) {
                if (productosLocales[i].id === assignedId) {
                    productosLocales[i] = nuevoProducto;
                    break;
                }
            }
        } else {
            // Nuevo
            productosLocales.push(nuevoProducto);
        }

        guardarProductos();
        alert('Producto guardado correctamente en LocalStorage');
        navProductos.click();
    });

    window.editarProducto = function(id) {
        const p = productosLocales.find(item => item.id === id);
        if (p) {
            currentProdEditId = p.id;
            document.getElementById('prod-codigo').value = p.id;
            document.getElementById('prod-nombre').value = p.titulo;
            document.getElementById('prod-descripcion').value = p.descripcion || '';
            document.getElementById('prod-precio').value = p.precio;
            document.getElementById('prod-stock').value = p.stock || 0;
            document.getElementById('prod-stock-critico').value = p.stockCritico || 0;
            document.getElementById('prod-categoria').value = p.categoria || '';
            
            // Limpiar inputs de file al editar (la img original se conserva si no se sube otra)
            document.getElementById('prod-img').value = '';
            document.getElementById('prod-img2').value = '';
            imgBase64 = "";
            img2Base64 = "";

            document.getElementById('titulo-form-producto').textContent = "EDITAR PRODUCTO";
            hideAllViews();
            viewFormProducto.classList.remove('is-hidden');
        }
    };

    window.eliminarProducto = function(id) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            productosLocales = productosLocales.filter(item => item.id !== id);
            guardarProductos();
            renderTablaProductos();
        }
    };


    // --- Lógica de Usuarios ---
    let usuariosLocales = JSON.parse(localStorage.getItem('adminUsuarios')) || datosUsuarios;

    function guardarUsuarios() {
        localStorage.setItem('adminUsuarios', JSON.stringify(usuariosLocales));
    }

    // Array de Regiones y Comunas
    const regionesYcomunas = [
        { region: "Región Metropolitana de Santiago", comunas: ["Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "Providencia", "Ñuñoa"] },
        { region: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"] },
        { region: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"] },
        { region: "Región de La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica"] },
        { region: "Región de Ñuble", comunas: ["Chillán", "San Carlos", "Bulnes"] },
        { region: "Región de Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle"] },
        { region: "Región de Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla"] },
        { region: "Región de Tarapacá", comunas: ["Iquique", "Alto Hospicio"] },
        { region: "Región del Maule", comunas: ["Talca", "Curicó", "Linares"] },
        { region: "Región de Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro"] },
        { region: "Región de Magallanes", comunas: ["Punta Arenas", "Puerto Natales"] },
        { region: "Región de Arica y Parinacota", comunas: ["Arica", "Putre"] },
        { region: "Región de O'Higgins", comunas: ["Rancagua", "San Fernando"] }
    ];

    const selectRegion = document.getElementById('user-region');
    const selectComuna = document.getElementById('user-comuna');

    if (selectRegion && selectComuna) {
        // Cargar Regiones
        regionesYcomunas.forEach(rc => {
            const option = document.createElement("option");
            option.value = rc.region;
            option.textContent = rc.region;
            selectRegion.appendChild(option);
        });

        // Evento al cambiar región
        selectRegion.addEventListener("change", (e) => {
            const selectedRegion = e.target.value;
            const data = regionesYcomunas.find(rc => rc.region === selectedRegion);
            
            selectComuna.innerHTML = '<option value="" disabled selected>Seleccione la comuna...</option>';
            if (data) {
                data.comunas.forEach(c => {
                    const option = document.createElement("option");
                    option.value = c;
                    option.textContent = c;
                    selectComuna.appendChild(option);
                });
                selectComuna.disabled = false;
            } else {
                selectComuna.disabled = true;
            }
        });
    }

    function renderTablaUsuarios() {
        const tbody = document.querySelector('#tabla-usuarios tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        for (let i = 0; i < usuariosLocales.length; i++) {
            const u = usuariosLocales[i];
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.run}</td>
                <td>${u.nombre} ${u.apellidos}</td>
                <td>${u.correo}</td>
                <td>${u.tipoUsuario}</td>
                <td>${u.region}</td>
                <td>
                    <button class="button is-small is-info" onclick="editarUsuario('${u.run}')">Editar</button>
                    <button class="button is-small is-danger" onclick="eliminarUsuario('${u.run}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    document.getElementById('btn-nuevo-usuario').addEventListener('click', () => {
        document.getElementById('form-usuario').reset();
        document.getElementById('user-mode').value = 'new';
        document.getElementById('user-run').readOnly = false;
        selectComuna.innerHTML = '<option value="" disabled selected>Seleccione comuna...</option>';
        selectComuna.disabled = true;
        document.getElementById('titulo-form-usuario').textContent = "NUEVO USUARIO";
        hideAllViews();
        viewFormUsuario.classList.remove('is-hidden');
    });

    document.getElementById('btn-cancelar-usuario').addEventListener('click', () => {
        navUsuarios.click();
    });

    document.getElementById('form-usuario').addEventListener('submit', (e) => {
        e.preventDefault();

        // Validaciones Manuales Requeridas
        const runInput = document.getElementById('user-run').value;
        const correoInput = document.getElementById('user-correo').value;
        const passwordInput = document.getElementById('user-password').value;
        
        // Validar RUN sin puntos ni guion
        const runRegex = /^[0-9]+[0-9kK]$/;
        if (!runRegex.test(runInput)) {
            alert('El RUN debe ingresarse sin puntos ni guión (ej: 19011022K).');
            return;
        }

        // Validar dominio de correo
        const dominioValido = correoInput.endsWith('@duoc.cl') || correoInput.endsWith('@profesor.duoc.cl') || correoInput.endsWith('@gmail.com');
        if (!dominioValido) {
            alert('El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
            return;
        }

        const mode = document.getElementById('user-mode').value;
        const nuevoUsuario = {
            run: runInput,
            nombre: document.getElementById('user-nombre').value,
            apellidos: document.getElementById('user-apellidos').value,
            correo: correoInput,
            password: passwordInput, // Guarda password mock
            tipoUsuario: document.getElementById('user-tipo').value,
            fechaNacimiento: document.getElementById('user-fecha').value,
            region: document.getElementById('user-region').value,
            comuna: document.getElementById('user-comuna').value,
            direccion: document.getElementById('user-direccion').value
        };

        if (mode === 'edit') {
            for (let i = 0; i < usuariosLocales.length; i++) {
                if (usuariosLocales[i].run === runInput) {
                    usuariosLocales[i] = nuevoUsuario;
                    break;
                }
            }
        } else {
            // Validar que no exista el RUN
            const existe = usuariosLocales.find(u => u.run === runInput);
            if (existe) {
                alert('El RUN ya está registrado.');
                return;
            }
            usuariosLocales.push(nuevoUsuario);
        }

        guardarUsuarios();
        alert('Usuario guardado correctamente');
        navUsuarios.click();
    });

    window.editarUsuario = function(run) {
        const u = usuariosLocales.find(item => item.run === run);
        if (u) {
            document.getElementById('user-mode').value = 'edit';
            const runField = document.getElementById('user-run');
            runField.value = u.run;
            runField.readOnly = true; // No permitir cambiar el RUN en edición
            
            document.getElementById('user-nombre').value = u.nombre;
            document.getElementById('user-apellidos').value = u.apellidos;
            document.getElementById('user-correo').value = u.correo;
            document.getElementById('user-password').value = u.password || ''; 
            document.getElementById('user-tipo').value = u.tipoUsuario;
            document.getElementById('user-fecha').value = u.fechaNacimiento || '';
            document.getElementById('user-direccion').value = u.direccion || '';

            selectRegion.value = u.region;
            
            // Llenar comunas de la región seleccionada
            const data = regionesYcomunas.find(rc => rc.region === u.region);
            selectComuna.innerHTML = '<option value="" disabled selected>Seleccione la comuna...</option>';
            if (data) {
                data.comunas.forEach(c => {
                    const option = document.createElement("option");
                    option.value = c;
                    option.textContent = c;
                    selectComuna.appendChild(option);
                });
                selectComuna.disabled = false;
            }

            // Seleccionar comuna asignada, o agregarla si falta en el array
            if(u.comuna) {
                if(!Array.from(selectComuna.options).some(opt => opt.value === u.comuna)) {
                    selectComuna.innerHTML += `<option value="${u.comuna}">${u.comuna}</option>`;
                }
                selectComuna.value = u.comuna;
                selectComuna.disabled = false;
            }

            document.getElementById('titulo-form-usuario').textContent = "EDITAR USUARIO";
            hideAllViews();
            viewFormUsuario.classList.remove('is-hidden');
        }
    };

    window.eliminarUsuario = function(run) {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            usuariosLocales = usuariosLocales.filter(item => item.run !== run);
            guardarUsuarios();
            renderTablaUsuarios();
        }
    };

});
