<?php
// Recoge los datos enviados desde el formulario a través del método POST
include 'conexion.php'; // Incluye el archivo para conectarse a la base de datos (si es necesario)
$nombre = $_POST['nombre']; // Obtiene el nombre ingresado en el formulario
$correo = $_POST['correo']; // Obtiene el correo ingresado en el formulario
$telefono = $_POST['telefono']; // Obtiene el teléfono ingresado en el formulario
$mensaje = $_POST['mensaje']; // Obtiene el mensaje ingresado en el formulario

// Define la dirección de correo del destinatario
$to = 'garzonmariansofia@gmail.com'; // Cambia esta dirección por el correo del destinatario real
$subject = 'Nuevo mensaje de contacto'; // Asunto del correo
$headers = "From: $correo\r\n"; // Cabecera del correo: establece quién lo envía
$headers .= "Reply-To: $correo\r\n"; // Cabecera: define a quién responder

// Crea el contenido del correo con la información del formulario
$body = "Nombre: $nombre\n"; // Incluye el nombre en el cuerpo del mensaje
$body .= "Correo electrónico: $correo\n"; // Incluye el correo en el cuerpo del mensaje
$body .= "Mensaje:\n$mensaje\n"; // Incluye el mensaje del usuario

// Usa la función mail() para enviar el correo
if (mail($to, $subject, $body, $headers)) {
    // Si el correo se envía correctamente, muestra este mensaje
    echo "El mensaje ha sido enviado exitosamente.";
} else {
    // Si hay un error en el envío, muestra este mensaje
    echo "Hubo un error al enviar el mensaje.";
}
?>

