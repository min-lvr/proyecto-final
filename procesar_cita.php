<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionPP.php'; // 'conexionPP.php' contiene la configuración de la conexión a la base de datos

// Obtener los datos enviados desde el formulario a través del método POST
$fecha = $_POST['fecha']; // Fecha de la cita
$hora = $_POST['hora'];   // Hora de la cita
$nombre = $_POST['nombre']; // Nombre del usuario que agenda la cita
$correo = $_POST['correo']; // Correo electrónico del usuario

// Preparar la consulta SQL para insertar los datos en la tabla 'citas'
$sql = "INSERT INTO citas (fecha, hora, nombre, correo) VALUES (?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql); // Preparar la consulta evitando inyecciones SQL
$stmt->bind_param('ssss', $fecha, $hora, $nombre, $correo); // Asignar los valores a los parámetros en la consulta

// Ejecutar la consulta y verificar si se realizó correctamente
if ($stmt->execute()) {
    echo 'Cita agendada con éxito'; // Mostrar mensaje de éxito si se inserta la cita correctamente
} else {
    // Si hay un error al insertar la cita, mostrar un mensaje de error junto con el mensaje de error específico de MySQL
    echo 'Error al agendar la cita: ' . $mysqli->error;
}

// Cerrar el statement y la conexión a la base de datos
$stmt->close(); // Cierra el statement
$mysqli->close(); // Cierra la conexión a la base de datos
?>
