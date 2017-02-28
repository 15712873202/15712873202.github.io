/*************************************************************/
/************** banner id="slider" 部分图片轮播效果 **********/
var imgs=[
	{"i":0,"img":"images/banner_slider_01.jpg"},
	{"i":1,"img":"images/banner_slider_02.jpg"},
	{"i":2,"img":"images/banner_slider_03.jpg"},
	{"i":3,"img":"images/banner_slider_04.jpg"},
	{"i":4,"img":"images/banner_slider_05.jpg"},
	{"i":5,"img":"images/banner_slider_06.jpg"},
	{"i":6,"img":"images/banner_slider_07.jpg"},
];
var slider={
	LIWIDTH:0,//保存每个li的宽度,其实就是#slider的宽
	DURATION:1000,//动画的总时间
	WAIT:3000,//自动轮播之间的等待时间
	timer:null,//保存一次性定时器序号
	canAuto:true,//保存是否可以自动轮播
	init:function(){
		this.LIWIDTH=parseFloat($("#slider").css("width"));
		this.updateView();
		//为id为indexs的ul添加鼠标进入事件代理，只有不是hover的li才能响应事件
		$("#indexs").on("mouseover","li:not(.hover)",function(e){
			//获得目标元素$target
			var $target=$(e.target);
			//调用move方法，传入要移动的个数:
			//目标元素的内容-目标元素的兄弟中class为hover的li的内容
			this.move($target.html()-$target.siblings(".hover").html());
		}.bind(this));
		//当鼠标进入#slider时，将canAuto改为false
		//当鼠标移出#slider时，将canAuto改为true
		$("#slider").hover(
			function(){this.canAuto=false;}.bind(this),
			function(){this.canAuto=true;}.bind(this)
		);
		this.autoMove();
	},
	autoMove:function(){//启动自动轮播
		//启动一次性定时器: 
		this.timer=setTimeout(function(){
			if(this.canAuto){
				this.move(1);//调用move执行移动一个
			}else{
				this.autoMove();//继续等待 
			}
		}.bind(this),this.WAIT);
	},
	move:function(n){
		clearTimeout(this.timer);//停止一次性定时器
		this.timer=null;
		$("#imgs").stop(true);//停止动画，防止叠加
		if(n<0){//如果n<0,右移，先改数组，再移动
			n*=-1;//将n转为正数
			imgs=//先删除结尾的n个元素，拼接到开头
			imgs.splice(imgs.length-n,n).concat(imgs);
			this.updateView();//更新界面
			//获得#imgs当前的left,转为浮点数
			var left=parseFloat($("#imgs").css("left"));
			//修改#imgs的left为left-n*LIWIDTH
			$("#imgs").css("left",left-n*this.LIWIDTH);
			//启动动画，在DURATION时间内，left移动到0
			$("#imgs").animate(
				{left:"0"},
				this.DURATION,
				this.autoMove.bind(this)
			);
		}else{//否则, 左移,先移动，再改数组
			//让#imgs的ul再DURATION事件内，left变为-n*LIWIDTH
			$("#imgs").animate(
				{left:-n*this.LIWIDTH},
				this.DURATION,
				//在动画结束后调用endMove,替换this，传入参数n
				this.endMove.bind(this,n)
			);
		}
	},
	endMove:function(n){
		//删除imgs开头的n个元素,再拼到结尾
		imgs=imgs.concat(imgs.splice(0,n))
		this.updateView();//更新页面
		$("#imgs").css("left",0);//设置#imgs的left为0
		this.autoMove();//启动自动轮播
	},
	updateView:function(){//将数组中的元素更新到页面
		//遍历imgs数组中每个对象,同时声明空字符串html
		for(var i=0,html="",idxs="";i<imgs.length;i++){
			html+="<li><img src='"+imgs[i].img+"'></li>";
			idxs+="<li>"+(i+1)+"</li>";
		}
		//设置id为imgs的内容为html,再设置其宽为LIWIDTH*imgs的元素个数
		$("#imgs").html(html)
			.css("width",this.LIWIDTH*imgs.length);
		//设置id为indexs的内容为idxs
		$("#indexs").html(idxs);
		//获得#indexs下的和imgs中第一个元素的i属性对应的li,设置其class为hover,
		//选择兄弟中的class为hover的li,清除其class
		$("#indexs>li:eq("+imgs[0].i+")")
			.addClass("hover")
			.siblings(".hover")
			.removeClass("hover");
	}
}
slider.init();




