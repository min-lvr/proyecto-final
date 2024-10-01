<?php
    // Enlazar mi conexión generada con el registro
    include 'conexion.php'; // Incluye el archivo de conexión a la base de datos

    // Crear nombres de variables para almacenar los datos del formulario
    $nombre = $_POST['nombre_completo']; // Obtiene el nombre completo del formulario
    $correo = $_POST['correo']; // Obtiene el correo del formulario
    $contrasena = $_POST['contrasena']; // Obtiene la contraseña del formulario
    $id = $_id['id']; // (Nota: Aquí parece haber un error, '$_id' no está definido)

    // Crear query para que los datos de las variables se guarden en la tabla
    // Sentencia INSERT y el nombre de las columnas asignadas en las tablas
    $query = "INSERT INTO usuario(nombre_completo, correo, contrasena, id)
                VALUES('$nombre', '$correo', '$contrasena', '$id')";

    // Ejecutar la query
    $ejecutar = mysqli_query($conexion, $query); // Ejecuta la consulta en la base de datos

    // Verificar si la inserción fue exitosa
    if($ejecutar) {
        echo '
            <script>
                alert("Usuario almacenado correctamente");
                window.location.href= "inicio.html"; // Redirige a la página de inicio
            </script>
        ';
    } else {
        echo '
            <script>
                alert("Usuario NO almacenado correctamente");
                window.location.href= "inicio.html"; // Redirige a la página de inicio
            </script>
        ';
    }

    // Verificar que el correo no se repita
    $verificar_correo = mysqli_query($conexion,
        "SELECT * FROM usuario WHERE correo='$correo'"); // Consulta para verificar si el correo ya existe

    // Condicional para verificar si existe una fila con el mismo correo
    if(mysqli_num_rows($verificar_correo) > 0) {
        echo '
            <script>
                alert("Este correo ya está registrado, intenta con otro");
                window.location.href="inicio.html"; // Redirige a la página de inicio
            </script>
        ';
        exit(); // Termina la ejecución del script para evitar instrucciones siguientes
    }
?>
