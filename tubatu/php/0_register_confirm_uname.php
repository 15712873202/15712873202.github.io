<?php
header('Content-Type: text/plain;charset=UTF-8');
$uname=$_REQUEST['uname'];

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM tbt_user where uname='$uname'";
$result = mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
    echo 'succ';
}else{
    echo 'err';
}