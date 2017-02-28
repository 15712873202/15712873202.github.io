<?php
header('Content-Type: application/json;charset=utf8');
$uname = $_REQUEST['uname'];
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

//SQL2：根据购物车编号查找购物详情 
$sql = "select did,cartId,productId,count,tname,tprice,tpic from tbt_cart_detail,tbt_product where cartId='$cid' and tbt_cart_detail.productId=tbt_product.tid";
$result = mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);


