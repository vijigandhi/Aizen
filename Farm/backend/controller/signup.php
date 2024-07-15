<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// require '../model/Connection.php'; // Adjust path as per your file structure

$objdb = new DbConnect();
$conn = $objdb->connect();

$data = json_decode(file_get_contents('php://input'), true);

$firstname = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';


$response = [];

try {
    if (empty($firstname) || empty($email) || empty($password) || empty($confirmPassword)) {
        throw new Exception('All fields are required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT * FROM CustomerDetails WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        throw new Exception('Email already exists');
    }

    // Prepare and execute INSERT statement
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $statement = $conn->prepare("INSERT INTO CustomerDetails (first_name,email, password_hash) 
                                VALUES (:firstname, :email, :password)");
    $statement->bindParam(':firstname', $firstname);
    $statement->bindParam(':email', $email);
    $statement->bindParam(':password', $hashedPassword); // Correctly bind hashed password

    if ($statement->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Registration successful';
    } else {
        throw new Exception('Registration failed');
    }
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);