/*************************************************************/
/********* banner 部分 id="left_aside" 的input切换功能 *******/
//让所有data-toggle为item的元素都能响应单击事件
$("#left_aside").on("click","[data-toggle='item']",function(e){
	//获得目标元素封装为jQuery对象
	var $target=$(e.target);
	e.target.nodeName!="P"&&($target=$target.parent());
	//如果当前元素的class属性没有active
	if(!$target.hasClass("active")){
		//获得当前元素的所有兄弟中class为active的，移除其active类
		$target.siblings(".active")
			.removeClass("active");
		//为当前元素添加active类
		$target.addClass("active");
		//获得当前元素的data-href属性,保存在变量selector中
        //使用selector查找p，为其添加active类，再查找其所有兄弟中class为active的移除active类
		//var $selector=$(this).attr("data-href");
		$($target.attr("data-href"))
			.addClass("active")
			.focus()// input获得焦点
			.siblings(".active")
			.removeClass("active");
	}
});




/*******************************************************************************/
/**************  banner 部分id="left_aside"中的select切换城市功能 **************/
var cities=[
	[],
    [{"name":"合肥","value":"合肥"},{"name":"六安","value":"六安"},
	 {"name":"蚌埠","value":"蚌埠"},{"name":"淮南","value":"淮南"},
	 {"name":"安庆","value":"安庆"},{"name":"黄山","value":"黄山"}],
	[{"name":"沈阳","value":"沈阳"},{"name":"辽阳","value":"辽阳"},
	 {"name":"鞍山","value":"鞍山"},{"name":"锦州","value":"锦州"},
	 {"name":"大连","value":"大连"},{"name":"本溪","value":"本溪"}],
	[{"name":"南京","value":"南京"},{"name":"苏州","value":"苏州"},
	 {"name":"无锡","value":"无锡"},{"name":"常州","value":"常州"},
	 {"name":"镇江","value":"镇江"},{"name":"徐州","value":"徐州"}],
	[{"name":"杭州","value":"杭州"},{"name":"温州","value":"温州"},
	 {"name":"宁波","value":"宁波"},{"name":"绍兴","value":"绍兴"},
	 {"name":"嘉兴","value":"嘉兴"},{"name":"金华","value":"金华"}],
	[{"name":"石家庄","value":"石家庄"},{"name":"秦皇岛","value":"秦皇岛"},
	 {"name":"保定","value":"保定"},{"name":"唐山","value":"唐山"},
	 {"name":"沧州","value":"沧州"},{"name":"承德","value":"承德"}],
	[{"name":"东城","value":"东城"},{"name":"西城","value":"西城"},
	 {"name":"海淀","value":"海淀"},{"name":"大兴","value":"大兴"},
	 {"name":"通州","value":"通州"},{"name":"石景山","value":"石景山"}],
    [{"name":"河东","value":"河东"},{"name":"河西","value":"河西"},
	 {"name":"南开","value":"南开"},{"name":"和平","value":"和平"},
	 {"name":"滨海","value":"滨海"},{"name":"宝坻","value":"宝坻"}]
];
function selCts(selProvs){
	//获得selProvs中选中项的下标i
	var i=selProvs.selectedIndex;
	//查找name为cities的元素，保存在selCts中
	var selCts=document.querySelector("[name='cities']");
	if(i!=0){//如果i不是0
		//设置selCts的内容为html中的原始内容
		selCts.innerHTML='<option value="市/地区">市/地区</option>';
		//获取cities数组中i位置的子数组city
		var city=cities[i];
		//创建文档片段frag
		var frag=document.createDocumentFragment();
		//遍历cts中每个城市对象
		for(var i=0;i<city.length;i++){
			//将option追加到frag下 
			frag.appendChild(new Option(city[i].name,city[i].value));
		}
		//将option追加到frag下 
		selCts.appendChild(frag);
	}else{//设置selCts的内容为html中的原始内容
		selCts.innerHTML='<option value="市/地区">市/地区</option>';
	}
}




