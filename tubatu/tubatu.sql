﻿set names utf8;
drop database if exists tubatu;
create database tubatu charset=utf8;
use tubatu;


/**注册用户表**/
create table tbt_user(
	uid int primary key auto_increment,
	uname varchar(32),
	upwd varchar(32)
);
INSERT INTO tbt_user VALUES
(1,'xiaohong','asdf123456'),
(2,'xiaohei','asdf123456'),
(3,'xiaobai','asdf123456');


/**购物车表**/
create table tbt_cart(
	cid int primary key auto_increment,
	userId int
);
INSERT INTO tbt_cart VALUES
(10,1);


/**购物车详情表**/
create table tbt_cart_detail(
	did int primary key auto_increment,
	cartId int,
	productId int,
	count int,
	ischecked int
);
INSERT INTO tbt_cart_detail VALUES
	(1,10,1,3,0),
	(2,10,5,1,0),
	(3,10,8,2,0);


/**轮播商品表**/
create table tbt_slider(
	sid int primary key auto_increment,
	spic varchar(128)
);
INSERT INTO tbt_slider VALUES
	(1,'images/towel_s1.jpg'),
	(2,'images/towel_s2.jpg'),
	(3,'images/towel_s3.jpg'),
	(4,'images/towel_s4.jpg'),
	(5,'images/towel_s5.jpg'),
	(6,'images/towel_s6.jpg'),
	(7,'images/towel_s7.jpg'),
	(8,'images/towel_s8.jpg'),
	(9,'images/towel_s9.jpg');

