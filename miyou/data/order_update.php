<?php
header('Content-Type:text/plain');
$hid=$_REQUEST['hid'];
$count=$_REQUEST['count'];
$order_time = time()*1000;
$output = [];

if(empty($hid)){
    echo '[]';
    return;
}

$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "UPDATE my_order SET count='$count',order_time='$order_time' WHERE hid='$hid'";
$result = mysqli_query($conn,$sql);

if($result){
   echo 'succ';
}else{
   echo 'fail';
}