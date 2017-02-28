<?php
header('Content-Type:application/json');

@$hid = $_REQUEST['hid'];
if(empty($hid))
{
    $hid=1;
}

$output = [];

$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT title,pic,price,destination,buyed,hid,subtitle,text1,text2,text3,text4,ptitle,pic1,pic2,pic3,pic4 FROM my_hot,my_detail WHERE hid=$hid and hotId=$hid";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);
}

?>