<?php
header('Content-Type: application/json;charset=utf8');
//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);


//查找商品表
$sql = "select * from tbt_product where tid>217";
$result = mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);


