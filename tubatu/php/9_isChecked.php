<?php
//(8)创建cart_add.php，接收客户端提交的用户名和产品编号，把相关信息保存入需要的表——实现比较复杂，挑战一下！ 
header('Content-Type: text/plain;charset=UTF-8');
$uname=$_REQUEST['uname'];
$did=$_REQUEST['did'];
$ischecked=$_REQUEST['ischecked'];


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

$did=intval($did);
$sql="UPDATE tbt_cart_detail SET ischecked='$ischecked' WHERE did='$did' and cartId='$cid'";
$result=mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else{
	echo 'fail';
}

