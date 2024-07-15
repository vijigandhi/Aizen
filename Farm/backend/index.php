<?php

require 'router.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

require './model/Connection.php'; // Adjust path as per your file structure

$objdb = new DbConnect();
$conn = $objdb->connect();

session_start();

$router = new Router();

// Define routes
$router->post('/api/signup', 'controller/signup.php')->middlewares('guest');
$router->post('/api/login', 'controller/login.php')->middlewares('guest');

// Additional routes as needed
require $router->routes();
?>
