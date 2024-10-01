<<?php
// Configuración de la base de datos
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

// Consultar los mensajes
$sql = "SELECT nombre, correo, mensaje, created_at FROM contacto ORDER BY created_at DESC"; // Consulta SQL para obtener los mensajes
$result = $conn->query($sql); // Ejecuta la consulta
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensajes de Contacto</title>
    <style>
        /* Estilos para la tabla */
        table {
            width: 100%;
            border-collapse: collapse; /* Elimina el espacio entre los bordes de la tabla */
        }
        table, th, td {
            border: 1px solid black; /* Bordes para la tabla y celdas */
        }
        th, td {
            padding: 10px; /* Espaciado interno en celdas */
            text-align: left; /* Alineación a la izquierda */
        }
        th {
            background-color: #f2f2f2; /* Color de fondo para los encabezados */
        }
    </style>
</head>
<body>
    <h1>Lista de Mensajes</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Mensaje</th>
                <th>Fecha y Hora</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                // Mostrar los mensajes
                while($row = $result->fetch_assoc()) { // Itera sobre los resultados
                    echo "<tr>"; // Comienza una nueva fila

                    // Muestra cada columna
                    echo "<td>" . htmlspecialchars($row["nombre"]) . "</td>"; // Nombre
                    echo "<td>" . htmlspecialchars($row["correo"]) . "</td>"; // Correo
                    echo "<td>" . htmlspecialchars($row["mensaje"]) . "</td>"; // Mensaje
                    echo "<td>" . $row["created_at"] . "</td>"; // Fecha y hora
                    echo "</tr>"; // Cierra la fila
                }
            } else {
                echo "<tr><td colspan='5'>No se encontraron mensajes.</td></tr>"; // Mensaje si no hay resultados
            }
            ?>
        </tbody>
    </table>
    <?php
    // Cerrar la conexión
    $conn->close(); // Cierra la conexión a la base de datos
    ?>
</body>
</html>
