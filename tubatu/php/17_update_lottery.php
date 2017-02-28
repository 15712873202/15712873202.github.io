<?php
/**
*接收客户端提交的用户名，
*返回该用户的抽奖统计情况，
*形如：
    {
       "uname":"qiangdong",
       "uid":1,
       "totalCount":39,
       "usedCount": 3,
       "leftCount":36
    }
**/
header('Content-Type: text/plain;charset=UTF-8');
$uname = $_REQUEST['uname'];
$level=$_REQUEST['level'];
$lotteryTime=time()*1000;   //服务器端当前系统时间

include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM tbt_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];
$output['uid'] = $uid;

//SQL3: 根据用户编号，查询其所下所有订单的总金额
$sql = "INSERT INTO tbt_lottery VALUES(NULL,$uid,$lotteryTime,$level)";
$result = mysqli_query($conn,$sql);
if($result){
    echo 'succ';
}else{
    echo 'err';
}





