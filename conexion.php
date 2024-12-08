<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
context();

function context(){
    $host = 'localhost'; // Servidor
    $dbname = 'proyecto_ia'; // Nombre de la base de datos
    $username = 'root'; // Usuario de la base de datos
    $password = 'Lunes08122'; // Contraseña del usuario
    try {
        // Crear la conexión usando PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Escribir la consulta en crudo
        $sql = "SELECT tema_id,tema_historial FROM tema_historial WHERE tema_id = 1";
        // Ejecutar la consulta
        $stmt = $pdo->query($sql);
    
        // Recorrer y mostrar los resultados
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
       $respuesta = json_encode(array('data'=> $row));
    
    } catch (PDOException $e) {
        // Manejo de errores
        $error = "Error: " . $e->getMessage();
        $respuesta = json_encode(array(array('data'=> $error)));
    }
    echo $respuesta;
}

