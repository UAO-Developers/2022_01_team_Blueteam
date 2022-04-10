<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


$message = "Running Upload.php";
echo "<script type='text/javascript'>alert('$message');</script>";
if($_FILES["file"]["name"] != '')
{
    $test = explode('.', $_FILES["file"]["name"]);
    $ext = end($test);
    $name = rand(100, 999) . '.' . $ext;
    $location = '../assets/img/collection/events/' . $name;
    move_uploaded_file($_FILES["file"]["tmp_name"], $location);
    echo '<img src="'.$location.'" height="150" width="225" class="img-thumbnail" />';
}
?>