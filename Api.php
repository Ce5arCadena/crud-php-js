<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}

include_once "./Operations.php";
header('Content-Type: application/json');

// Instancia de la clase que nos permite guardar, actualizar, eliminar, etc...
$operations = new Operations();

// Obtiene un solo usuario y lo retorna
if (isset($_GET['id']) && !isset($_GET['action'])) {
    $user = $operations->getById($_GET['id']);
    if ($user) {
        echo $user;
        exit;
    }
}

// Permite eliminar un usuario
if (isset($_GET['id']) && isset($_GET['action'])) { 
    $deleteUser = $operations->delete($_GET['id']);
    if ($deleteUser) {
        echo $deleteUser;
        exit;
    }
}

// Permite guardar o actualizar
if ($_POST) {
    if (isset($_POST['id']) && $_POST['id'] === "") {
        $saveUser = $operations->save($_POST);
        if ($saveUser) {
            echo $saveUser;
            exit;
        }
    } elseif (isset($_POST['id']) && $_POST['id'] !== "") {
        $updateUser = $operations->update($_POST);
        if ($updateUser) {
            echo $updateUser;
            exit;
        }
    }
}
?>