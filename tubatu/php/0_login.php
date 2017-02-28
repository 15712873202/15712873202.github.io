<?php
header('Content-Type: text/plain;charset=UTF-8');
/*接收客户端提交的登录用户名及密码*/
$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];
//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT uid FROM tbt_user WHERE uname='$uname' and upwd='$upwd'";
$result = mysqli_query($conn,$sql);
if($result===false){
	echo 'sqlerr';
}else{
	$row=mysqli_fetch_assoc($result);
	if($row){
		echo 'succ';
	}else{
		echo 'fail';
	}
}