/**********************************************************************************/
/************************ 北京装修公司左侧部分的轮播效果 **************************/
var switchoff={
	canAuto:true,//保存是否可以自动轮播
	timer:null,//保存周期性定时器序号
	WAIT:3000,//自动轮播之间的等待时间
	init:function(){
		this.move();//手动点击移动
		//设置鼠标悬停时是否可以自动轮播的条件
		$("ul.sub_company>li").hover(
			function(){this.canAuto=false;}.bind(this),
			function(){this.canAuto=true;}.bind(this)
		);
		this.autoMove();//启动自动轮播
	},
	autoMove:function(){
		clearInterval(this.timer);//停止周期性定时器
		this.timer=null;
		this.timer=setInterval(function(){//设置周期性定时器
			if(this.canAuto){//如果可以轮播
				//当前元素清除class为active
				$("ul.sub_company>li.active").removeClass("active")
					//给下一个兄弟元素class增加active
					.next().addClass("active");
				//如果当前元素中class含有active的同时含有end
				if($("ul.sub_company>li.active").hasClass("end")){
					//将当前元素中class含有active的移除active
					$("ul.sub_company>li.active").removeClass("active")
						//同时给兄弟元素中class含有init的增加active
						.siblings(".init").addClass("active");
					$('#first').addClass("active")
						.siblings(".active").removeClass("active");
				}
				//找到当前元素对应的大div框，并为其class增加active
				$($("ul.sub_company>li.active img").attr("data-img")).addClass("active")
					//给其兄弟元素中class含有active的移除active
					.siblings(".active").removeClass("active");
			}else{//否则继续等待
				this.autoMove();
			}
		}.bind(this),this.WAIT);
	},
	move:function(){//手动点击移动
		clearInterval(this.timer);//停止周期性定时器
		this.timer=null;
		//为ul.sub_company>li中的img添加单击事件
		$("ul.sub_company>li").on("click","[data-toggle='intro']",function(e){
			var $target=$(e.target);
			//如果目标元素的父元素的class不含有active
			if(!$target.parent().hasClass("active")){
				//为其父元素的class添加active
				$target.parent().addClass("active")
					//同时移除其父元素的兄弟元素class的active
					.siblings(".active").removeClass("active");
				//找到与当前元素对于的大div并为其class添加active
				$($target.attr("data-img")).addClass("active")
					//同时移除其兄弟元素的class的active
					.siblings('.active').removeClass('active');
			}
		});
		this.autoMove.bind(this);
	}
}
switchoff.init();




/***************************************************************************************/
/******************北京装修公司右侧部分 id="search_company" 的切换功能 *****************/
$("ul.active_current").on("click","[data-toggle='company']",function(e){
	var $target=$(e.target);
	if(!$target.hasClass("current")){
		$target.siblings(".current").removeClass("current");
		$target.addClass("current");
		$($target.attr("data-name"))
			.addClass("current")
			.siblings(".current")
			.removeClass("current");
	}
});




/************************************************************************************/
/************************* 土巴兔装修榜头部三幅图片的切换效果 ***********************/
$("div.list_item_01 .img2").mouseover(function(){
	$(this).animate({left:"192px"},500);
});
$("div.list_item_01 .img2").mouseout(function(){
	$(this).animate({left:"536px"},500);
});
$("div.list_item_01 .img3").mouseover(function(){
	$(this).animate({left:"383px"},500)
		.prev().animate({left:"192px"},500);
});
$("div.list_item_01 .img3").mouseout(function(){
	$(this).animate({left:"728px"},500)
		.prev().animate({left:"536px"},500);
});




/*******************************************************************************/
/************************* 俩侧固定定位部分何时可以显示 ********************/
//为document添加滚动事件监听为: function(){
document.addEventListener("scroll",function(){
    //查找id为toTop的div
    var div1=document.getElementsByClassName("to_top")[0];
    //设置div的display为:
        //滚动过的距离>=500?block:none
    div1.style.display=document.body.scrollTop>=700?"block":"none";
	var div2=document.getElementById("fixed_box");
	div2.style.display=document.body.scrollTop>=1000?"block":"none";
	//var div3=document.getElementById("bound_box");
	//div3.style.display=document.body.scrollTop>=1500?"block":"none";
});
/*******************************************************************************/
/*********************** 左侧固定定位部分与大弹框的切换效果 ********************/
$("#fixed_box").click(function(){
	$(this).animate({left:"-156px"},500,function(){
		$("#fixed_box").next().animate({left:"0"},500);
	});
	document.addEventListener("scroll",function(){
		var div3=document.getElementById("bound_box");
		div3.style.display=
			document.body.scrollTop
			>=1000?"block":"none";	
	});
});
$("#bound_box .delete").click(function(){
	$("#bound_box").animate({left:"-100%"},500,function(){
		$("#fixed_box").animate({left:"0"},500);
	});
});




/*******************************************************************************/
/********* 点击右侧固定定位中装修报价弹出window大弹框及其切换效果 **********/
$("a.price").click(function(){
	$("#window_mask").css("display","block");
});
$("#father_mask .delete").click(function(){
	$("#window_mask").css("display","none");
});
$("#link_mask").on("click","[data-price='price']",function(e){
	var $target=$(e.target);
	if(!$target.hasClass("active")){
		$target.addClass("active").siblings(".active").removeClass("active");
		$($target.attr("data-mask")).addClass("active")
			.siblings(".active").removeClass("active");
	}
});













