<?php
header('Content-Type:application/json;charset=utf-8');
//处理登录操作
@$uname=$_REQUEST['uname'];
@$upwd=$_REQUEST['upwd'];

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="INSERT INTO tbt_user VALUES(NULL,'$uname','$upwd')";
$result=mysqli_query($conn,$sql);

//创建要输出给客户端的数据
$output=[];
if($result){
	$output['msg']='succ';
	$output['uid']=mysqli_insert_id($conn);
}else{
	$output['msg']='err';
	$output['sql']=$sql;
}

echo json_encode($output);