<?php
header('Content-Type:application/json');
$output = [];

$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT my_hot.hid,orderNum,count,oid,order_time,title,price,pic FROM my_hot,my_order WHERE my_hot.hid = my_order.hid ORDER BY order_time";
$result = mysqli_query($conn,$sql);

while(true){
    $row = mysqli_fetch_assoc($result);
    if(!$row){
        break;
    }
    $output[] = $row;
}

echo json_encode($output);
?>