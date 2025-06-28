<?php
class Conexion {
    private $host = "localhost";
    private $dbName = "eventos";
    private $user = "root";
    private $password = "";

    public function connectDb() {
        try {
            return new PDO("mysql:host=".$this->host.";dbname=".$this->dbName, $this->user, $this->password);
        } catch (PDOException $e) {
            print "Error en BD: ". $e->getMessage() ."<br/>";
        }
    }
}
?>