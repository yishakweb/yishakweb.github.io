<?php
session_start();
if(!isset($_SESSION['account'])){
    header("Location: login.php");
    exit();
}

include 'db.php';

// Initialize variables for edit
$edit_id = "";
$edit_bld = "";
$edit_type = "";
$update = false;

// DELETE room
if(isset($_GET['delete'])){
    $del_id = $_GET['delete'];
    $conn->query("DELETE FROM room_table WHERE room_id='$del_id'");
    header("Location: room.php");
    exit();
}

// LOAD room data for EDIT
if(isset($_GET['edit'])){
    $edit_id = $_GET['edit'];
    $update = true;
    $res = $conn->query("SELECT * FROM room_table WHERE room_id='$edit_id'");
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();
        $edit_bld = $row['bld_num'];
        $edit_type = $row['room_type'];
    }
}

// INSERT new room
if(isset($_POST['save'])){
    $id = $_POST['room_id'];
    $bld = $_POST['bld_num'];
    $type = $_POST['room_type'];

    $sql = "INSERT INTO room_table (room_id, bld_num, room_type) VALUES ('$id','$bld','$type')";
    $conn->query($sql);
}

// UPDATE room
if(isset($_POST['update'])){
    $id = $_POST['room_id'];
    $bld = $_POST['bld_num'];
    $type = $_POST['room_type'];

    $conn->query("UPDATE room_table SET bld_num='$bld', room_type='$type' WHERE room_id='$id'");
    header("Location: room.php");
    exit();
}

// FETCH all rooms
$result = $conn->query("SELECT * FROM room_table ORDER BY room_id ASC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Room Registration</title>
    <link rel="stylesheet" href="style.css">
    <style>
        form input[type=text], input[type=submit] {
            width: 300px;
            padding: 6px;
            margin: 5px 0;
        }

        input[type=submit] {
            width: 150px;
        }

        table {
            width: 70%;
            margin: 20px auto;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        a {
            text-decoration: none;
            color: blue;
            margin: 0 5px;
        }
    </style>
</head>
<body>

<h1 style="text-align:center;">Room Registration</h1>

<!-- Room Form -->
<form method="post" style="text-align:center;">
    Room ID:<br>
    <input type="text" name="room_id" value="<?php echo $edit_id; ?>" <?php echo $update ? 'readonly' : ''; ?> required><br>
    Building Number:<br>
    <input type="text" name="bld_num" value="<?php echo $edit_bld; ?>" required><br>
    Room Type:<br>
    <input type="text" name="room_type" value="<?php echo $edit_type; ?>" required><br><br>

    <?php if($update): ?>
        <input type="submit" name="update" value="Update">
    <?php else: ?>
        <input type="submit" name="save" value="Add Room">
    <?php endif; ?>
</form>

<br>
<div style="text-align:center;">
    <a href="index.php">Back to Home</a>
</div>

<h2 style="text-align:center;">All Registered Rooms</h2>

<table>
    <tr>
        <th>Room ID</th>
        <th>Bld_num</th>
        <th>Room type</th>
        <th>Action</th>
    </tr>

    <?php
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            echo "<tr>
                    <td>".$row['room_id']."</td>
                    <td>".$row['bld_num']."</td>
                    <td>".$row['room_type']."</td>
                    <td>
                        <a href='room.php?edit=".$row['room_id']."'>Update</a> | 
                        <a href='room.php?delete=".$row['room_id']."' onclick=\"return confirm('Are you sure?')\">Delete</a>
                    </td>
                  </tr>";
        }
    } else {
        echo "<tr><td colspan='4'>No rooms found.</td></tr>";
    }
    ?>
</table>

</body>
</html>