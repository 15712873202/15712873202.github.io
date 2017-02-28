<?php
/**
*接收客户端提交的用户名，查询出该用户所有的订单，
*以JSON格式返回给客户端
*/
header('Content-Type: application/json;charset=UTF-8');

//接收并处理客户端提交的请求数据
$uname = $_REQUEST['uname'];

include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM tbt_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];

//SQL3: 根据用户编号查询其对应的订单
$sql = "SELECT * FROM tbt_order WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
$orderList = mysqli_fetch_all($result,MYSQLI_ASSOC);

//遍历每个订单对象，添加一个新的属性:productList
foreach($orderList as $i=>$o){
  //$o['productList'] = []; //订单的产品列表是个数组
  //$o是每个元素的副本，不是元素本身
  //$orderList[$i]['productList'] = [];
  //根据当前订单编号查询出它所购买的产品
  $oid = $orderList[$i]['oid'];
  $sql = "SELECT tid,tname,tpic FROM tbt_product WHERE tid IN (SELECT productId FROM tbt_order_detail WHERE orderId='$oid')";
  $result = mysqli_query($conn,$sql);
  $plist = mysqli_fetch_all($result,MYSQLI_ASSOC);//查得订单对应的产品列表
  $orderList[$i]['productList'] = $plist;
}

//把PHP数组编码为JSON字符串，输出给客户端
echo json_encode($orderList);
