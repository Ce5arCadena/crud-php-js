<?php
if (isset($_POST)) {
    session_start();
    $_SESSION['user'] = $_POST['user'];
    header('Content-Type: application/json');
    $_POST['ok'] = true;
    echo json_encode($_POST);
    exit;
} else {
    echo false;
}
