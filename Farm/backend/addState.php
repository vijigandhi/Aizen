<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type'); 
require 'db_connect.php';

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$storeName = $conn->real_escape_string($data['name']);
$addressLine1 = $conn->real_escape_string($data['address_line1']);
$addressLine2 = $conn->real_escape_string($data['address_line2']);
$addressLine3 = $conn->real_escape_string($data['address_line3']);
$cityId = (int)$data['city_id'];
$stateId = (int)$data['state_id'];
$countryId = (int)$data['country_id'];

// Check if the city exists
$checkCitySql = "SELECT id FROM cities WHERE id = $cityId";
$checkCityResult = $conn->query($checkCitySql);

if ($checkCityResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid city ID']);
    exit;
}

// Insert query
$sql = "INSERT INTO stores (name, address_line1, address_line2, address_line3, city_id, state_id, country_id) 
        VALUES ('$storeName', '$addressLine1', '$addressLine2', '$addressLine3', $cityId, $stateId, $countryId)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Store added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
