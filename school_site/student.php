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
$edit_age = "";
$edit_sex = "";
$edit_year = "";
$update = false;

// DELETE student
if(isset($_GET['delete'])){
    $del_id = $_GET['delete'];
    $conn->query("DELETE FROM stud_table WHERE stud_id='$del_id'");
    header("Location: student.php");
    exit();
}

// LOAD student data for EDIT
if(isset($_GET['edit'])){
    $edit_id = $_GET['edit'];
    $update = true;
    $res = $conn->query("SELECT * FROM stud_table WHERE stud_id='$edit_id'");
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();
        $edit_name = $row['stud_name'];
        $edit_age = $row['age'];
        $edit_sex = $row['sex'];
        $edit_year = $row['year'];
    }
}

// INSERT new student
if(isset($_POST['save'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $sex = $_POST['sex'];
    $year = $_POST['year'];

    $sql = "INSERT INTO stud_table (stud_id, stud_name, age, sex, year)
            VALUES ('$id','$name','$age','$sex','$year')";

    if($conn->query($sql) === TRUE){
        echo "<p style='color:green;'>Student Registered Successfully!</p>";
    } else {
        echo "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}

// UPDATE student
if(isset($_POST['update'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $sex = $_POST['sex'];
    $year = $_POST['year'];

    $conn->query("UPDATE stud_table 
                  SET stud_name='$name', age='$age', sex='$sex', year='$year' 
                  WHERE stud_id='$id'");
    header("Location: student.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Student Registration</h1>

<form method="post">
    ID: <input type="text" name="id" value="<?php echo $edit_id; ?>" <?php echo $update ? 'readonly' : ''; ?> required><br><br>
    Name: <input type="text" name="name" value="<?php echo $edit_name; ?>" required><br><br>
    Age: <input type="number" name="age" value="<?php echo $edit_age; ?>" required><br><br>
    Sex: <input type="text" name="sex" value="<?php echo $edit_sex; ?>" required><br><br>
    Year: <input type="number" name="year" value="<?php echo $edit_year; ?>" required><br><br>

    <?php if($update): ?>
        <input type="submit" name="update" value="Update Student">
    <?php else: ?>
        <input type="submit" name="save" value="Register Student">
    <?php endif; ?>
</form>

<br>
<a href="index.php">Back to Home</a>
<hr>

<h2>All Registered Students</h2>

<?php
// DISPLAY STUDENTS TABLE
$result = $conn->query("SELECT * FROM stud_table");

if($result->num_rows > 0){
    echo "<table border='1' cellpadding='10'>";
    echo "<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Year</th>
            <th>Action</th>
          </tr>";

    while($row = $result->fetch_assoc()){
        echo "<tr>
                <td>".$row['stud_id']."</td>
                <td>".$row['stud_name']."</td>
                <td>".$row['age']."</td>
                <td>".$row['sex']."</td>
                <td>".$row['year']."</td>
                <td>
                    <a href='student.php?delete=".$row['stud_id']."'
                       onclick=\"return confirm('Are you sure you want to delete this student?')\">Delete</a>
                    |
                    <a href='student.php?edit=".$row['stud_id']."'>Update</a>
                </td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "No students found.";
}
?>

</body>
</html>