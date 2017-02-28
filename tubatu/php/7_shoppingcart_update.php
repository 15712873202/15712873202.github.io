<?php
header('Content-Type: text/plain;charset=utf8');
$did = $_REQUEST['did'];
$count = $_REQUEST['count'];
//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL1：根据购物车详情记录编号更新购买数量count
$sql = "UPDATE tbt_cart_detail SET count='$count' WHERE did='$did'";
$result = mysqli_query($conn,$sql);
//$row=mysqli_fetch_assoc($result);
if($result){
	echo 'succ';
}else{
	echo 'err';
}