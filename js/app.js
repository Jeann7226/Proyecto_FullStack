 // 1. JSON simulado con los datos de los productos
const datosProductos = [
  { imagen: "https://via.placeholder.com/50", titulo: "Teclado Mecánico", precio: 45000, descripcion: "Teclado mecánico ideal para desarrollo web." },
  { imagen: "https://via.placeholder.com/50", titulo: "Monitor 24 pulgadas", precio: 120000, descripcion: "Monitor IPS con resolución Full HD." },
  { imagen: "https://via.placeholder.com/50", titulo: "Ratón Inalámbrico", precio: 25000, descripcion: "Ratón ergonómico con batería de larga duración." },
  { imagen: "https://via.placeholder.com/50", titulo: "Auriculares Gaming", precio: 55000, descripcion: "Auriculares con cancelación de ruido y sonido 7.1." },
  { imagen: "https://via.placeholder.com/50", titulo: "Silla Gamer", precio: 150000, descripcion: "Silla ergonómica ajustable para largas horas de trabajo." },
  { imagen: "https://via.placeholder.com/50", titulo: "Micrófono USB", precio: 35000, descripcion: "Micrófono de condensador para streaming y podcasts." },
  { imagen: "https://via.placeholder.com/50", titulo: "Cámara Web 1080p", precio: 40000, descripcion: "Cámara de alta definición con enfoque automático." },
  { imagen: "https://via.placeholder.com/50", titulo: "Alfombrilla XL", precio: 15000, descripcion: "Alfombrilla de escritorio grande para ratón y teclado." },
  { imagen: "https://via.placeholder.com/50", titulo: "Soporte para Monitor", precio: 30000, descripcion: "Soporte de brazo articulado para 2 monitores." },
  { imagen: "https://via.placeholder.com/50", titulo: "Disco Duro Externo 1TB", precio: 45000, descripcion: "Almacenamiento portátil USB 3.0." },
  { imagen: "https://via.placeholder.com/50", titulo: "Memoria RAM 16GB", precio: 60000, descripcion: "Módulo de memoria RAM DDR4 a 3200MHz." },
  { imagen: "https://via.placeholder.com/50", titulo: "Placa Base ATX", precio: 110000, descripcion: "Placa base compatible con procesadores de última generación." },
  { imagen: "https://via.placeholder.com/50", titulo: "Procesador i7", precio: 280000, descripcion: "Procesador de 8 núcleos y 16 hilos de alto rendimiento." },
  { imagen: "https://via.placeholder.com/50", titulo: "Tarjeta Gráfica RTX 3060", precio: 350000, descripcion: "Gráfica para juegos en 1080p y 1440p." },
  { imagen: "https://via.placeholder.com/50", titulo: "Fuente de Poder 750W", precio: 85000, descripcion: "Fuente certificada 80 Plus Gold." },
  { imagen: "https://via.placeholder.com/50", titulo: "Gabinete PC", precio: 70000, descripcion: "Torre media con panel lateral de cristal templado y ventiladores RGB." },
  { imagen: "https://via.placeholder.com/50", titulo: "Hub USB tipo C", precio: 22000, descripcion: "Adaptador multipuerto con HDMI, USB 3.0 y lector de tarjetas." },
  { imagen: "https://via.placeholder.com/50", titulo: "Luz LED para Escritorio", precio: 18000, descripcion: "Lámpara con ajuste de temperatura y brillo." },
  { imagen: "https://via.placeholder.com/50", titulo: "Cable HDMI 2.1", precio: 12000, descripcion: "Cable de alta velocidad compatible con 4K 120Hz." },
  { imagen: "https://via.placeholder.com/50", titulo: "Kit de Limpieza Pantallas", precio: 8000, descripcion: "Spray y paño de microfibra para mantener tus dispositivos limpios." }
];

// 2. Capturar el contenedor usando su ID (ya no necesitamos el [0])
const contenedor = document.getElementById("contenedor-productos");

// 3. Iterar sobre el JSON para crear un div por cada producto
datosProductos.forEach(producto => {
  
  // Crear el div contenedor del producto
  const divProducto = document.createElement("div");
  divProducto.className = "tarjeta-producto"; // Mantenemos la clase para que puedas darle estilo con CSS
  // Crear la imagen
  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.titulo;
  img.className = "image is-64x64"
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