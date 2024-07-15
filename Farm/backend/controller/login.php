<?php

header('Content-Type: application/json');

include_once '../model/Connection.php'; // Adjust path as per your file structure

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$response = [];

if ($email && $password) {
    $dbConnect = new DbConnect();
    $conn = $dbConnect->connect();

    if ($conn) {
        $stmt = $conn->prepare("SELECT * FROM CustomerDetails WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password_hash'])) {
                $response['status'] = 'success';
                $response['message'] = 'Login successful';
                // Set session or token as needed
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Invalid password';
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'User not found';
        }

        $conn = null;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Database connection failed';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'All fields are required';
}

echo json_encode($response);





// header('Content-Type: application/json');

// include_once '../model/Connection.php'; // Adjust path as per your file structure
// require '../controller/authentication.php'; // Include the authentication file

// $data = json_decode(file_get_contents('php://input'), true);

// $email = $data['email'] ?? '';
// $password = $data['password'] ?? '';

// $response = [];

// if ($email && $password) {
//     $dbConnect = new DbConnect();
//     $conn = $dbConnect->connect();

//     if ($conn) {
//         $stmt = $conn->prepare("SELECT * FROM CustomerDetails WHERE email = :email");
//         $stmt->bindParam(':email', $email);
//         $stmt->execute();
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($user) {
//             if (password_verify($password, $user['password_hash'])) {
//                 $user_id = $user['customer_id']; // Assuming the user's ID is stored in the 'id' column
//                 $jwt = generateJWT($user_id); // Generate the JWT token

//                 $response['status'] = 'success';
//                 $response['message'] = 'Login successful';
//                 $response['token'] = $jwt; // Include the generated token in the response
//             } else {
//                 $response['status'] = 'error';
//                 $response['message'] = 'Invalid password';
//             }
//         } else {
//             $response['status'] = 'error';
//             $response['message'] = 'User not found';
//         }

//         $conn = null;
//     } else {
//         $response['status'] = 'error';
//         $response['message'] = 'Database connection failed';
//     }
// } else {
//     $response['status'] = 'error';
//     $response['message'] = 'All fields are required';
// }

// echo json_encode($response);
?>
