<?php
header('Content-Type: application/json;charset=UTF-8');
@$uname = $_REQUEST['uname'];
@$pid=$_REQUEST['pid'];
$count=$_REQUEST['count'];
if(!$uname||!$pid){
	echo "{}";
	return;
}
////////////
$output=[
	'msg'=>'ok',
	'uid'=>0,
	'cid'=>0,
	'pid'=>intval($pid),
	'count'=>0
];

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
$output['uid']=$uid;
//echo $uid;

//SQL2：根据用户编号查找购物车编号 
$sql = "SELECT cid FROM tbt_cart WHERE userId='$uid'";
//echo $sql;
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
	$cid=$row["cid"];
}else{
	//SQL3：若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号   
	$sql="insert into tbt_cart values(null,'$uid')";
	$result=mysqli_query($conn,$sql);
	$cid=mysqli_insert_id($conn);
}
$cid=intval($cid);
$output['cid']=$cid;

//SQL4：根据购物车编号和产品编号，到详情表查询是否有该记录 
$sql = "SELECT * FROM tbt_cart_detail WHERE cartId='$cid' and productId='$pid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

//SQL6：若详情表中已有该商品记录，则执行更新，购买数量+$count
if($row){
	$count=intval($row["count"])+$count;
	$sql="UPDATE tbt_cart_detail SET count='$count' WHERE cartId='$cid' and productId='$pid'";
	$result=mysqli_query($conn,$sql);
}else{
	//SQL5：若详情表中没有该商品记录，则执行插入，购物数量为$count
	$sql="insert into tbt_cart_detail values(null,'$cid','$pid',$count,0)";
	mysqli_query($conn,$sql);
}
$output['count']=$count;
echo json_encode($output);

