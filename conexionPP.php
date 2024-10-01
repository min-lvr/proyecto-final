<?php

$host = 'localhost'; 
$usuario = 'root'; 
$contraseña = ''; 
$base_de_datos = 'login_registro_db'; 

// Crear la conexión
$mysqli = new mysqli($host, $usuario, $contraseña, $base_de_datos);

// Verificar la conexión
if ($mysqli->connect_error) {
    die('Error de conexión: ' . $mysqli->connect_error);
}
?>