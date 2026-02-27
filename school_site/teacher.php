<?php
// START SESSION AND PROTECT PAGE
session_start();
if(!isset($_SESSION['account'])){
    header("Location: login.php");
    exit();
}

include 'db.php';

// Initialize variables for edit
$edit_id = "";
$edit_name = "";
$edit_major = "";
$update = false;

// DELETE teacher
if(isset($_GET['delete'])){
    $del_id = $_GET['delete'];
    $conn->query("DELETE FROM teach_table WHERE t_id='$del_id'");
    header("Location: teacher.php");
    exit();
}

// LOAD teacher data for EDIT
if(isset($_GET['edit'])){
    $edit_id = $_GET['edit'];
    $update = true;
    $res = $conn->query("SELECT * FROM teach_table WHERE t_id='$edit_id'");
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();
        $edit_name = $row['t_name'];
        $edit_major = $row['major'];
    }
}

// INSERT new teacher
if(isset($_POST['save'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $major = $_POST['major'];

    $sql = "INSERT INTO teach_table (t_id, t_name, major)
            VALUES ('$id','$name','$major')";

    if($conn->query($sql) === TRUE){
        echo "<p style='color:green;'>Teacher Registered Successfully!</p>";
    } else {
        echo "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}

// UPDATE teacher
if(isset($_POST['update'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $major = $_POST['major'];

    $conn->query("UPDATE teach_table 
                  SET t_name='$name', major='$major'
                  WHERE t_id='$id'");
    header("Location: teacher.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Teacher Registration</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Teacher Registration</h1>

<form method="post">
    ID: <input type="text" name="id" value="<?php echo $edit_id; ?>" <?php echo $update ? 'readonly' : ''; ?> required><br><br>
    Name: <input type="text" name="name" value="<?php echo $edit_name; ?>" required><br><br>
    Major: <input type="text" name="major" value="<?php echo $edit_major; ?>" required><br><br>

    <?php if($update): ?>
        <input type="submit" name="update" value="Update Teacher">
    <?php else: ?>
        <input type="submit" name="save" value="Register Teacher">
    <?php endif; ?>
</form>

<br>
<a href="index.php">Back to Home</a>
<hr>

<h2>All Registered Teachers</h2>

<?php
// DISPLAY TEACHERS TABLE
$result = $conn->query("SELECT * FROM teach_table");

if($result->num_rows > 0){
    echo "<table border='1' cellpadding='10'>";
    echo "<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Major</th>
            <th>Action</th>
          </tr>";

    while($row = $result->fetch_assoc()){
        echo "<tr>
                <td>".$row['t_id']."</td>
                <td>".$row['t_name']."</td>
                <td>".$row['major']."</td>
                <td>
                    <a href='teacher.php?delete=".$row['t_id']."'
                       onclick=\"return confirm('Are you sure you want to delete this teacher?')\">Delete</a>
                    |
                    <a href='teacher.php?edit=".$row['t_id']."'>Update</a>
                </td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "No teachers found.";
}
?>

</body>
</html>