<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users_db";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Добавление нового пользователя (если запрос POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $age = $_POST['age'];

  $sql = "INSERT INTO users (name, email, age) VALUES ('$name', '$email', '$age')";

  if ($conn->query($sql) === TRUE) {
    echo "Новый пользователь добавлен";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

// Отображение всех пользователей
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // вывод каждой строки в таблице результатов
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. " - Age: " . $row["age"]. "<br>";
  }
} else {
  echo "0 results";
}

$conn->close();
?>