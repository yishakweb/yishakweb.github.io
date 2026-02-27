<?php
session_start();
include 'db.php';

if(isset($_POST['login'])){
    $account = $_POST['account'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM login WHERE account='$account' AND password='$password'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $_SESSION['account'] = $account; // session created
        header("Location: student.php"); // redirect to student page
        exit();
    } else {
        echo "<p style='color:red;'>Invalid Account!</p>";
    }
}
?>

<h2>Login</h2>
<form method="post">
    Account: <input type="text" name="account" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    <input type="submit" name="login" value="Login">
</form>