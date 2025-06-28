<?php
    session_start();
    if (!isset($_SESSION['user'])) {
        header('Location: login.php');
        exit;
    }  
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD</title>
    <link rel="stylesheet" href="./assets/css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
</head>
<body>
    <header>
        <div class="d-flex justify-content-center align-items-center gap-3">
            <h1 class="text-center">Bienvenido, <?php echo isset($_SESSION['user']) ? $_SESSION['user'] : "Usuario" ?></h1>
            <button class="btn btn-info btn-logout">Salir</button>
        </div>
    </header>
    <main class="position-relative">
        <section>
            <div class="row d-flex justify-content-center">
                <div class="col-12 col-md-8 mb-2">
                    <button id="btnCreate" class="btn btn-primary">Agregar Usuario</button>
                </div>
                <div class="col-12 col-md-8">
                    <!-- Lista de usuarios -->
                    <?php include_once "List.php"; ?>
                </div>
            </div>
        </section>

        <!-- Modal de Creación -->
        <?php include_once "Create.php"; ?>
    </main>

    <script src="./assets/js/index.js"></script>
    <script src="./assets/js/validateForm.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</body>
</html>