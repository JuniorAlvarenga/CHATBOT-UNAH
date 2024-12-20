<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');

$tema_id = $_GET['tema_id'];
context($tema_id);

function context($tema_id){
    $host = 'localhost'; // Servidor
    $dbname = 'proyecto_ia'; // Nombre de la base de datos
    $username = 'root'; // Usuario de la base de datos
    $password = 'Lunes08122'; // Contraseña del usuario
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "SELECT tema_id,tema_historial FROM tema_historial WHERE tema_id = $tema_id";

        $stmt = $pdo->query($sql);
    
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
       $respuesta = json_encode(array('data'=> $row));
    
    } catch (PDOException $e) {
        $error = "Error: " . $e->getMessage();
        $respuesta = json_encode(array(array('data'=> $error)));
    }
    echo $respuesta;
}

