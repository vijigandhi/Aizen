<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db/Connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['customer_id'], $data['product_id'], $data['quantity'])) {
    $customer_id = $data['customer_id'];
    $product_id = $data['product_id'];
    $quantity = $data['quantity'];

    try {
        $objDb = new DbConnect();
        $pdo = $objDb->connect();

        // Check if product exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM Products WHERE product_id = ?");
        $stmt->execute([$product_id]);
        $productExists = $stmt->fetchColumn();

        if ($productExists) {
            // Add item to cart
            $stmt = $pdo->prepare("INSERT INTO Cart (customer_id, product_id, quantity) VALUES (?, ?, ?)");
            $stmt->execute([$customer_id, $product_id, $quantity]);
            echo json_encode(['message' => 'Product added to cart successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add product to cart: ' . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request parameters']);
}
?>
