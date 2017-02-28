<?php
header('Content-Type:application/json');

$hid = $_REQUEST['hid'];
$order_time = time()*1000;
$orderNum = rand(1000000000,10000000000);

$output = [];

if(empty($hid))
{
    echo '[]';
    return;
}

$conn = mysqli_connect('127.0.0.1','root','','miyou');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql="SELECT * from my_order WHERE hid='$hid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//若订单表中已有该商品记录，则执行更新，购买数量+1
if($row){
    $count=intval($row["count"])+1;
    $sql="UPDATE my_order SET count='$count',order_time='$order_time' WHERE hid='$hid'";
    $result=mysqli_query($conn,$sql);
}else{
    //SQL5：若订单表中没有该商品记录，则执行插入，购物数量为1
    $sql = "INSERT INTO my_order VALUES(NULL,'$orderNum','$order_time',1,'$hid')";
    $result = mysqli_query($conn,$sql);
}

$arr = [];
if($result)
{
    $arr['oid'] = mysqli_insert_id($conn);
    $arr['msg'] = 'succ';
}
else
{
    $arr['msg'] = 'error';
    $arr['reason'] = '插入数据失败';
}

$output[] = $arr;
echo json_encode($order_time);