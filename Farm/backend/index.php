<?php
include './db/Connection.php';
require './router.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}


try {
    $objDb = new DbConnect();
    $pdo = $objDb->connect();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}


$router = new Router();

// $router->post('/api/registration', 'controller/registration/register.php')->middlewares('guest');

// $router->post('/api/login', 'controller/login/login.php')->middlewares('guest');

$router->post('/api/state', 'controller/state.php')->middlewares('guest');

$router->post('/api/cities', 'controller/cities.php')->middlewares('guest');

$router->post('/api/category', 'controller/category.php')->middlewares('guest');

$router->post('/api/subCategory', 'controller/subCategory.php')->middlewares('guest');

$router->post('/api/productDetail', 'controller/productDetail.php')->middlewares('guest');

$router->post('/api/cart', 'controller/cart.php')->middlewares('guest');




// Additional routes as needed

require $router->routes();
?>