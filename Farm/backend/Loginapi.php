<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require './db/Connection.php'; // Adjust path as per your file structure

$objdb = new DbConnect();
$conn = $objdb->connect();

function send_response($status, $message, $data = []) {
    $response = ['status' => $status, 'message' => $message];
    if (!empty($data)) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit();
}

$data = $_POST;

$required_fields = ['email', 'password'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        send_response('error', "The field '$field' is required.");
    }
}

$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $conn->prepare("SELECT id, email, password_hash FROM CustomerDetails WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        send_response('error', 'Invalid credentials');
    }

    $password_hash = $user['password_hash'];

    // Verify the password using password_verify
    if (password_verify($password, $password_hash)) {
        // Password matches, login successful
        send_response('success', 'Login successful', ['user_id' => $user['id']]);
    } else {
        // Password does not match
        send_response('error', 'Invalid credentials');
    }
} catch (PDOException $e) {
    send_response('error', 'Database error: ' . $e->getMessage());
}
?>
