<?php
    include 'conexion.php'; // Incluye el archivo de conexión a la base de datos

    // Obtiene los datos enviados desde el formulario de login
    $correo = $_POST['correo']; // El correo electrónico ingresado por el usuario
    $contrasena = $_POST['contrasena']; // La contraseña ingresada por el usuario

    // Realiza una consulta para verificar si existe un usuario con el correo y contraseña ingresados
    $validar_login = mysqli_query($conexion, 
        "SELECT * FROM usuario WHERE correo='$correo' AND contrasena='$contrasena'");

    // Verifica si la consulta encontró alguna fila (es decir, si el usuario existe)
    if (mysqli_num_rows($validar_login) > 0) {
        // Si existe el usuario, redirige a la página de inicio
        header("location: inicio.html");
    } else {
        // Si no existe el usuario, muestra un mensaje de error y redirige al formulario de registro
        echo '
            <script>
                alert("Usuario no existe, verifica los datos"); // Muestra un mensaje de alerta
                window.location.href= "signup.html"; // Redirige a la página de registro
            </script>
        ';
        exit(); // Termina el script
    }
?>
