<?php
header('Content-Type:text/plain');
$oid=$_REQUEST['oid'];
$output = [];
if(empty($oid)){
    echo '[]';
    return;
}
$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "delete from my_order WHERE oid='$oid'";
$result = mysqli_query($conn,$sql);

if($result){
   echo 'succ';
}else{
   echo 'fail';
}
