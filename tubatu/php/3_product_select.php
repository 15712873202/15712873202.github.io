<?php
header('Content-Type: application/json;charset=UTF-8');
$tstyle=$_REQUEST['tstyle'];
$rank=$_REQUEST['rank'];
$pageNum=$_REQUEST['pageNum'];
$pager=[
	'recordCount'=>0,   //总记录数
	'pageSize'=>8,		//页面大小
	'pageCount'=>0,		//总页数
	'pageNum'=>intval($pageNum),//当前页号
	'data'=>null
];

//连接数据库
//包含指定文件的内容在当前位置
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT COUNT(*) FROM tbt_product where tstyle='$tstyle'";
$result = mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['COUNT(*)']);
$pager['pageCount']=ceil(($pager['recordCount'])/($pager['pageSize']));
$start=($pager['pageNum']-1)*$pager['pageSize'];
$count=$pager['pageSize'];
$sql = "SELECT * FROM tbt_product where tstyle='$tstyle' ORDER BY $rank LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$pager['data'] = mysqli_fetch_all($result,MYSQLI_ASSOC);
////以JSON格式向客户端输出
echo json_encode($pager);