<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
// Database configuration

require '../db/Connection.php';

try {
    $objDb = new DbConnect();
    $pdo = $objDb->connect();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}


if (!isset($_GET['state_name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'state_name parameter is missing']);
    exit();
}

$state_name = $_GET['state_name'];
// echo $state_name;
try {

    // Fetch state ID based on state name
    $stmt = $pdo->prepare("SELECT state_id FROM State WHERE name = ?");

    $stmt->execute([$state_name]);

    $state = $stmt->fetch();

    if (!$state) {
        http_response_code(404);
        echo json_encode(['error' => 'State not found']);
        exit();
    }
    // echo "pattabi";

    $state_id = $state['state_id'];

    // Fetch cities based on state_id
    $stmt = $pdo->prepare("SELECT city_name FROM City WHERE state_id = ?");
    $stmt->execute([$state_id]);
    $cities = $stmt->fetchAll();
    echo json_encode($cities);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
    exit();
}
?>
