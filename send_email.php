<?php

$servername = "localhost"; // Nombre del servidor de la base de datos
$username = "root"; // Nombre de usuario por defecto para XAMPP
$password = ""; // Contraseña por defecto para XAMPP
$dbname = "login_registro_db"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname); // Se establece la conexión a la base de datos

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error); // Si hay error en la conexión, se detiene la ejecución
}

// Datos del correo
$to = 'garzonmariansofia@gmail.com'; // Dirección de correo del destinatario
$subject = 'Nuevo mensaje de contacto'; // Asunto del correo
$nombre = $_POST['nombre']; // Nombre del remitente del formulario
$correo = $_POST['correo']; // Correo del remitente del formulario
$mensaje = $_POST['mensaje']; // Mensaje del remitente del formulario

// Cabecera del correo
$headers = "From: $correo"; // Cabecera 'From' que especifica el correo del remitente

// Crear el cuerpo del mensaje del correo
$correo_mensaje = "Nombre: $nombre\n"; // Agrega el nombre al mensaje
$correo_mensaje .= "Correo: $correo\n\n"; // Agrega el correo al mensaje
$correo_mensaje .= "Mensaje:\n$mensaje"; // Agrega el mensaje al cuerpo del correo

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)"); // Prepara la consulta SQL
$stmt->bind_param("sss", $nombre, $correo, $mensaje); // Asocia los parámetros

// Ejecutar la inserción y enviar el correo
if ($stmt->execute() && mail($to, $subject, $correo_mensaje, $headers)) {
    echo 'Mensaje enviado con éxito.'; // Mensaje de éxito si se envía el correo y se guarda en la base de datos
} else {
    echo 'Error al enviar el mensaje o guardar en la base de datos.'; // Mensaje de error si hay algún problema
}

// Cerrar la declaración y la conexión
$stmt->close(); // Cierra la declaración preparada
$conn->close(); // Cierra la conexión a la base de datos
?>
