 // 1. JSON simulado con los datos de los productos
import { datosProductos } from "./productos/productos.js";

// 2. Capturar el contenedor usando su ID (ya no necesitamos el [0])
const contenedor = document.getElementById("contenedor-productos");

// 3. Iterar sobre el JSON para crear un div por cada producto
datosProductos.forEach(producto => {
  
  // Crear el div contenedor del producto
  const divProducto = document.createElement("div");
  divProducto.className = "tarjeta-producto"; // Mantenemos la clase para que puedas darle estilo con CSS
  // Crear la imagen
  const img1 = document.createElement("img");
  img1.src = producto.imagen;
  img1.alt = producto.titulo;
  img1.className = "image is-64x64"
  // 2. Crear la segunda imagen (espalda)
  const img2 = document.createElement("img");
  img2.src = producto.imagenEspalda;
  img2.alt = `${producto.titulo} espalda`;
  img2.className = "image is-64x64";
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