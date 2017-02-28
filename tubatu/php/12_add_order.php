<?php
header('Content-Type: application/json;charset=UTF-8');
$uname = $_REQUEST['uname'];
$payment = $_REQUEST['payment'];
$price = $_REQUEST['price'];
$orderTime = time()*1000;   //服务器端当前系统时间
$status = 1;    //刚生成的订单状态都是'等待付款'
$orderNum = rand(1000000000,10000000000); //10位的随机数
$productList=$_REQUEST['productList'];
$productList = json_decode($productList); //把JSON字符串解码为PHP对象数组


//连接数据库
//SQL1：包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);


//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM tbt_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];


//SQL3: 向订单表插入一行记录，得到自增的订单编号
$sql = "INSERT INTO tbt_order VALUES(NULL,'$orderNum','$price','$payment','$orderTime','$status','$uid')";
$result = mysqli_query($conn,$sql);
$oid = mysqli_insert_id($conn);

//SQL4: 循环执行：向订单详情表中插入记录
//foreach((array)$productList as $p){
   foreach($productList as $p){
     $pid = $p->productId;  //获取PHP对象的属性：->
     $count = $p->count;
     $sql = "INSERT INTO tbt_order_detail VALUES(NULL,'$oid','$pid','$count')";
     mysqli_query($conn,$sql);
   }



//创建要输出给客户端的数据
$output = [];
if($oid){       //执行成功
    $output['msg'] = 'succ';
    $output['oid'] = $oid;
    $output['orderNum'] = $orderNum;
}else {         //执行失败
    $output['msg'] = 'err';
}

//把数据编码为JSON字符串
echo json_encode($output);

































