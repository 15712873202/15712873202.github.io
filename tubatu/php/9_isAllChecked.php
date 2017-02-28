<?php
header('Content-Type: text/plain;charset=UTF-8');
$ischecked=$_REQUEST['ischecked'];
$uname=$_REQUEST['uname'];

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL1：根据用户名查找用户编号
$sql = "SELECT uid FROM tbt_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$uid=intval($row["uid"]);

//SQL2：根据用户编号查找购物车编号
$sql = "SELECT cid FROM tbt_cart WHERE userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$cid=intval($row["cid"]);

$sql="UPDATE tbt_cart_detail SET ischecked='$ischecked' where cartId='$cid'";
$result=mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else{
	echo 'fail';
}

