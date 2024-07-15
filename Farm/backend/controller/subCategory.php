<?php

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
include '../db/Connection.php';

try {
    $objDb = new DbConnect();
    $pdo = $objDb->connect();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Function to send a JSON response
function send_response($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit();
}

// Function to handle file upload
function handle_file_upload($file) {
    $target_dir = "/home/dckap/Documents/Aizen/Farm/frontend/src/assets/images/";
    $target_file = $target_dir . basename($file["name"]);
    $upload_ok = 1;
    $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file is an actual image
    $check = getimagesize($file["tmp_name"]);
    if ($check === false) {
        send_response('error', "File is not an image.");
        $upload_ok = 0;
    }

    // Check file size (example: 5MB limit)
    if ($file["size"] > 5000000) {
        send_response('error', "Sorry, your file is too large.");
        $upload_ok = 0;
    }

    // Allow certain file formats
    if (!in_array($image_file_type, ['jpg', 'jpeg', 'png', 'gif'])) {
        send_response('error', "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
        $upload_ok = 0;
    }

    if ($upload_ok == 0) {
        send_response('error', "Sorry, your file was not uploaded.");
    } else {
        if (move_uploaded_file($file["tmp_name"], $target_file)) {
            return $target_file;
        } else {
            send_response('error', "Sorry, there was an error uploading your file.");
        }
    }
}

// Check for required fields in POST data
$required_fields = ['category_name', 'subCategory_name', 'description', 'status', 'is_popular'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        send_response('error', "The field '$field' is required.");
    }
}

// Extract data
$category_name = $_POST['category_name'];
$subCategory_name = $_POST['subCategory_name'];
$description = $_POST['description'];
$status = $_POST['status'];
$is_popular = $_POST['is_popular'];

// Handle file upload
if (!empty($_FILES['image']['name'])) {
    $image = handle_file_upload($_FILES['image']);
} else {
    $image = ''; // Handle if no image is uploaded
}

try {
    // Fetch the category ID based on the category name
    $stmt = $pdo->prepare("SELECT category_id FROM Category WHERE category_name = ?");
    $stmt->execute([$category_name]);
    $category = $stmt->fetch();

    if (!$category) {
        send_response('error', 'Category not found');
    }

    $category_id = $category['category_id'];

    // Insert or update the subcategory into the Subcategory table
    $stmt = $pdo->prepare("INSERT INTO Subcategory (category_id, variant_name, description, image, status, is_popular) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$category_id, $subCategory_name, $description, $image, $status, $is_popular]);

    // Return success response
    send_response('success', 'Subcategory added/updated successfully');
} catch (PDOException $e) {
    send_response('error', 'Database error: ' . $e->getMessage());
}
?>
