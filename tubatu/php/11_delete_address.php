<?php
header('Content-Type: text/plain;charset=UTF-8');
//$rcvName = $_REQUEST['rcvName'];
//$username = $_REQUEST['username'];
//$telphone=$_REQUEST['telphone'];
//$address=$_REQUEST['address'];
//$provs=$_REQUEST['provs'];
//$cities=$_REQUEST['cities'];
$aid=$_REQUEST['aid'];

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2：根据用户编号查找购物车编号
//$sql = "delete from tbt_address WHERE provs='$provs' and cities='$cities' and rcvName='$rcvName' and telphone='$telphone' and address='$address' and username='$username'";
//echo $sql;
$sql = "delete from tbt_address WHERE aid='$aid'";
$result=mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else{
	echo 'err';
}


