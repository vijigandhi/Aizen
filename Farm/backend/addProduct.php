<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name'])) {
    $name = $data['name'];

    // Include the database connection file
    include 'db_connect.php';

    $stmt = $conn->prepare("INSERT INTO countries (name) VALUES (?)");
    $stmt->bind_param("s", $name);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Country added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add country']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
