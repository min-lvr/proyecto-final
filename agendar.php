<?php
// Establece el formato de la respuesta como JSON
header('Content-Type: application/json');

// Incluye el archivo de conexión a la base de datos
include 'conexion.php'; 

// Recoge los datos enviados desde el formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$fechaHora = $fecha . ' ' . $hora; // Combina la fecha y hora en una sola variable

// Verificar si ya hay una cita para esta fecha y hora
$sql_check = "SELECT COUNT(*) AS count FROM citas WHERE fecha = ?";
$stmt_check = $conn->prepare($sql_check);// Prepara la consulta
$stmt_check->bind_param('s', $fechaHora); // Asigna el valor de la fecha y hora a la consulta
$stmt_check->execute(); // Ejecuta la consulta
$result_check = $stmt_check->get_result(); // Obtiene los resultados de la consulta
$row = $result_check->fetch_assoc(); // Almacena el resultado en un array asociativo

// Si ya hay una cita para esa fecha y hora, se envía un mensaje de error
if ($row['count'] > 0) {
    echo json_encode(['success' => false, 'message' => 'La hora ya está reservada.']);
} else {
    // Preparar y ejecutar la consulta de inserción
    $sql_insert = "INSERT INTO citas (nombre, correo, fecha) VALUES (?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param('sss', $nombre, $correo, $fechaHora); //Asigna los valores del nombre, correo y fecha/hora

    if ($stmt_insert->execute()) {
        echo json_encode(['success' => true, 'message' => 'Cita agendada con éxito.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agendar la cita: ' . $stmt_insert->error]);
    }
}

// Cerrar conexiones
$stmt_check->close();
$stmt_insert->close();
$conn->close();
?>
