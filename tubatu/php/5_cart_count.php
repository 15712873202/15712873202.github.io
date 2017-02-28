<?php
header('Content-Type: text/plain;charset=UTF-8');
$uname = $_REQUEST['uname'];
if(!$uname){
	$count=0;
	echo $count;
	return;
}

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
if($row){
	$cid=$row["cid"];
	$cid=intval($cid);
	//SQL4：根据购物车编号和产品编号，到详情表查询是否有该记录
   $sql = "SELECT sum(count) AS c FROM tbt_cart_detail WHERE cartId='$cid'";
   $result=mysqli_query($conn,$sql);
   $count=mysqli_fetch_assoc($result)['c'];
}else{
	$count=0;
}

echo $count;

