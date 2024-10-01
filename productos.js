/// Variables para la selección del producto
let mostrador = document.getElementById("mostrador"); // Elemento que muestra el producto seleccionado
let seleccion = document.getElementById("seleccion"); // Elemento que muestra los detalles del producto
let imgSeleccionada = document.getElementById("img"); // Imagen del producto seleccionado
let modeloSeleccionado = document.getElementById("modelo"); // Modelo del producto seleccionado
let descripSeleccionada = document.getElementById("descripcion"); // Descripción del producto seleccionado
let precioSeleccionado = document.getElementById("precio"); // Precio del producto seleccionado

// Función para cargar los detalles del producto seleccionado
function cargar(item) {
    quitarBordes(); // Llama a la función para quitar bordes de otros productos
    mostrador.style.width = "60%"; // Cambia el ancho del mostrador
    seleccion.style.width = "40%"; // Cambia el ancho de la selección
    seleccion.style.opacity = "1"; // Aumenta la opacidad para mostrar el detalle del producto
    item.style.border = "2px solid red"; // Agrega un borde rojo al producto seleccionado

    // Actualiza los detalles del producto en la interfaz
    imgSeleccionada.src = item.getElementsByTagName("img")[0].src; // Cambia la imagen seleccionada
    modeloSeleccionado.innerHTML = item.getElementsByTagName("p")[0].innerHTML; // Muestra el modelo
    descripSeleccionada.innerHTML = "Descripción del modelo "; // Descripción (puede ser dinámico)
    precioSeleccionado.innerHTML = item.getElementsByTagName("span")[0].innerHTML; // Muestra el precio
}

// Función para cerrar la vista de selección de producto
function cerrar() {
    mostrador.style.width = "100%"; // Restaura el ancho del mostrador
    seleccion.style.width = "0%"; // Oculta la selección
    seleccion.style.opacity = "0"; // Reduce la opacidad para ocultar el detalle
    quitarBordes(); // Llama a la función para quitar bordes de otros productos
}

// Función para quitar el borde de todos los productos
function quitarBordes() {
    var items = document.getElementsByClassName("item"); // Obtiene todos los elementos con la clase "item"
    for (let i = 0; i < items.length; i++) {
        items[i].style.border = "none"; // Quita el borde de cada producto
    }
}

// Función para agregar el producto seleccionado al carrito
function agregarAlCarrito() {
    const modelo = modeloSeleccionado.textContent; // Obtiene el modelo del producto
    const precio = parseFloat(precioSeleccionado.textContent.replace(/[$,.]/g, '')); // Obtiene el precio y lo convierte a número
    const size = document.querySelector('.size select').value; // Obtiene la talla seleccionada
    const imagen = imgSeleccionada.src; // Obtiene la URL de la imagen seleccionada

    // Obtener el ID del producto seleccionado
    const producto_id = document.querySelector(".item[style*='2px solid red']").getAttribute('data-id'); // Encuentra el ID del producto seleccionado

    // Verifica si se ha seleccionado una talla
    if (size === '') {
        alert('Por favor, selecciona una talla.'); // Muestra una alerta si no hay talla seleccionada
        return; // Sale de la función si no hay talla
    }

    // Manejo del carrito en sessionStorage
    let carrito = sessionStorage.getItem('carrito'); // Obtiene el carrito del sessionStorage
    if (carrito) {
        carrito = JSON.parse(carrito); // Si existe, lo convierte de JSON a un objeto
    } else {
        carrito = []; // Si no existe, inicializa un nuevo array
    }

    // Agrega el producto seleccionado al carrito
    carrito.push({ producto_id, modelo, precio, size, imagen });
    sessionStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en sessionStorage

    alert('Producto agregado al carrito'); // Muestra un mensaje de éxito
    cerrar(); // Cierra la vista de selección
}

// Agrega un evento al botón para agregar el producto al carrito
document.querySelector('.info button').addEventListener('click', agregarAlCarrito);


