<?php
    include_once "./Conexion.php";

    class Operations {
        private $conn = null;
        public function __construct() {
            $db = new Conexion();
            $this->conn = $db->connectDb();
        }

        public function getAll() {
            $query = "SELECT * FROM usuarios";
            $result = $this->conn->prepare($query);
            $result->execute();

            return $result->fetchAll();
        }

        public function save($data) {
            $query = "INSERT INTO usuarios (nombre, apellido, genero, fecha) VALUES (:nombre, :apellido, :genero, :fecha)";
            $result = $this->conn->prepare($query);
            $resultQuery = $result->execute([
                ":nombre" => $data['nombre'],
                ":apellido" => $data['apellido'],
                ":genero" => $data['genero'],
                ":fecha" => date('Y-m-d')
            ]);

            if ($resultQuery) {
                $id = $this->conn->lastInsertId();
                return json_encode(["id" => $id, "nombre" => $data['nombre'], "apellido" => $data['apellido'], "genero" => $data['genero']]);
            };

            return false;
        }

        public function getById($id) {
            $query = "SELECT * FROM usuarios WHERE id=:id";
            $result = $this->conn->prepare($query);
            $result->bindParam(":id", $id);
            $result->execute();
            return json_encode($result->fetch(PDO::FETCH_ASSOC));
        }

        public function update($data) {
            $query = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, genero=:genero, fecha=:fecha WHERE id=:id";
            $result = $this->conn->prepare($query);
            $resultQuery = $result->execute([
                ":nombre" => $data['nombre'],
                ":apellido" => $data['apellido'],
                ":genero" => $data['genero'],
                ":fecha" => date('Y-m-d'),
                ":id" => $data['id']
            ]);

            if ($resultQuery) {
                return json_encode(["id" => $data['id'], "nombre" => $data['nombre'], "apellido" => $data['apellido'], "genero" => $data['genero'], "fecha" => date('Y-m-d')]);
            }
            return false;
        }

        public function delete($id) {
            $query = "DELETE FROM usuarios WHERE id=:id";
            $result = $this->conn->prepare($query);
            $result->bindParam(":id", $id);

            if($result->execute()) {
                return json_encode(["id" => $id]);
            }

            return false;
        }
    }
?>