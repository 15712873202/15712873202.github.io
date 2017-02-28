<?php
header('Content-Type: application/json;charset=UTF-8');
$uname = $_REQUEST['uname'];



//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2：根据用户编号查找购物车编号
$sql = "select * from tbt_address where username='$uname'";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);


