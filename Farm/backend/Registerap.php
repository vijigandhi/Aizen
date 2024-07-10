<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require './db/Connection.php'; // Adjust path as per your file structure

$objdb = new DbConnect();
$conn = $objdb->connect();
// var_dump($conn);

function send_response($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit();
}

function handle_file_upload($file) {
    $target_dir = '/var/www/html/AIZEN/Frontend/src/assets/'; // Adjust path as per your server configuration
    $target_file = $target_dir . basename($file['name']);
    $upload_ok = 1;
    $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Validate file type, size, etc. (as per previous script)
    // ...

    // Example validation snippet (ensure to complete all validation checks):
    if ($upload_ok == 0) {
        send_response('error', "Sorry, your file was not uploaded.");
    } else {
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            return $target_file;
        } else {
            send_response('error', "Sorry, there was an error uploading your file.");
        }
    }
}

$data = $_POST;

$required_fields = ['first_name', 'last_name', 'email', 'password'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        send_response('error', "The field '$field' is required.");
    }
}

$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email = $data['email'];
$password = $data['password'];
$role_id = 3; // Assuming role_id for CustomerDetails

try {
    $checkEmailStmt = $conn->prepare("SELECT * FROM CustomerDetails WHERE email = ?");
    $checkEmailStmt->execute([$email]);
    $emailExists = $checkEmailStmt->fetchColumn();

    if ($emailExists) {
        send_response('error', 'Email already exists');
    }
} catch (PDOException $e) {
    send_response('error', 'Database error: ' . $e->getMessage());
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$id_proof_image_path = null;
if (!empty($_FILES['id_proof']['name'])) {
    $id_proof_image_path = handle_file_upload($_FILES['id_proof']);
}

try {
    if ($id_proof_image_path !== null) {
        $sql = "INSERT INTO CustomerDetails (first_name, last_name, email, password_hash, role_id, id_proof) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$first_name, $last_name, $email, $password_hash, $role_id, $id_proof_image_path]);
    } else {
        $sql = "INSERT INTO CustomerDetails (first_name, last_name, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$first_name, $last_name, $email, $password_hash, $role_id]);
    }

    send_response('success', 'User registered successfully');
} catch (PDOException $e) {
    send_response('error', 'Database error: ' . $e->getMessage());
}
?>
