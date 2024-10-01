// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container'); // Contenedor del carrito
    const totalElement = document.getElementById('total'); // Elemento donde se muestra el total

    // Función para calcular y actualizar el total del carrito
    function actualizarTotal() {
        let total = 0;
        // Obtiene los productos almacenados en el carrito desde sessionStorage
        const productos = JSON.parse(sessionStorage.getItem('carrito') || '[]');
        
        // Suma los precios de todos los productos
        productos.forEach(item => {
            total += item.precio;
        });
        
        // Muestra el total en formato de dos decimales
        totalElement.textContent = total.toFixed(2);
    }

    // Función para mostrar los productos del carrito
    function mostrarCarrito() {
        const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]'); // Obtiene el carrito de sessionStorage
        carritoContainer.innerHTML = ''; // Limpia el contenido del contenedor del carrito
    
        // Si el carrito está vacío, muestra un mensaje
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            return;
        }
    
        // Recorre los productos del carrito y los muestra en el contenedor
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'item-carrito'; // Añade clase para el estilo del producto
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.modelo}"> <!-- Muestra la imagen del producto -->
                <div class="info">
                    <h3>${item.modelo}</h3> <!-- Muestra el modelo del producto -->
                    <p>Talla: ${item.size}</p> <!-- Muestra la talla del producto -->
                    <p class="precio">$ ${item.precio.toLocaleString()}</p> <!-- Muestra el precio -->
                    <button onclick="eliminarProducto(${index})">Eliminar</button> <!-- Botón para eliminar el producto -->
                </div>
            `;
            carritoContainer.appendChild(div); // Añade el producto al contenedor
        });
    
        // Actualiza el total después de mostrar los productos
        actualizarTotal();
    }

    // Muestra el carrito al cargar la página
    mostrarCarrito();
    window.mostrarCarrito = mostrarCarrito; // Hace la función accesible globalmente

    // Evento para finalizar la compra cuando se hace clic en el botón "finalizar"
    document.querySelector('.finalizar').addEventListener('click', finalizarCompra);
});

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]'); // Obtiene el carrito
    carrito.splice(index, 1); // Elimina el producto en el índice dado
    sessionStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito actualizado en sessionStorage
    mostrarCarrito(); // Muestra el carrito actualizado
}

// Función para finalizar la compra
function finalizarCompra(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]'); // Obtiene el carrito
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.'); // Si el carrito está vacío, muestra un mensaje
        return;
    }

    // Obtiene los valores del formulario (nombre y correo)
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;

    // Aquí puedes obtener el ID del usuario de alguna fuente, por ejemplo, una variable de sesión
    const usuario_id = 1; // Simulación de usuario_id (debe cambiarse por el ID real)

    // Envío de los datos del carrito y del usuario al servidor mediante una solicitud POST
    fetch('guardar_carrito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre, // Incluye el nombre en la solicitud
            correo: correo, // Incluye el correo en la solicitud
            productos: carrito // Incluye los productos del carrito
        }),
    })
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
        // Si la respuesta del servidor es exitosa
        if (data.status === 'success') {
            alert('Reserva finalizada. ¡Gracias por tu reserva!'); // Muestra un mensaje de éxito
            sessionStorage.removeItem('carrito'); // Limpia el carrito del sessionStorage
            mostrarCarrito(); // Actualiza el carrito
        } else {
            alert('Error al guardar el carrito: ' + data.message); // Muestra el error si ocurre
        }
    })
    .catch(error => {
        console.error('Error:', error); // Muestra el error en la consola
        alert('Error al guardar el carrito. Por favor, inténtalo de nuevo.'); // Muestra un mensaje de error
    });
}

