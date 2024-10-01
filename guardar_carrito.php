<?php
header('Content-Type: application/json'); // Indica que el contenido que se va a enviar es JSON

// Datos de conexión a la base de datos
$servername = "localhost"; // Nombre del servidor (generalmente localhost en entornos locales)
$username = "root"; // Nombre de usuario de la base de datos (puede variar en producción)
$password = ""; // Contraseña de la base de datos (puede variar en producción)
$dbname = "login_registro_db"; // Nombre de la base de datos

// Conexión a la base de datos usando mysqli
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica si la conexión tuvo algún error
if ($conn->connect_error) {
    // Si hay un error de conexión, devuelve un mensaje JSON con el error
    die(json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $conn->connect_error]));
}

// Obtener los datos enviados en el cuerpo de la solicitud (espera un formato JSON)
$data = json_decode(file_get_contents('php://input'), true); // Decodifica el JSON recibido
//$usuario_id = $data['usuario_id']; // (Se puede usar si se necesita el ID del usuario)
$productos = $data['productos']; // Obtiene los productos del carrito
$nombre = $conn->real_escape_string($data['nombre']); // Limpia el nombre para evitar inyecciones SQL
$correo = $conn->real_escape_string($data['correo']); // Limpia el correo para evitar inyecciones SQL

// Recorre los productos y los inserta uno por uno en la base de datos
foreach ($productos as $producto) {
    $modelo = $conn->real_escape_string($producto['modelo']); // Limpia el modelo del producto
    $precio = $conn->real_escape_string($producto['precio']); // Limpia el precio
    $size = $conn->real_escape_string($producto['size']); // Limpia la talla (size)
    
    // Consulta SQL para insertar cada producto en la tabla 'reservas'
    $sql = "INSERT INTO reservas (nombre, correo, modelo, precio, size) VALUES ('$nombre', '$correo', '$modelo', '$precio', '$size')";
    
    // Ejecuta la consulta SQL y verifica si hay errores
    if (!$conn->query($sql)) {
        // Si hay un error, devuelve un mensaje JSON con el error y detiene el script
        echo json_encode(['status' => 'error', 'message' => 'Error al guardar el producto: ' . $conn->error]);
        $conn->close(); // Cierra la conexión a la base de datos
        exit; // Finaliza el script
    }
}

// Cierra la conexión a la base de datos
$conn->close();

// Si todo se ejecutó correctamente, devuelve un mensaje JSON de éxito
echo json_encode(['status' => 'success']);
?>
