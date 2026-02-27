<?php
session_start();
if(!isset($_SESSION['account'])){
    header("Location: login.php");
    exit();
}

include 'db.php';

// Initialize variables
$edit_id = "";
$edit_name = "";
$edit_dept = "";
$update = false;

// ===== DELETE course =====
if(isset($_GET['delete'])){
    $del_id = $_GET['delete'];
    $conn->query("DELETE FROM course_table WHERE co_id='$del_id'");
    header("Location: course.php");
    exit();
}

// ===== LOAD course for EDIT =====
if(isset($_GET['edit'])){
    $edit_id = $_GET['edit'];
    $update = true;
    $res = $conn->query("SELECT * FROM course_table WHERE co_id='$edit_id'");
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();
        $edit_name = $row['co_name'];
        $edit_dept = $row['department'];
    }
}

// ===== INSERT =====
if(isset($_POST['save'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $dept = $_POST['department'];

    $sql = "INSERT INTO course_table (co_id, co_name, department) VALUES ('$id','$name','$dept')";
    if($conn->query($sql) === TRUE){
        $msg = "<p class='success'>Course Registered Successfully!</p>";
    } else {
        $msg = "<p class='error'>Error: " . $conn->error . "</p>";
    }
}

// ===== UPDATE =====
if(isset($_POST['update'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $dept = $_POST['department'];

    $conn->query("UPDATE course_table SET co_name='$name', department='$dept' WHERE co_id='$id'");
    header("Location: course.php");
    exit();
}

// ===== FETCH =====
$result = $conn->query("SELECT * FROM course_table");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Course Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 20px;
        }

        h1, h2 {
            text-align: center;
            color: #333;
        }

        form {
            width: 400px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        input[type=text], input[type=submit] {
            width: 100%;
            padding: 8px;
            margin: 8px 0;
            box-sizing: border-box;
        }

        input[type=submit] {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
        }

        input[type=submit]:hover {
            background-color: #45a049;
        }

        a.button {
            padding: 5px 12px;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            margin: 0 2px;
            display: inline-block;
        }

        a.update {
            background-color: orange;
        }

        a.update:hover {
            background-color: darkorange;
        }

        a.delete {
            background-color: red;
        }

        a.delete:hover {
            background-color: darkred;
        }

        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: center;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {background-color: #f2f2f2;}

        .success {
            text-align: center;
            color: green;
            font-weight: bold;
        }

        .error {
            text-align: center;
            color: red;
            font-weight: bold;
        }

        .back-home {
            display: block;
            width: 120px;
            margin: 0 auto;
            text-align: center;
            padding: 8px 0;
            background-color: #2196F3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .back-home:hover {
            background-color: #0b7dda;
        }
    </style>
</head>
<body>

<h1>Course Registration</h1>

<?php if(isset($msg)) echo $msg; ?>

<form method="post">
    <label>ID:</label>
    <input type="text" name="id" value="<?php echo $edit_id; ?>" <?php echo $update ? 'readonly' : ''; ?> required>

    <label>Name:</label>
    <input type="text" name="name" value="<?php echo $edit_name; ?>" required>

    <label>Department:</label>
    <input type="text" name="department" value="<?php echo $edit_dept; ?>" required>

    <?php if($update): ?>
        <input type="submit" name="update" value="Update Course">
    <?php else: ?>
        <input type="submit" name="save" value="Register Course">
    <?php endif; ?>
</form>

<a href="index.php" class="back-home">Back to Home</a>

<h2>All Registered Courses</h2>

<?php
if($result->num_rows > 0){
    echo "<table>";
    echo "<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>";

    while($row = $result->fetch_assoc()){
        echo "<tr>
                <td>".$row['co_id']."</td>
                <td>".$row['co_name']."</td>
                <td>".$row['department']."</td>
                <td>
                    <a href='course.php?edit=".$row['co_id']."' class='button update'>Update</a>
                    <a href='course.php?delete=".$row['co_id']."' class='button delete' onclick=\"return confirm('Are you sure?')\">Delete</a>
                </td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "<p style='text-align:center;'>No courses found.</p>";
}
?>

</body>
</html>