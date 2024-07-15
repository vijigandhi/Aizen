<?php

// Adjust the path to vendor/autoload.php based on your structure
require_once '../../frontend/vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = 'Aizen';

function generateJWT($user_id) {
    global $key;
    $payload = array(
        "iss" => "localhost",
        "aud" => "localhost",
        "iat" => time(),
        "exp" => time() + 3600,
        "data" => array(
            "id" => $user_id
        )
    );

    return JWT::encode($payload, $key, 'HS256');
}

function validateJWT($jwt) {
    global $key;
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        return $decoded->data->id;
    } catch (Exception $e) {
        return false;
    }
}

function authenticate() {
    global $key;
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $jwt = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            return $decoded->data->id;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Access denied. Invalid token."));
            exit();
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Access denied. No token provided."));
        exit();
    }
}
?>
