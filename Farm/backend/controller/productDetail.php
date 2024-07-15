<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
include '../db/Connection.php';

try {
    $objDb = new DbConnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

try {
    // Fetch records from Products table along with the subcategory images
    $sql = "
        SELECT 
            p.*, 
            s.image 
        FROM 
            Products p
        LEFT JOIN 
            Subcategory s 
        ON 
            p.subcategory_id = s.subcategory_id
    ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($cartItems);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Unexpected error: ' . $e->getMessage()]);
}

$conn = null;
?>
