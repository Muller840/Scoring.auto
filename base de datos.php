<?php
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "phpmyadmin";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$ciCliente = $_POST['ciCliente'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$salario = $_POST['salario'];
$estadoCivil = $_POST['estadoCivil'];
$nombreConyuge = $_POST['nombreConyuge'];
$salarioConyuge = $_POST['salarioConyuge'];

// Insertar datos en la base de datos
$sql = "INSERT INTO clientes (ci_cliente, nombre, apellido, email, telefono, salario, estado_civil, nombre_conyuge, salario_conyuge) VALUES ('$ciCliente', '$nombre', '$apellido', '$email', '$telefono', '$salario', '$estadoCivil', '$nombreConyuge', '$salarioConyuge')";

if ($conn->query($sql) === TRUE) {
    echo "Cliente registrado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
