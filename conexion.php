<?php

    $conexion=mysqli_connect("localhost","root","","login_registro_db");
    if($conexion){
        echo("Conexión exitosa");
    }else{
        echo("NO se pudo conectar");
    }
?>