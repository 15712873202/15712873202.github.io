<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM my_destination";
$result = mysqli_query($conn,$sql);

$output = [];
while(true){
    $row = mysqli_fetch_assoc($result);
    if(!$row){
        break;
    }
    $output[] = $row;
}

echo json_encode($output);
?>