import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { datosProductos } from "./productos/productos.js";

// Renderizar componentes compartidos
renderHeader();
renderFooter();

// 2. Capturar el contenedor usando su ID (ya no necesitamos el [0])

const contenedor = document.getElementById("contenedor-productos");

// Limpiamos el contenedor para evitar duplicados
contenedor.innerHTML = "";

// Iteramos el JSON para crear las tarjetas con diseño
datosProductos.forEach(producto => {
  
  // Crear el div contenedor del producto
  const divProducto = document.createElement("div");
  divProducto.className = "tarjeta-producto"; // Mantenemos la clase para que puedas darle estilo con CSS
  // Crear la imagen
  const img1 = document.createElement("img");
  img1.src = producto.imagen;
  img1.alt = producto.titulo;
  img1.className = "image is-64x64"
  
  // Crear el título
  const titulo = document.createElement("h3");
  titulo.textContent = producto.titulo;

  // Crear el precio
  const precio = document.createElement("p");
  precio.textContent = `Precio: $${producto.precio.toLocaleString('es-CL')}`;

  // Crear la descripción
  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;

  // 4. Agregar todos los elementos hijos al div del producto
  divProducto.appendChild(img);
  divProducto.appendChild(titulo);
  divProducto.appendChild(precio);
  divProducto.appendChild(descripcion);

  // 5. Finalmente, inyectar el div completo en el contenedor principal
  contenedor.appendChild(divProducto);
});