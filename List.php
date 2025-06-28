<?php
    include_once "./Operations.php";

    $operations = new Operations();
    $list = $operations->getAll();
?>

<?php if(count($list) > 0) : ?>
    <table class="table table-striped table-hover table-users">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Género</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($list as $value): ?>
                <tr id-user="<?php echo $value['id'] ?>">
                    <th scope="row"> <?php echo $value['id'] ?> </th>
                    <td><?php echo $value['nombre'] ?></td>
                    <td><?php echo $value['apellido'] ?></td>
                    <td><?php echo $value['genero'] ?></td>
                    <td><?php echo $value['fecha'] ?></td>
                    <td>
                        <button 
                        data-id="<?php echo $value['id'] ?>" 
                        class="btn btn-danger btn-edit">
                            Editar
                        </button>
                        <button
                            data-id="<?php echo $value['id'] ?>"  
                            class="btn btn-warning btn-delete"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            <?php endforeach ?> 
        </tbody>
    </table>
<?php else: ?>
    <p>No hay usuarios registrados</p>
<?php endif ?>

