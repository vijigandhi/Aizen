<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


// Include your database connection file
require './db/Connection.php'; // Adjust path as per your file structure


// Function to send a JSON response
function send_response($status, $message) {
   echo json_encode(['status' => $status, 'message' => $message]);
   exit();
}


// Function to handle file upload
function handle_file_upload($file) {
   $target_dir = '/var/www/html/AIZEN/Frontend/src/assets/'; // Adjust path as per your server configuration
   $target_file = $target_dir . basename($file['name']);
   $upload_ok = 1;
   $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


   // Check if file is an actual image
   $check = getimagesize($file['tmp_name']);
   if ($check === false) {
       send_response('error', "File is not an image.");
   }


   // Check file size (example: 5MB limit)
   if ($file['size'] > 5000000) {
       send_response('error', "Sorry, your file is too large.");
   }


   // Allow certain file formats
   $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
   if (!in_array($image_file_type, $allowed_extensions)) {
       send_response('error', "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
   }


   // Move the uploaded file to the target directory
   if (move_uploaded_file($file['tmp_name'], $target_file)) {
       return $target_file;
   } else {
       send_response('error', "Sorry, there was an error uploading your file.");
   }
}


// Get POST data
$data = $_POST;


// Validate required fields
$required_fields = ['first_name', 'last_name', 'email', 'password', 'address_line1', 'city', 'state', 'pincode', 'country', 'telephone'];
foreach ($required_fields as $field) {
   if (empty($data[$field])) {
       send_response('error', "The field '$field' is required.");
   }
}


// Extract data
$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email = $data['email'];
$password = $data['password'];
$address_line1 = $data['address_line1'];
$address_line2 = $data['address_line2'] ?? '';
$address_line3 = $data['address_line3'] ?? '';
$city = $data['city'];
$state = $data['state'];
$pincode = $data['pincode'];
$country = $data['country'];
$telephone = $data['telephone'];
$role_id = 3; // Assuming role_id for CustomerDetails


// Validate email uniqueness
try {
   $checkEmailStmt = $pdo->prepare("SELECT * FROM CustomerDetails WHERE email = ?");
   $checkEmailStmt->execute([$email]);
   $emailExists = $checkEmailStmt->fetchColumn();


   if ($emailExists) {
       send_response('error', 'Email already exists');
   }
} catch (PDOException $e) {
   send_response('error', 'Database error: ' . $e->getMessage());
}


// Hash the password
$password_hash = password_hash($password, PASSWORD_DEFAULT);


// Handle file upload if image is provided
$id_proof_image_path = null; // Initialize as null
if (!empty($_FILES['id_proof']['name'])) {
   $id_proof_image_path = handle_file_upload($_FILES['id_proof']);
}


// Proceed with database insertion
try {
   if ($id_proof_image_path !== null) {
       // Insert with id_proof path
       $sql = "INSERT INTO CustomerDetails (first_name, last_name, email, password_hash, address_line1, address_line2, address_line3, city, state, pincode, country, telephone, role_id, id_proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
       $stmt = $pdo->prepare($sql);
       $stmt->execute([$first_name, $last_name, $email, $password_hash, $address_line1, $address_line2, $address_line3, $city, $state, $pincode, $country, $telephone, $role_id, $id_proof_image_path]);
   } else {
       // Insert without id_proof path
       $sql = "INSERT INTO CustomerDetails (first_name, last_name, email, password_hash, address_line1, address_line2, address_line3, city, state, pincode, country, telephone, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
       $stmt = $pdo->prepare($sql);
       echo $stmt;
       $stmt->execute([$first_name, $last_name, $email, $password_hash, $address_line1, $address_line2, $address_line3, $city, $state, $pincode, $country, $telephone, $role_id]);
   }


   send_response('success', 'User registered successfully');
} catch (PDOException $e) {
   send_response('error', 'Database error: ' . $e->getMessage());
}
?>


