<?php
    $user = null;
    if (isset($_GET['id'])) {
        include_once "./Operations.php";
    
        $operations = new Operations();
        $user = $operations->getById($_GET['id']);
        if (!$user) {
            header('Location: index.php');
        }
    }
?>

<section class="z-3 position-absolute top-0 start-0 w-100 height-modal modal-create d-none">
    <div class="row w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="col-4 bg-body-secondary p-2 rounded">
            <button class="btn-close" aria-label="Close"></button>
            <form class="p-2" id="form-create" method="post">
                <input type="hidden" value="<?php echo isset($_GET['id']) ? $_GET['id'] : "" ?>" name="id">
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="name" name="nombre" aria-describedby="nameHelp" placeholder="Digita el nombre">
                    <div id="nameHelp" class="form-text d-none"></div>
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="lastName" name="apellido" aria-describedby="lastNameHelp" placeholder="Digita el apellido">
                    <div id="lastNameHelp" class="form-text d-none"></div>
                </div>
                <div class="mb-3">
                    <Label>Género</Label>
                    <div class="form-check">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="genero" 
                            value="M" 
                            id="radioDefault1"
                        >
                        <label class="form-check-label" for="radioDefault1">
                            Hombre
                        </label>
                    </div>
                    <div class="form-check">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="genero" 
                            value="F" 
                            id="radioDefault2"
                        >
                        <label class="form-check-label" for="radioDefault2">
                            Mujer
                        </label>
                    </div>
                    <div id="genderHelp" class="form-text d-none"></div>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
        </div>
    </div>
</section>