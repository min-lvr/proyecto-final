// Añade un evento para manejar el envío del formulario cuando se hace clic en el botón "submit"
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada (sin recargar la página)

    // Crea un objeto FormData para obtener los datos del formulario
    let formData = new FormData(this); // 'this' se refiere al formulario que disparó el evento

    // Usa el método fetch para enviar los datos a 'send_email.php'
    fetch('send_email.php', {
        method: 'POST', // Envía los datos mediante el método POST
        body: formData // El cuerpo de la solicitud incluye los datos del formulario
    })
    // Convierte la respuesta del servidor en texto
    .then(response => response.text())
    // Muestra un mensaje de éxito cuando se envía el formulario correctamente
    .then(result => {
        alert('Mensaje enviado con éxito.'); // Muestra una alerta cuando el mensaje se envía correctamente
    })
    // Captura y muestra errores en caso de que ocurra algún problema durante el envío
    .catch(error => {
        console.error('Error:', error); // Muestra el error en la consola
    });
});
