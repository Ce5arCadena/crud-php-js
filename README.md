# 🧮 CRUD Simple con PHP, MySQL y JavaScript

Este proyecto es una aplicación web básica que permite **Crear, Leer, Actualizar y Eliminar (CRUD)** registros en una base de datos MySQL usando PHP como backend y JavaScript para mejorar la interacción en el frontend.

---

## 🧰 Tecnologías usadas

- PHP (versión 7.4 o superior)
- MySQL
- HTML5, CSS3
- JavaScript (Vanilla)
- Bootstrap

## ⚙️ Configuración del entorno

Deberias clonar el repo, y usarlo (nada del otro mundo) en mi caso, use Xampp, y lo puse dentro de la carpeta htdocs
- Configura la bd: Crea una base de datos MySQL llamada eventos y una tabla usuarios.
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `genero` varchar(5) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

## 🧰 Importante edites el archivo Conexion.php con los datos de tu conexion
## 🧰 Por último ejecuta el proyecto
