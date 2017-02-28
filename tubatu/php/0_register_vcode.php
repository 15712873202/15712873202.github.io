<?php
session_start();
/**向客户端输出一个内容随机的验证码图片**/
//header('Content-Type:text/plain');
header('Content-Type:image/png');
header('Cache-Control: no-cache');
header('Pragma: no-cache');

//制定绘制的宽度和高度
$w = 90;
$h = 30;
//在服务器端内存中创建一张图片
$img = imagecreatetruecolor($w, $h);

//为图片绘制随机背景颜色
$c = imagecolorallocate( $img,rand(180,230), rand(180,230), rand(180,230));
//为背景颜色随机填充颜色
imagefilledrectangle($img, 0, 0, $w, $h, $c);

$str='';
//在图片上绘制随机的文字
$src = 'abcdefghjkmnrstwy23456789';
for($i=0; $i<4; $i++){
	//随机挑选任意个字符
	$txt = $src[rand(0,strlen($src)-1)];
	$str.=$txt;
	$c = imagecolorallocate( $img,rand(20,80), rand(20,80), rand(20,80));
	imagestring($img, rand(10,18), $i*20+10, rand(0,$h-15),$txt, $c);
}
$_SESSION['authcode']=$str;
//在图片上加入干扰点
for($i=0;$i<200;$i++){
	$c=imagecolorallocate($img,rand(220,255),rand(220,255),rand(220,255));
	//画点
	imagesetpixel($img,rand(0,90),rand(0,24),$c);
}
//在图片上加入干扰线
for($i=0;$i<3;$i++){
	$x=rand(0,90);
	$y=rand(0,24);
	$x1=rand(0,90);
	$y1=rand(0,24);
	$c=imagecolorallocate($img,rand(80,155),rand(80,155),rand(80,155));
	//划线
	imageline($img,$x,$y,$x1,$y1,$c);
}

//把图片输出给客户端
imagepng($img);
//从服务器内存中删除该图片
imagedestroy($img);
