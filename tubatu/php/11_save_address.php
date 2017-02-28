<?php
header('Content-Type: text/plain;charset=UTF-8');
$rcvName = $_REQUEST['rcvName'];
$username = $_REQUEST['username'];
$telphone=$_REQUEST['telphone'];
$address=$_REQUEST['address'];
$provs=$_REQUEST['provs'];
$cities=$_REQUEST['cities'];


//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2：根据用户编号查找购物车编号
$sql = "insert into tbt_address values(null,'$provs','$cities','$rcvName','$telphone','$address','$username')";
//echo $sql;
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
	echo 'succ';
}else{
	echo 'err';
}