/**商品详情表**/
create table tbt_product(
	tid int primary key auto_increment,
	tname varchar(64),
	tprice float(10,2),
	tpic varchar(128),
	tstyle varchar(32),
	buyed int,
	love int
);
INSERT INTO tbt_product VALUES
	(1, '1条装_经典白', '50',  'images/towel_s1-s.jpg','zoom',22,14),
	(2, '1条装_墨绿色', '50',  'images/towel_s2-s.jpg','zoom',43,17),
	(3, '1条装_浅灰色', '50',  'images/towel_s3-s.jpg','zoom',34,12),
	(4, '1条装_深咖色', '50',  'images/towel_s4-s.jpg','zoom',56,33),
	(5, '1条装_鹅黄色', '50',  'images/towel_s5-s.jpg','zoom',88,55),
	(6, '3条装_经典白', '150', 'images/towel_s1-s.jpg','zoom',122,67),
	(7, '3条装_墨绿色', '150', 'images/towel_s2-s.jpg','zoom',81,23),
	(8, '3条装_浅灰色', '150', 'images/towel_s3-s.jpg','zoom',95,45),
	(9, '3条装_深咖色', '150', 'images/towel_s4-s.jpg','zoom',67,12),
	(10,'3条装_鹅黄色', '150', 'images/towel_s5-s.jpg','zoom',9,4),
	(11,'5条装_经典白', '250', 'images/towel_s1-s.jpg','zoom',16,1),
	(12,'5条装_墨绿色', '250', 'images/towel_s2-s.jpg','zoom',90,45),
	(13,'5条装_浅灰色', '250', 'images/towel_s3-s.jpg','zoom',49,27),
	(14,'5条装_深咖色', '250', 'images/towel_s4-s.jpg','zoom',88,19),
	(15,'5条装_鹅黄色', '250', 'images/towel_s5-s.jpg','zoom',133,101),
	(16, '乐巢家居 蔷薇花田园风黄色窗帘1.5*2.6', '249', 'images/bedding/bedding_01.jpg','bedding',12,6),
	(17, '乐巢新品邂逅雪尼尔简约欧式卧室客厅', '199', 'images/bedding/bedding_02.jpg','bedding',9,5),
	(18, '乐巢简约高档欧式夏忆蓝色遮光书房客厅', '159', 'images/bedding/bedding_03.jpg','bedding',19,18),
	(19, '乐巢青柠芳草现代田园绿色印花遮光防紫', '289', 'images/bedding/bedding_04.jpg','bedding',144,88),
	(20, '乐巢简约高档曼彻斯特客厅卧室飘窗现代', '69', 'images/bedding/bedding_05.jpg','bedding',56,41),
	(21, '雅棉家居优质健康床上用品 全棉贡缎刺', '665', 'images/bedding/bedding_06.jpg','bedding',92,63),
	(22, '乐巢快乐熊现代卡通简约美式遮光卧室落', '99', 'images/bedding/bedding_07.jpg','bedding',1,0),
	(23, 'Mlily梦百合 夏梦呵护枕S 护颈防螨', '199', 'images/bedding/bedding_08.jpg','bedding',69,23),
	(24, '雅棉家居优质健康床上用品精梳全棉', '359', 'images/bedding/bedding_09.jpg','bedding',56,48),
	(25, '乐巢缠绵简约现代新品米色拼接半遮光', '293', 'images/bedding/bedding_10.jpg','bedding',127,109),
	(26, '雅棉全棉高支高密纯色床单', '229', 'images/bedding/bedding_11.jpg','bedding',90,37),
	(27, '雅棉家居优质健康床上用品全棉四季舒适', '179', 'images/bedding/bedding_12.jpg','bedding',92,89),
	(28, '乐巢翩翩起舞现代简约儿童房卧室客厅', '219', 'images/bedding/bedding_13.jpg','bedding',111,12),
	(29, '乐巢欧式提花温迪妮仿麻半遮光紫色客厅卧', '259', 'images/bedding/bedding_14.jpg','bedding',56,5),
	(30, '乐巢新品柏妮丝粉紫色简约现代半遮光', '131', 'images/bedding/bedding_15.jpg','bedding',40,1),
	(31, '乐巢奥佩特拉韩式田园纯绿素色半遮光', '159', 'images/bedding/bedding_16.jpg','bedding',58,9),
	(32, '乐巢简约高档欧式夏忆蓝色遮光书房客厅', '149', 'images/bedding/bedding_17.jpg','bedding',66,19),
	(33, '乐巢简约中式西维亚现代咖色半遮光客', '165', 'images/bedding/bedding_18.jpg','bedding',198,23),
	(34, '雅棉家居优质健康床上用品 蚕丝被 夏凉', '949', 'images/bedding/bedding_19.jpg','bedding',33,30),
	(35, 'Mlily梦百合 幻梦呵护枕S 面包造型记忆枕', '129', 'images/bedding/bedding_20.jpg','bedding',67,15),
	(36, '乐巢洛葛仙妮现代中式新品包边遮光客厅', '199', 'images/bedding/bedding_21.jpg','bedding',68,55),
	(37, '雅棉羽绒被95白鹅绒 单双人被芯 加厚被', '649', 'images/bedding/bedding_22.jpg','bedding',78,34),
	(38, '雅棉床品健康家纺2016年新款夏凉被', '889', 'images/bedding/bedding_23.jpg','bedding',67,59),
	(39, '雅棉家纺 羽绒被 提花贡缎面料被芯梦瑶羽', '189', 'images/bedding/bedding_24.jpg','bedding',46,12),
	(40, '雅棉家居优质健康床上用品 全棉贡缎刺', '779', 'images/bedding/bedding_25.jpg','bedding',176,129),
	(41, 'Mlily梦百合 释梦清氧呵护枕S 水平设计 ', '669', 'images/bedding/bedding_26.jpg','bedding',37,32),
	(42, '雅棉家居优质健康床上用品精梳全棉 追奔', '590', 'images/bedding/bedding_27.jpg','bedding',95,49),
	(43, '乐巢简约约克小镇现代白绿拼接半遮光客', '339', 'images/bedding/bedding_28.jpg','bedding',99,42),
	(44, '舒适乐巢新品窗帘透新现代简约欧式透光米黄', '439', 'images/bedding/bedding_29.jpg','bedding',128,122),
	(45, '乐巢简约约克小镇现代白绿拼接半遮光客', '79', 'images/bedding/bedding_30.jpg','bedding',144,12),
	(46, 'Mlily梦百合 幻梦舒享枕 颈椎修复记忆棉', '349', 'images/bedding/bedding_31.jpg','bedding',11,11),
	(47, '雅棉酒店家纺 60%鸭绒枕 羽绒枕 睡眠枕', '279', 'images/bedding/bedding_32.jpg','bedding',44,33),
	(48, '乐巢窗帘全屋定制套餐　全场两幅窗帘', '331', 'images/bedding/bedding_33.jpg','bedding',85,49),
	(49, 'Amain雅棉四件套件床上用品提花真丝', '749', 'images/bedding/bedding_34.jpg','bedding',39,21),
	(50, '梦百合 舒眠枕 非温感舒适枕芯', '349', 'images/bedding/bedding_35.jpg','bedding',58,39),
	(51, '梦百合 夏梦波浪枕 清凉夏日舒适睡眠 ', '665', 'images/bedding/bedding_36.jpg','bedding',234,189),
	(52, '雅棉家居优质健康床上用品精梳全棉 宁静', '229', 'images/bedding/bedding_37.jpg','bedding',222,190),
	(53, '雅棉家居优质健康床上用品 蚕丝被 夏凉被', '569', 'images/bedding/bedding_38.jpg','bedding',93,44),
	(54, 'mlily梦百合 相伴骨头枕 抗菌防螨 保持颈', '229', 'images/bedding/bedding_39.jpg','bedding',284,34),
	(55, '乐巢现代卡通小鹿儿童房卧室落地飘窗', '149', 'images/bedding/bedding_40.jpg','bedding',218,29),
	(56, '梦百合 舒眠枕 非温感舒适枕芯', '599', 'images/bedding/bedding_41.jpg','bedding',39,36),
	(57, '雅棉 床上用品被子 可水洗夏凉被夏被空', '789', 'images/bedding/bedding_42.jpg','bedding',79,43),
	(58, '雅棉 春夏款全棉4件套 床上用品纯棉床单', '459', 'images/bedding/bedding_43.jpg','bedding',42,9),
	(59, '乐巢欧式提花温迪妮仿麻半遮光紫色客厅', '119', 'images/bedding/bedding_44.jpg','bedding',96,49),
	(60, '乐巢缠绵简约现代新品米色拼接半遮光仿', '109', 'images/bedding/bedding_45.jpg','bedding',50,49),
	(61, '雅棉全棉高支高密纯色床单', '89', 'images/bedding/bedding_46.jpg','bedding',79,33),
	(62, '雅棉 春夏款全棉4件套 床上用品纯棉床单', '559', 'images/bedding/bedding_47.jpg','bedding',20,12),
	(63, '乐巢新品简欧提花翠丝特织带拼接客厅卧', '189', 'images/bedding/bedding_48.jpg','bedding',155,111),
	(64, '乐巢简约欧式巴比伦全遮光窗帘粉色定', '79', 'images/bedding/bedding_49.jpg','bedding',184,123),
	(65, '雅棉酒店家纺 60%鸭绒枕 羽绒枕 睡眠枕', '293', 'images/bedding/bedding_50.jpg','bedding',54,30),
	(66, 'Mlily梦百合 相伴U型圈 慢回弹U型护颈', '249', 'images/bedding/bedding_51.jpg','bedding',190,34),
	(67, '雅棉家居优质健康床上用品全棉无甲醛', '68', 'images/bedding/bedding_52.jpg','bedding',89,72),
	(68, '乐巢雏菊沉香现代田园蓝色窗帘布遮光', '129', 'images/bedding/bedding_53.jpg','bedding',58,33),
	(69, '奥朵 欧式真铜吊灯饰客厅卧室餐厅吊灯', '2549', 'images/droplight/droplight_01.jpg','droplight',175,110),
	(70, '奥朵欧式真铜吊灯饰客厅卧室餐厅吊灯美', '979', 'images/droplight/droplight_02.jpg','droplight',49,33),
	(71, '奥朵简欧餐厅吊灯美式水晶吊灯卧室客厅', '499', 'images/droplight/droplight_03.jpg','droplight',185,58),
	(72, '君御现代简约创意餐厅灯餐吊灯三头水', '149', 'images/droplight/droplight_04.jpg','droplight',150,88),
	(73, '奥朵 欧式复古铜吊灯美式铜灯餐厅单头', '299', 'images/droplight/droplight_05.jpg','droplight',168,150),
	(74, '君御现代欧式田园吊灯客厅灯卧室灯饰', '898', 'images/droplight/droplight_06.jpg','droplight',48,47),
	(75, '瑝玛 云石灯全铜欧式吊灯 客厅大灯卧室', '1299', 'images/droplight/droplight_07.jpg','droplight',71,56),
	(76, '月影凯顿欧式全铜吊灯餐厅吊灯美式乡', '540', 'images/droplight/droplight_08.jpg','droplight',99,92),
	(77, '月影凯顿全铜玉石吊灯欧式水晶客厅灯具', '591', 'images/droplight/droplight_09.jpg','droplight',123,101),
	(78, '月影凯顿欧式灯吊灯全铜灯具客厅灯美', '490', 'images/droplight/droplight_10.jpg','droplight',174,110),
	(79, '欧式吊灯全铜灯玉石吊灯客厅卧室灯现', '650', 'images/droplight/droplight_11.jpg','droplight',167,75),
	(80, '月影凯顿铜灯全铜灯 简欧吊灯 美式灯 简', '379', 'images/droplight/droplight_12.jpg','droplight',193,147),
	(81, '月影凯顿铜灯田园书房灯 欧式卧室灯 现', '619', 'images/droplight/droplight_13.jpg','droplight',209,173),
	(82, '月影凯顿 全铜现代奢华水晶吊灯 欧式铜灯', '559', 'images/droplight/droplight_14.jpg','droplight',94,48),
	(83, '月影凯顿现代时尚吊灯全铜吊灯客厅吊灯美式吊灯餐厅灯书房卧室吊灯', '490', 'images/droplight/droplight_15.jpg','droplight',138,100),
	(84, '月影凯顿现代奢华全铜楼梯吊灯 复式楼', '790', 'images/droplight/droplight_16.jpg','droplight',34,21),
	(85, '君御现代简约铁艺餐吊灯单头三头个性', '349', 'images/droplight/droplight_17.jpg','droplight',67,39),
	(86, '月影凯顿云石灯全铜欧式吊灯客厅灯美', '590', 'images/droplight/droplight_18.jpg','droplight',94,20),
	(87, '奥朵欧式真铜吊灯饰客厅卧室餐厅吊灯', '949', 'images/droplight/droplight_19.jpg','droplight',49,49),
	(88, '君御4036水晶吊灯 卧室餐厅灯 现代欧', '759', 'images/droplight/droplight_20.jpg','droplight',200,34),
	(89, '欧普照明 时尚餐厅吊灯 LED现代简约中式', '699', 'images/droplight/droplight_21.jpg','droplight',59,2),
	(90, '奥朵 欧式铁艺简约卧室餐厅客厅创意法', '649', 'images/droplight/droplight_22.jpg','droplight',238,212),
	(91, '奥朵 现代简约儿童房护眼灯卧室三头吊灯', '889', 'images/droplight/droplight_23.jpg','droplight',90,49),
	(92, '奥朵欧式吊灯led客厅餐厅灯美式乡村', '389', 'images/droplight/droplight_24.jpg','droplight',33,4),
	(93, '现代简约风格云石灯新中式吊灯全铜灯欧', '779', 'images/droplight/droplight_25.jpg','droplight',128,99),
	(94, '全铜云石吊灯欧式客厅灯简约现代美式餐厅灯温馨卧室灯创意灯饰（不含光源）', '669', 'images/droplight/droplight_26.jpg','droplight',211,23),
	(95, '月影凯顿全铜餐厅现代时尚吊灯吧台', '590', 'images/droplight/droplight_27.jpg','droplight',256,123),
	(96, '月影凯顿现代中式全铜吊灯欧式美式吊', '680', 'images/droplight/droplight_28.jpg','droplight',41,21),
	(97, '月影凯顿欧式全铜吊灯现代个性有格', '499', 'images/droplight/droplight_29.jpg','droplight',246,190),
	(98, '月影凯顿全铜灯全铜吊灯 卧室吊灯 美式 ', '479', 'images/droplight/droplight_30.jpg','droplight',192,155),
	(99, '月影凯顿欧式吊灯全铜灯客厅吊灯现代', '449', 'images/droplight/droplight_31.jpg','droplight',79,38),
	(100, '月影凯顿全铜小吊灯欧式阳台灯具美式', '279', 'images/droplight/droplight_32.jpg','droplight',123,67),
	(101, '瑝玛 铜灯吊灯客厅灯 欧式灯具卧室灯温', '598', 'images/droplight/droplight_33.jpg','droplight',68,37),
	(102, '瑝玛 云石灯全铜欧式吊灯 客厅大灯卧', '798', 'images/droplight/droplight_34.jpg','droplight',118,94),
	(103, '瑝玛 云石灯全铜欧式吊灯 客厅大灯卧', '669', 'images/droplight/droplight_35.jpg','droplight',196,184),
	(104, '月影凯顿 全铜吊灯 现代美式吊灯中式', '560', 'images/droplight/droplight_36.jpg','droplight',253,239),
	(105, '瑝玛 铜灯吊灯客厅灯 欧式灯具卧室灯温', '568', 'images/droplight/droplight_37.jpg','droplight',204,130),
	(106, '月影凯顿美式台灯客厅灯全铜灯具卧室书房灯地中海田园灯简约现代', '589', 'images/droplight/droplight_38.jpg','droplight',23,12),
	(107, '奥朵led圆形吸吊两用灯具 现代简约时尚', '459', 'images/droplight/droplight_39.jpg','droplight',35,26),
	(108, '奥朵欧式真铜吊灯饰客厅卧室餐厅吊灯', '259', 'images/droplight/droplight_40.jpg','droplight',186,140),
	(109, '奥朵 餐厅灯 吊灯 三头 吧台艺术吊灯 餐', '599', 'images/droplight/droplight_41.jpg','droplight',48,48),
	(110, '立莱照明 LED餐吊灯 时空穿梭 吊灯 吊', '789', 'images/droplight/droplight_42.jpg','droplight',226,208),
	(111, '欧普照明 LED吊灯餐厅灯具 客厅三头餐吊', '459', 'images/droplight/droplight_43.jpg','droplight',154,139),
	(112, '月影凯顿现代欧式风格玉石吊灯全铜客', '519', 'images/droplight/droplight_44.jpg','droplight',180,83),
	(113, '酒店工程云石大吊灯 大堂灯复式楼客', '1009', 'images/droplight/droplight_45.jpg','droplight',136,11),
	(114, '月影凯顿铜灯全铜灯美式欧式现代简约', '889', 'images/droplight/droplight_46.jpg','droplight',29,19),
	(115, '月影凯顿现代中式云石灯欧式全铜客厅', '559', 'images/droplight/droplight_47.jpg','droplight',225,220),
	(116, '月影凯顿欧式玉石吊灯全铜客厅灯现代', '1089', 'images/droplight/droplight_48.jpg','droplight',229,130),
	(117, '月影凯顿美式全铜吊灯客厅灯奢华餐厅', '797', 'images/droplight/droplight_49.jpg','droplight',267,39),
	(118, '月影凯顿美式乡村吊灯简约全铜灯具现', '793', 'images/droplight/droplight_50.jpg','droplight',55,13),
	(119, '瑝玛 铜灯吊灯客厅灯 欧式灯具卧室灯温', '889', 'images/droplight/droplight_51.jpg','droplight',219,123),
	(120, '奥朵欧式真铜吊灯饰客厅卧室餐厅吊灯', '689', 'images/droplight/droplight_52.jpg','droplight',273,203),
	(121, '月影凯顿现代美式乡村吊灯全铜客厅灯具', '1129', 'images/droplight/droplight_53.jpg','droplight',116,51),
	(122, '奥朵 餐厅灯 吊灯 三头 吧台艺术吊灯 餐', '329', 'images/droplight/droplight_54.jpg','droplight',266,57),
	(123, '立莱照明 LED餐吊灯 时空穿梭 吊灯 吊', '479', 'images/droplight/droplight_55.jpg','droplight',227,187),
	(124, '欧普照明 LED吊灯餐厅灯具 客厅三头餐', '629', 'images/droplight/droplight_56.jpg','droplight',44,19),
	(125, '月影凯顿现代欧式风格玉石吊灯全铜客', '889', 'images/droplight/droplight_57.jpg','droplight',203,173),
	(126, '月影凯顿现代欧式风格玉石吊灯全铜客', '496', 'images/droplight/droplight_58.jpg','droplight',181,65),
	(127, '月影凯顿美式全铜吊灯客厅灯奢华餐厅', '559', 'images/droplight/droplight_59.jpg','droplight',107,39),
	(128, '月影凯顿欧式玉石吊灯全铜客厅灯现代', '439', 'images/droplight/droplight_60.jpg','droplight',148,119),
	(129, '奥朵 美式乡村客厅餐厅卧室铁艺吊灯', '689', 'images/droplight/droplight_61.jpg','droplight',271,48),
	(130, '瑝玛 铜灯吊灯客厅灯 欧式灯具卧室灯温', '1029', 'images/droplight/droplight_62.jpg','droplight',201,80),
	(131, '月影凯顿 全铜客厅吊灯 现代简欧美式', '829', 'images/droplight/droplight_63.jpg','droplight',277,136),
	(132, '优地 欧式落地电镀花瓶 2lmz', '589', 'images/ornaments/ornaments_01.jpg','ornaments',43,5),
	(133, '优地 仿真小花瓶 UT-180', '79', 'images/ornaments/ornaments_02.jpg','ornaments',75,36),
	(134, '优地 落地式仿真花瓶 00114', '499', 'images/ornaments/ornaments_03.jpg','ornaments',82,22),
	(135, '景勤 中式仿古陶瓷花瓶 HP1014', '149', 'images/ornaments/ornaments_04.jpg','ornaments',84,35),
	(136, '景勤 创意仿古陶瓷花瓶 A22', '159', 'images/ornaments/ornaments_05.jpg','ornaments',223,17),
	(137, '景勤 客厅陶瓷花瓶摆件 111224', '98', 'images/ornaments/ornaments_06.jpg','ornaments',248,205),
	(138, '景勤 中国红陶瓷花瓶 ZHC5-009', '129', 'images/ornaments/ornaments_07.jpg','ornaments',128,101),
	(139, '景勤 现代时尚陶瓷花瓶 04', '140', 'images/ornaments/ornaments_08.jpg','ornaments',130,80),
	(140, '宝齐莱 现代简约陶瓷花瓶 A557', '91', 'images/ornaments/ornaments_09.jpg','ornaments',252,135),
	(141, '宝齐莱 创意壁挂式花瓶 A544', '190', 'images/ornaments/ornaments_10.jpg','ornaments',259,58),
	(142, '宝齐莱 现代创意花瓶摆件 A691', '150', 'images/ornaments/ornaments_11.jpg','ornaments',234,123),
	(143, '宝齐莱 时尚简约陶瓷花瓶 A183', '129', 'images/ornaments/ornaments_12.jpg','ornaments',165,163),
	(144, '宝齐莱 创意家居陶瓷花瓶摆件 A162', '119', 'images/ornaments/ornaments_13.jpg','ornaments',122,112),
	(145, '宝齐莱 欧式陶瓷花瓶 A389', '159', 'images/ornaments/ornaments_14.jpg','ornaments',94,92),
	(146, '宝齐莱 创意家居陶瓷花瓶 A145', '80', 'images/ornaments/ornaments_15.jpg','ornaments',138,94),
	(147, '宝齐莱 简约个性陶瓷花瓶 A733', '110', 'images/ornaments/ornaments_16.jpg','ornaments',185,74),
	(148, '兆宏 落地式陶瓷花瓶 03232', '149', 'images/ornaments/ornaments_17.jpg','ornaments',236,93),
	(149, '兆宏 手绘青花瓷花瓶 DC7342', '290', 'images/ornaments/ornaments_18.jpg','ornaments',231,109),
	(150, '兆宏 简约陶瓷花瓶 DC4118', '116', 'images/ornaments/ornaments_19.jpg','ornaments',254,77),
	(151, '兆宏 现代中式陶瓷花瓶 ac0311', '138', 'images/ornaments/ornaments_20.jpg','ornaments',203,70),
	(152, '兆宏 手工陶瓷花瓶工艺品 DC4626', '699', 'images/ornaments/ornaments_21.jpg','ornaments',85,34),
	(153, '兆宏 中式古典陶瓷花瓶 MG3608', '149', 'images/ornaments/ornaments_22.jpg','ornaments',225,81),
	(154, '兆宏 创意陶瓷花瓶 xx0344', '189', 'images/ornaments/ornaments_23.jpg','ornaments',186,24),
	(155, '折影 家居现代浮雕花瓶 25dp', '89', 'images/ornaments/ornaments_24.jpg','ornaments',232,161),
	(156, '折影 古典浮雕玻璃花瓶 1727', '42', 'images/ornaments/ornaments_25.jpg','ornaments',254,170),
	(157, '折影 欧式彩色浮雕花瓶 193xh', '69', 'images/ornaments/ornaments_26.jpg','ornaments',248,154),
	(158, '折影 家居简约浮雕花瓶 sytz', '88', 'images/ornaments/ornaments_27.jpg','ornaments',178,76),
	(159, '折影 加厚浮雕花瓶 mdtz', '74', 'images/ornaments/ornaments_28.jpg','ornaments',257,140),
	(160, '阑珊树 家居浮雕花瓶摆件 V056', '150', 'images/ornaments/ornaments_29.jpg','ornaments',258,101),
	(161, '阑珊树 欧式复古浮雕花瓶 V287', '132', 'images/ornaments/ornaments_30.jpg','ornaments',131,100),
	(162, '阑珊树 巴洛克风浮雕花瓶 T999', '211', 'images/ornaments/ornaments_31.jpg','ornaments',175,149),
	(163, '阑珊树 客厅装饰琉璃花瓶 T1162', '324', 'images/ornaments/ornaments_32.jpg','ornaments',77,10),
	(164, '阑珊树 欧式浮雕玻璃花瓶 V555', '99', 'images/ornaments/ornaments_33.jpg','ornaments',88,35),
	(165, '光影艺轩 欧式浮雕玻璃花瓶 gyyxhp-215', '1598', 'images/ornaments/ornaments_34.jpg','ornaments',241,200),
	(166, '光影艺轩 古典时尚浮雕花瓶 gyyxhp102', '228', 'images/ornaments/ornaments_35.jpg','ornaments',171,61),
	(167, '光影艺轩 家居浮雕花瓶摆件 gyyxhp-985', '179', 'images/ornaments/ornaments_36.jpg','ornaments',129,89),
	(168, '光影艺轩 欧式新古典浮雕花瓶 gyyxhp101', '98', 'images/ornaments/ornaments_37.jpg','ornaments',182,97),
	(169, '光影艺轩 收口琉璃花瓶 HP043', '58', 'images/ornaments/ornaments_38.jpg','ornaments',108,9),
	(170, '皓杨 简约浮雕玻璃花瓶 sytzs', '79', 'images/ornaments/ornaments_39.jpg','ornaments',218,215),
	(171, '皓杨 小号浮雕玻璃花瓶摆件 193xh', '159', 'images/ornaments/ornaments_40.jpg','ornaments',190,47),
	(172, '皓杨 古典琉璃玻璃花瓶 3419x', '99', 'images/ornaments/ornaments_41.jpg','ornaments',220,197),
	(173, '皓杨 简约浮雕玻璃花瓶 34195', '55', 'images/ornaments/ornaments_42.jpg','ornaments',104,6),
	(174, '皓杨 欧式浮雕琉璃花瓶 HP029', '68', 'images/ornaments/ornaments_43.jpg','ornaments',177,142),
	(175, '维奥莱特 欧式琉璃大花瓶 0415-320-68', '119', 'images/ornaments/ornaments_44.jpg','ornaments',240,229),
	(176, '维奥莱特 家居装饰琉璃大花瓶 MBK1350', '349', 'images/ornaments/ornaments_45.jpg','ornaments',212,105),
	(177, '维奥莱特 手工琉璃花瓶摆件 CH-HP001SB', '389', 'images/ornaments/ornaments_46.jpg','ornaments',200,110),
	(178, '维奥莱特 欧式时尚琉璃花瓶 MBK1340', '296', 'images/ornaments/ornaments_47.jpg','ornaments',266,190),
	(179, '维奥莱特 中式琉璃花瓶 200-170-F', '198', 'images/ornaments/ornaments_48.jpg','ornaments',72,25),
	(180, 'JCC天洋竹炭纤维无缝墙布现代简约卧室客', '138', 'images/wallpaper/wallpaper_01.jpg','wallpaper',246,110),
	(181, '无缝墙布纯色素色现代简约墙纸卧室客厅', '168', 'images/wallpaper/wallpaper_02.jpg','wallpaper',189,25),
	(182, '天洋竹炭纤维无缝墙纸 墙布现代简约卧室', '89', 'images/wallpaper/wallpaper_03.jpg','wallpaper',138,97),
	(183, '天洋无缝墙布高档刺绣现代客厅卧室沙发', '149', 'images/wallpaper/wallpaper_04.jpg','wallpaper',267,241),
	(184, '特普丽素色竖条纹壁纸环保无纺布墙纸 ', '179', 'images/wallpaper/wallpaper_04.jpg','wallpaper',131,45),
	(185, '特普丽现代简约纯色素色百搭竖条纹无', '99', 'images/wallpaper/wallpaper_05.jpg','wallpaper',137,135),
	(186, '特普丽现代简约素色纯色壁纸 浮雕压纹竖', '278', 'images/wallpaper/wallpaper_06.jpg','wallpaper',129,117),
	(187, '特普丽 立体3D浮雕玫瑰之约墙纸 卧室', '408', 'images/wallpaper/wallpaper_07.jpg','wallpaper',85,70),
	(188, '特普丽现代简约墙纸 客厅卧室素色纯色', '140', 'images/wallpaper/wallpaper_08.jpg','wallpaper',185,49),
	(189, '特普丽墙纸 欧式简约竖条纹大马士革', '91', 'images/wallpaper/wallpaper_09.jpg','wallpaper',49,11),
	(190, '天洋竹炭纤维无缝墙布田园卧室客厅3D立', '168', 'images/wallpaper/wallpaper_10.jpg','wallpaper',159,44),
	(191, '欣旺3d立体深压纹墙纸 欧式田园壁纸 ', '150', 'images/wallpaper/wallpaper_11.jpg','wallpaper',200,60),
	(192, '【B】欣旺 韩式壁纸 竖条纹碎花无纺布', '108', 'images/wallpaper/wallpaper_12.jpg','wallpaper',30,22),
	(193, '沃莱菲 无纺布墙纸 欧式3d壁纸 卧室 温', '119', 'images/wallpaper/wallpaper_13.jpg','wallpaper',216,55),
	(194, '沃莱菲 中式墙纸 无纺布客厅书房卧室', '159', 'images/wallpaper/wallpaper_14.jpg','wallpaper',217,84),
	(195, '灯餐厅灯书房卧室吊灯', '490', 'images/wallpaper/wallpaper_15.jpg','wallpaper',246,204),
	(196, '沃莱菲 欧式墙纸3D无纺布壁纸卧室客厅', '90', 'images/wallpaper/wallpaper_16.jpg','wallpaper',230,13),
	(197, '沃莱菲 复古砖纹墙纸 酒吧仿砖块砖头', '149', 'images/wallpaper/wallpaper_17.jpg','wallpaper',189,65),
	(198, '沃莱菲 无纺布简约墙纸 卧室客厅纯素', '118', 'images/wallpaper/wallpaper_18.jpg','wallpaper',118,97),
	(199, '沃莱菲 无纺布简约墙纸 卧室客厅纯素色', '78', 'images/wallpaper/wallpaper_19.jpg','wallpaper',121,53),
	(200, '特普丽壁纸 中式复古田园墙纸 客厅卧室', '89', 'images/wallpaper/wallpaper_20.jpg','wallpaper',165,136),
	(201, '特普丽壁纸 现代简约素色墙纸 卧室客厅书', '127', 'images/wallpaper/wallpaper_21.jpg','wallpaper',169,78),
	(202, '特普丽壁纸 超厚无纺布 简欧式壁纸 卧', '178', 'images/wallpaper/wallpaper_22.jpg','wallpaper',249,182),
	(203, '特普丽壁纸 地中海 卡通男孩 蓝色儿童', '189', 'images/wallpaper/wallpaper_23.jpg','wallpaper',273,59),
	(204, '雅琪诺 美式欧式环保印花大条纹壁纸书', '89', 'images/wallpaper/wallpaper_24.jpg','wallpaper',106,45),
	(205, '雅琪诺 新中式古典典雅竹叶底纹客厅', '69', 'images/wallpaper/wallpaper_25.jpg','wallpaper',265,2),
	(206, '特普丽壁纸 现代简约条纹壁纸 进口环保无', '209', 'images/wallpaper/wallpaper_26.jpg','wallpaper',183,66),
	(207, '欣旺壁纸 韩式田园无纺布碎花壁纸 温', '140', 'images/wallpaper/wallpaper_27.jpg','wallpaper',160,129),
	(208, 'JCC天洋竹炭纤维无缝墙布卧室儿童房卡', '168', 'images/wallpaper/wallpaper_28.jpg','wallpaper',221,74),
	(209, 'JCC天洋竹炭纤维无缝墙布复古书房卧室', '199', 'images/wallpaper/wallpaper_29.jpg','wallpaper',85,48),
	(210, '沃莱菲 环保立体墙纸 无纺布壁纸 卧室 ', '129', 'images/wallpaper/wallpaper_30.jpg','wallpaper',114,80),
	(211, '沃莱菲壁纸 非自粘 3d无纺布 欧式大马', '79', 'images/wallpaper/wallpaper_31.jpg','wallpaper',239,145),
	(212, '沃莱菲壁纸 无纺布墙纸 客厅背景墙壁', '99', 'images/wallpaper/wallpaper_32.jpg','wallpaper',276,200),
	(213, '沃莱菲 无纺布简约墙纸 卧室客厅纯素色', '98', 'images/wallpaper/wallpaper_33.jpg','wallpaper',274,140),
	(214, '雅琪诺 现代简约方格花纹壁纸婚房客厅', '82', 'images/wallpaper/wallpaper_34.jpg','wallpaper',203,196),
	(215, '雅琪诺 简约欧式花纹素雅客厅卧室婚房', '69', 'images/wallpaper/wallpaper_35.jpg','wallpaper',85,20),
	(216, '特普丽壁纸 美式田园壁纸 客厅卧室书房墙', '260', 'images/wallpaper/wallpaper_36.jpg','wallpaper',270,41),
	(217, '雅琪诺 欧式田园玫瑰浮雕底纹壁纸客厅婚房书房卧室', '168', 'images/wallpaper/wallpaper_37.jpg','wallpaper',247,189),
	(218, '免胶水 天洋竹炭纤维无缝墙布刺绣卧', '189', 'images/wallpaper/wallpaper_38.jpg','wallpaper',229,97),
	(219, '天洋竹炭纤维无缝墙布中式提花书房卧', '135', 'images/wallpaper/wallpaper_39.jpg','wallpaper',97,48),
	(220, '天洋无缝墙布高档刺绣简约客厅卧室沙', '259', 'images/wallpaper/wallpaper_40.jpg','wallpaper',97,83),
	(221, '天洋竹炭纤维无缝墙布中式提花书房卧室', '179', 'images/wallpaper/wallpaper_41.jpg','wallpaper',241,71),
	(222, '特普丽 随性线条时尚简约环保无纺布墙', '189', 'images/wallpaper/wallpaper_42.jpg','wallpaper',193,59),
	(223, '特普丽墙纸 纯色金纸金箔墙纸 客厅背', '176', 'images/wallpaper/wallpaper_43.jpg','wallpaper',268,190),
	(224, '特普丽简约欧式墙纸 卧室客厅书房背景', '280', 'images/wallpaper/wallpaper_44.jpg','wallpaper',66,51),
	(225, '天洋竹炭纤维无缝墙布中式提花书房卧室', '109', 'images/wallpaper/wallpaper_45.jpg','wallpaper',267,259),
	(226, '沃莱菲 罗曼史 3D无纺布壁纸 客厅背', '89', 'images/wallpaper/wallpaper_46.jpg','wallpaper',75,28),
	(227, '沃莱菲壁纸 田园墙纸卧室客厅无纺布壁厅', '159', 'images/wallpaper/wallpaper_47.jpg','wallpaper',132,75),
	(228, '特普丽壁纸 现代简约条纹壁纸 进口环', '108', 'images/wallpaper/wallpaper_48.jpg','wallpaper',182,65),
	(229, 'A家家具 五层超实惠高档玻璃酒柜北美', '2238', 'images/wine/wine_01.jpg','wine',109,73),
	(230, 'A家家具 纯实木现代中式酒柜餐边柜 带', '5789', 'images/wine/wine_02.jpg','wine',79,4),
	(231, '第二中心私家酒窖 尊爵版 S8', '4099', 'images/wine/wine_03.jpg','wine',226,205),
	(232, 'A家家具 现代简约实木电视柜酒柜组合', '1399', 'images/wine/wine_04.jpg','wine',153,45),
	(233, 'A家家具 高档全实木客厅间厅柜玄关柜', '5709', 'images/wine/wine_05.jpg','wine',167,44),
	(234, '第二中心私家酒窖 青春版 S8.Q1', '3898', 'images/wine/wine_06.jpg','wine',251,16),
	(235, '众梵 盛世琥珀系列纯实木酒柜 实木水', '3299', 'images/wine/wine_07.jpg','wine',174,69),
	(236, 'A家家具 现代简约实木酒柜玻璃酒架客', '1999', 'images/wine/wine_08.jpg','wine',224,198),
	(237, '精匠轩 仿古白高边酒柜 D-027.028酒', '2675', 'images/wine/wine_09.jpg','wine',219,164),
	(238, '精匠轩 做旧复古橡木酒柜 D-025.026', '1980', 'images/wine/wine_10.jpg','wine',269,161),
	(239, '精匠轩 地中海仿古白间厅酒柜 D-045间厅柜', '3150', 'images/wine/wine_11.jpg','wine',139,133),
	(240, '黛森那 仿古实木单门酒柜 jjg-06', '5400', 'images/wine/wine_12.jpg','wine',168,103),
	(241, '黛森那 中式复古做旧实木酒柜 jjg-05', '8919', 'images/wine/wine_13.jpg','wine',177,27),
	(242, '黛森那 仿古做旧双开门酒柜 jcb-16', '5259', 'images/wine/wine_14.jpg','wine',140,49),
	(243, '黛森那 仿古做旧橡木酒柜 jcb-17', '5490', 'images/wine/wine_15.jpg','wine',157,17),
	(244, '黛森那 乡村仿古实木酒柜 jcb-20', '3800', 'images/wine/wine_16.jpg','wine',161,125),
	(245, '黛森那 仿古橡木酒柜 jcb-21', '4300', 'images/wine/wine_17.jpg','wine',115,50),
	(246, '黛森那 实木多功能酒柜 jjg-01', '5900', 'images/wine/wine_18.jpg','wine',192,31),
	(247, '维莎 白橡木环保酒柜 w0631', '2200', 'images/wine/wine_19.jpg','wine',218,31),
	(248, '维莎 橡木胡桃木色酒柜 s0407', '1980', 'images/wine/wine_20.jpg','wine',100,11),
	(249, '维莎 纯实木现代橡木酒柜 w0531', '1730', 'images/wine/wine_21.jpg','wine',214,5),
	(250, '维莎 实木简约现代酒柜 w0412餐边柜', '1870', 'images/wine/wine_22.jpg','wine',215,82),
	(251, '维莎 现代简约中式白橡木酒柜 w0703', '1475', 'images/wine/wine_23.jpg','wine',161,38),
	(252, '维莎 实木餐边白橡木酒柜 w0606', '3330', 'images/wine/wine_24.jpg','wine',230,150),
	(253, '维莎 纯全实木酒柜橡木 w0407餐边柜', '1790', 'images/wine/wine_25.jpg','wine',171,8),
	(254, '维莎 北美白橡木家具酒柜 w0415', '3260', 'images/wine/wine_26.jpg','wine',218,1),
	(255, '维莎 实木白橡木立酒柜 s0451', '1650', 'images/wine/wine_27.jpg','wine',124,121),
	(256, '维莎 白橡木环保酒柜 w0603', '1680', 'images/wine/wine_28.jpg','wine',165,69),
	(257, '豪门骄子 实木雕刻扇形玻璃酒柜 JG-4', '1299', 'images/wine/wine_29.jpg','wine',248,114),
	(258, '豪门骄子 美式乡村玻璃酒柜 J-903 ', '3679', 'images/wine/wine_30.jpg','wine',233,68),
	(259, '爱家居 中式实木三角酒柜 HR71', '5777', 'images/wine/wine_31.jpg','wine',169,66),
	(260, '爱家居 手工雕花玻璃三角酒柜 HU47', '5720', 'images/wine/wine_32.jpg','wine',278,169),
	(261, '爱家居 实木转角玻璃三角酒柜 MW52', '3480', 'images/wine/wine_33.jpg','wine',181,146),
	(262, '芙蓉居 实木三角两门酒柜 FS-Q37', '7980', 'images/wine/wine_34.jpg','wine',148,43),
	(263, '芙蓉居 田园墙角三角酒柜 MS-U20', '6400', 'images/wine/wine_35.jpg','wine',264,187),
	(264, '芙蓉居 三角酒柜简约现代 FS-S69', '5620', 'images/wine/wine_36.jpg','wine',264,197),
	(265, '芙蓉居 白色古典三角酒柜 FS-R49', '5100', 'images/wine/wine_37.jpg','wine',251,7),
	(266, '思图加特 中式实木墙角三角酒柜 ', '1299', 'images/wine/wine_38.jpg','wine',263,104),
	(267, '思图加特 实木雕花美式酒柜 ', '1299', 'images/wine/wine_39.jpg','wine',173,142),
	(268, '思图加特 简约实木角落酒柜 STJT0160', '1119', 'images/wine/wine_40.jpg','wine',86,57),
	(269, '思图加特 典雅实木三角酒柜 stjt0365', '1580', 'images/wine/wine_41.jpg','wine',42,29),
	(270, '酷漫居 迪士尼 酷漫居儿童床 高低床上下', '3799', 'images/lashbed/lashbed_01.jpg','lashbed',210,186),
	(271, '酷漫居儿童床底收纳储物拖箱 迪士尼高', '1099', 'images/lashbed/lashbed_02.jpg','lashbed',144,46),
	(272, '酷漫居 迪士尼儿童家具儿童床 高低多', '6699', 'images/lashbed/lashbed_03.jpg','lashbed',275,16),
	(273, '酷漫居 迪士尼实木双层床上下床 高低床', '6319', 'images/lashbed/lashbed_04.jpg','lashbed',172,12),
	(274, '酷漫居 迪士尼儿童家具 卡通儿童床高', '2699', 'images/lashbed/lashbed_05.jpg','lashbed',167,58),
	(275, '酷漫居儿童家具松木高低床带护栏子母双', '4198', 'images/lashbed/lashbed_06.jpg','lashbed',193,144),
	(276, '晶彩e家 子母床韩式双层多功能带护栏', '2340', 'images/lashbed/lashbed_07.jpg','lashbed',99,6),
	(277, '宜捷家居 简约地中海双层子母床 255B', '2880', 'images/lashbed/lashbed_08.jpg','lashbed',124,24),
	(278, '宜捷家居 美式简约双层子母床 JG-260#', '3780', 'images/lashbed/lashbed_09.jpg','lashbed',173,104),
	(279, '宜捷家居 双层子母床 255#', '4490', 'images/lashbed/lashbed_10.jpg','lashbed',232,10),
	(280, '宜捷家居 简约美式双层子母床 JKD-C-12##', '8880', 'images/lashbed/lashbed_11.jpg','lashbed',266,75),
	(281, '宜捷家居 简约双层子母床 265', '8060', 'images/lashbed/lashbed_12.jpg','lashbed',257,28),
	(282, '宜捷家居 简约地中海双层子母床 901#', '4690', 'images/lashbed/lashbed_13.jpg','lashbed',225,100),
	(283, '宜捷家居 美式双层子母床 M-260', '7280', 'images/lashbed/lashbed_14.jpg','lashbed',52,34),
	(284, '宜捷家居 简约韩式双层子母床 OH-806', '4290', 'images/lashbed/lashbed_15.jpg','lashbed',232,144),
	(285, '宜捷家居 简约双层子母床 MC-001', '4398', 'images/lashbed/lashbed_16.jpg','lashbed',167,3),
	(286, '宜捷家居 地中海双层子母床 6631#', '3349', 'images/lashbed/lashbed_17.jpg','lashbed',234,19),
	(287, '千彩居 双层子母床 H-18', '2230', 'images/lashbed/lashbed_18.jpg','lashbed',113,45),
	(288, '千彩居 简约双层子母床 DG-D-916灯', '4888', 'images/lashbed/lashbed_19.jpg','lashbed',237,170),
	(289, '千彩居 简约地中海双层子母床 SGY-FSH-19', '3388', 'images/lashbed/lashbed_20.jpg','lashbed',152,47),
	(290, '千彩居 双层子母床 LYS-A09子母床', '4699', 'images/lashbed/lashbed_21.jpg','lashbed',71,26),
	(291, '千彩居 简约双层子母床 DTBB-K25子母床', '4099', 'images/lashbed/lashbed_22.jpg','lashbed',177,102),
	(292, '千彩居 简约多功能双层子母床 DGN-ZMC01', '6089', 'images/lashbed/lashbed_23.jpg','lashbed',126,125),
	(293, '千彩居 韩式双层子母床 DTBB-K2202', '5099', 'images/lashbed/lashbed_24.jpg','lashbed',129,30),
	(294, '千彩居 双层子母床 DG-D-9160', '2229', 'images/lashbed/lashbed_25.jpg','lashbed',200,100),
	(295, '千彩居 地中海双层子母床 DTBB-K2208', '6069', 'images/lashbed/lashbed_26.jpg','lashbed',227,58),
	(296, '千彩居 多功能双层子母床 FSH-180', '5390', 'images/lashbed/lashbed_27.jpg','lashbed',275,131),
	(297, '叶卡林堡 现代简约柏木子母床 E02#', '3680', 'images/lashbed/lashbed_28.jpg','lashbed',242,144),
	(298, '叶卡林堡 柏木子母床 E01#', '3280', 'images/lashbed/lashbed_29.jpg','lashbed',275,61),
	(299, '叶卡林堡 简约柏木子母床 e08# ', '4479', 'images/lashbed/lashbed_30.jpg','lashbed',232,111),
	(300, '叶卡林堡 美式简约多功能柏木子母床 8815#', '3579', 'images/lashbed/lashbed_31.jpg','lashbed',121,5),
	(301, '叶卡林堡 多功能柏木子母床 E03#', '3590', 'images/lashbed/lashbed_32.jpg','lashbed',189,64),
	(302, '叶卡林堡 简约多功能柏木子母床 8817#', '3598', 'images/lashbed/lashbed_33.jpg','lashbed',189,169),
	(303, '叶卡林堡 美式多功能柏木子母床 8816#', '3555', 'images/lashbed/lashbed_34.jpg','lashbed',262,78),
	(304, '叶卡林堡 简约地中海多功能柏木子母床 8814#', '3339', 'images/lashbed/lashbed_35.jpg','lashbed',41,33),
	(305, '宜居鸟 简约多功能柏木子母床 BP-弯脚', '5600', 'images/lashbed/lashbed_36.jpg','lashbed',271,181),
	(306, '宜居鸟 多功能柏木子母床 bp-108#', '5688', 'images/lashbed/lashbed_37.jpg','lashbed',102,74),
	(307, '格琳斯 简约柏木子母床 gls1081', '6300', 'images/lashbed/lashbed_38.jpg','lashbed',134,7),
	(308, '格琳斯 现代简约柏木子母床 gls1013', '5600', 'images/lashbed/lashbed_39.jpg','lashbed',102,32),
	(309, '格琳斯 柏木子母床 DL米奇子母床', '4600', 'images/lashbed/lashbed_40.jpg','lashbed',36,19),
	(310, '格琳斯 简约柏木子母床 茶色挂梯子母床', '7600', 'images/lashbed/lashbed_41.jpg','lashbed',150,112),
	(311, '格琳斯 柏木子母床 DLC款深色子母床', '6300', 'images/lashbed/lashbed_42.jpg','lashbed',186,125),
	(312, '格琳斯 简约柏木子母床 茶色梯柜子母床', '5400', 'images/lashbed/lashbed_43.jpg','lashbed',148,141),
	(313, '格琳斯 现代简约柏木子母床 gls1862', '5199', 'images/lashbed/lashbed_44.jpg','lashbed',199,134),
	(314, '格琳斯 多功能柏木子母床 gls1366', '6700', 'images/lashbed/lashbed_45.jpg','lashbed',78,16),
	(315, '格琳斯 田园多功能柏木子母床 gls1635', '7800', 'images/lashbed/lashbed_46.jpg','lashbed',29,21),
	(316, '格琳斯 简约多功能柏木子母床 gls3011', '5559', 'images/lashbed/lashbed_47.jpg','lashbed',97,34),
	(317, '曲采 橡木子母床 9815', '4489', 'images/lashbed/lashbed_48.jpg','lashbed',88,60);


/**收获地址表**/
create table tbt_address(
	aid int primary key auto_increment,
	provs varchar(32),
	cities varchar(32),
	rcvName varchar(32),
	telphone varchar(32),
	address varchar(128),
	username varchar(32)
);


/**订单表**/
create table tbt_order(
	oid int primary key auto_increment,
	orderNum int,
	price float(10,2),
	payment int,
	orderTime bigint,
	status int,
	userId int
);


/**订单详情表**/
CREATE TABLE tbt_order_detail (
  did INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT,
  productId INT,
  count INT
);

INSERT INTO tbt_order_detail VALUES
(1,101,10,3),
(2,101,15,1),
(3,101,18,2);

/**抽奖信息记录表**/
CREATE TABLE tbt_lottery(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  lotteryTime BIGINT,
  level INT
);
INSERT INTO tbt_lottery VALUES
(NULL, 1, 237676571223, 3),
(NULL, 1, 248287123413, 3),
(NULL, 1, 358823471343, 2);





