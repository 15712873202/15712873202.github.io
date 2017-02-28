<?php
header('Content-Type: application/json;charset=UTF-8');

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM tbt_slider";
$result = mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
////以JSON格式向客户端输出
echo json_encode($list);