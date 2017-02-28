/**为所有的Date对象添加一个新的成员方法，转换为形如y-m-d<br>h:m:s**/
Date.prototype.stringify = function () {
  var s = this.getFullYear() + '-';
  s += (this.getMonth() + 1) + '-';
  s += this.getDate() + '<br>';
  s += this.getHours() + ':';
  s += this.getMinutes() + ':';
  s += this.getSeconds();
  return s;
}


/***********读取上一页面保存的订单编号****************/
$('#orderNum').html(localStorage['orderNum']);


/************************异步请求当前登录用户的所有订单***********************/
$.ajax({
  type: 'GET',
  url: 'php/14_order_select.php',
  data: {uname: localStorage['loginName']},
  success: function (orderList) {
    //console.log('开始处理订单数据');
    //console.log(orderList);
    //遍历订单数组，拼接HTML字符串
    var html = '';
    $.each(orderList, function (i, order) {
      html += `
        <tr>
          <td colspan = "6" >
            订单编号：${order.orderNum}
          </td>
        </tr>
        <tr>
          <td>
      `;
      $.each(order.productList, function (j, p) {
        html += `
          <a href = "#" title = "${p.tname}" >
            <img src ="${p.tpic}">
          </a>
        `;
      });
      html += `
            </td>
            <td>
              ￥${order.price}<br>
              ${order.payment == '1' ? '支付宝支付' : (order.payment == '2' ? '微信支付' : (order.payment == '3' ? '货到付款' : '银行卡支付'))}
            </td>
            <td>
              ${order.orderTime}
            </td>
            <td>
              ${order.status == '1' ? '订单已确认' : '订单已完成'}
            </td>
            <td>
              <a href = "#"> 查看 </a> <br>
              <a href = "#"> 评价 </a>
              <a href = "#"> 晒单 </a> <br>
              <a href = "#"> 还要买 </a>
            </td>
          </tr>
      `;
    });
    $('#order-table tbody').html(html);
    //把所有的日期对应的数字转换为年月日格式
    var jqObj = $('#order-table tbody td:nth-child(3)');
    jqObj.each(function (i, td) {
      var num = td.innerHTML;
      var str = new Date(parseInt(num)).stringify();
      td.innerHTML = str;
    });
  }
});


/**********为附加导航中项添加事件监听，进行内容切换***********/
$('.affix ul li a').click(function (e) {
  e.preventDefault();
  //修改li的.active的位置
  $(this).parent().addClass('active').siblings('.active').removeClass('active');
  //修改右侧主体中的div的.active位置
  var id = $(this).attr('href');
  $(id).addClass('active').siblings('.active').removeClass('active');
});


/**********为绘图方法添加事件监听，进行内容切换***********/
$('.select-method').on('click', 'a', function (e) {
  e.preventDefault();
  //修改li的.select的位置
  $(this).parent().addClass('select').siblings('.select').removeClass('select');

  //修改右侧主体中的div的.active位置
  var id = $(this).attr('href');
  $(id).addClass('select').siblings('.select').removeClass('select');
});


/*****************异步请求当前登录用户的消费统计数据，绘制Canvas统计图************/
$.ajax({
  type: 'GET',
  url: 'php/15_buy_data.php',
  data: {uname: localStorage['loginName']},
  success: function (list) {
    /**生成随机颜色的函数，返回值形如：rgb(xx,xx,xx)**/
    function rc() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }

    /***绘图必需的变量***/
    var w = 800;  //画布的宽
    var h = 500;  //画布的高
    var count = list.length;  //数据的个数
    var padding = 40; //内容到画布边界的距离
    var barWidth = (w - 2 * padding) / (2 * count + 1); //每个柱的宽度
    var yPointCount = 6;  //Y轴上坐标点的数量
    var yPointSpacing = (h - 2 * padding) / (yPointCount); //Y轴上坐标点间距
    var origin = {x: padding, y: h - padding}; //坐标轴原点的坐标
    var xEnd = {x: w - padding, y: h - padding};//X轴端点
    var yEnd = {x: padding, y: padding};//Y轴端点

    /***开始绘制***/
    var canvas = document.getElementById('canvas-buy-data');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom'; //文本基线设置为第四线
    ctx.font = '12px SimHei';

    //1绘制X轴及上面的坐标点
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);  //挪到原点
    ctx.lineTo(xEnd.x, xEnd.y); //到X轴端点画线
    ctx.lineTo(xEnd.x - 10, xEnd.y - 5); //X轴箭头
    ctx.moveTo(xEnd.x, xEnd.y); //到X轴端点
    ctx.lineTo(xEnd.x - 10, xEnd.y + 5); //X轴箭头
    for (var i = 0; i < count; i++) {
      var x = origin.x + (2 * i + 1) * barWidth;
      var y = origin.y;
      ctx.moveTo(x, y);   //X轴坐标点起点
      ctx.lineTo(x, y - 5); //X轴坐标点终点
      var txt = list[i].label; //要绘制的文字
      var txtWidth = ctx.measureText(txt).width;
      ctx.fillText(txt, x - txtWidth / 2, y + 14);
    }

    //2绘制Y轴及上面的坐标点
    ctx.moveTo(origin.x, origin.y);  //挪到原点
    ctx.lineTo(yEnd.x, yEnd.y); //到Y轴端点画线
    ctx.lineTo(yEnd.x - 5, yEnd.y + 10); //Y轴箭头
    ctx.moveTo(yEnd.x, yEnd.y); //到Y轴端点
    ctx.lineTo(yEnd.x + 5, yEnd.y + 10); //Y轴箭头
    //计算所有消费金额中的最大值
    var max = list[0].value;
    for (var i = 1; i < count; i++) {
      if (list[i].value > max) {
        max = list[i].value;
      }
    }
    //Y轴两个坐标点表示的金额的间距
    var valueSpacing = parseInt(max / yPointCount);
    for (var i = 0; i < yPointCount - 1; i++) {
      var x = origin.x;   //Y轴上的坐标点
      var y = origin.y - (i + 1) * yPointSpacing;
      ctx.moveTo(x, y); //Y轴上的点
      ctx.lineTo(x + 5, y);
      var txt = (i + 1) * valueSpacing;
      var txtWidth = ctx.measureText(txt).width;
      ctx.fillText(txt, x - txtWidth - 2, y + 5);
    }
    ctx.stroke();

    //3绘制柱状图
    for (var i = 0; i < count; i++) {
      var barHeight = (list[i].value) * (h - 2 * padding) / (max);//比例尺问题
      var x = origin.x + (2 * i + 1) * barWidth;
      var y = origin.y - barHeight;
      ctx.strokeRect(x - barWidth / 2, y, barWidth, barHeight);//绘制轮廓线

      //绘制文本——当前柱表示的值
      ctx.fillStyle = '#333';
      var txt = list[i].value; //要绘制的文字
      var txtWidth = ctx.measureText(txt).width;
      ctx.fillText(txt, x - txtWidth / 2, y - 3);

      //填充渐变色  var g= ctx.createLinearGraident();  g.addColorStop()
      //为每个柱填充随机颜色
      var g = ctx.createLinearGradient(x - barWidth / 2, y, barWidth, barHeight);
      g.addColorStop(0, rc());
      g.addColorStop(0.1, rc());
      g.addColorStop(0.2, rc());
      g.addColorStop(0.3, rc());
      g.addColorStop(0.4, rc());
      g.addColorStop(0.5, rc());
      g.addColorStop(0.6, rc());
      g.addColorStop(0.7, rc());
      g.addColorStop(0.8, rc());
      g.addColorStop(0.9, rc());
      g.addColorStop(1, rc());
      ctx.fillStyle = g;
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    }
  }
});



/******************消费统计图：使用svg绘图*********************/
$.ajax({
  type: 'GET',
  url: 'php/15_buy_data.php',
  data: {uname: localStorage['loginName']},
  success: function (data) {
    var barWidth = 725/25;  //svg.width/(2*7+1)
    var max = data[0].value;
    for (var i = 1; i < data.length; i++) {
      if (data[i].value > max) {
        max = data[i].value;
      }
    }
    for(var i=0; i<data.length; i++){
      var row = data[i];
      var w = barWidth;
      var h = 350*row.value/max; //比例尺
      var x = (2*i+1)*barWidth+50;
      var y = 400-h-25;

      //创建渐变对象
      var g = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
      g.setAttribute('id', 'g'+i);
      g.setAttribute('x1', '0%');
      g.setAttribute('y1', '0%');
      g.setAttribute('x2', '0%');
      g.setAttribute('y2', '100%');
      var c = rc(); //随机颜色
      g.innerHTML = `
        <stop offset="0" stop-color="${c}"></stop>
        <stop offset="100%" stop-color="${c}" stop-opacity="0"></stop>
      `;
      effects.appendChild(g);

      //创建矩形
      var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('stroke', c);
      rect.setAttribute('fill', `url(#g${i})`);
      rect.setAttribute('data-label', row.label);
      rect.setAttribute('data-value', row.value);
      s1.appendChild(rect);
      var text1 = document.createElementNS('http://www.w3.org/2000/svg','text');
      var text2 = document.createElementNS('http://www.w3.org/2000/svg','text');
      text1.setAttribute('x',x+5);
      text1.setAttribute('y',390);
      text1.innerHTML=data[i].label;
      s1.appendChild(text1);
      text2.setAttribute('x',x);
      text2.setAttribute('y',y-5);
      text2.innerHTML=data[i].value;
      s1.appendChild(text2);
    }
    for(var i=0; i<10; i++){
      var y = 400-25-i*(350/10);
      var text3 = document.createElementNS('http://www.w3.org/2000/svg','text');
      //var line = document.createElementNS('http://www.w3.org/2000/svg','line');
      text3.setAttribute('x',10);
      text3.setAttribute('y',y+5);
      text3.innerHTML=Math.floor(max/10*i);
      s1.appendChild(text3);
      /*line.setAttribute('x1',50);
      line.setAttribute('y1',y);
      line.setAttribute('x2',55);
      line.setAttribute('y2',y);
      s1.appendChild(line);*/
    }

    function rc(){
      var r = Math.floor(Math.random()*250);
      var g = Math.floor(Math.random()*250);
      var b = Math.floor(Math.random()*250);
      return `rgb(${r},${g},${b})`;
    }
  }
});



/************消费统计图：使用第三方绘图库：FusionCharts***************/
var type = 'column2d';
FusionChart();
function FusionChart() {
  $.ajax({
    type: 'GET',
    url: 'php/15_buy_data.php',
    data: {uname: localStorage['loginName']},
    success: function (list) {
      //list形如：[{label:'',value:xx},{}]
      //使用FusionCharts绘制统计图
      var fc = new FusionCharts({
        type: type,//column2d、column3d、bar2d、bar3d、pie2d、pie3d、doughnut2d、doughnut3d
        width: '800',
        height: '400',
        dataSource: {     //指定数据源
          data: list
        }
      });
      fc.render('FusionCharts-diagram'); //指定渲染在哪个容器中
    }
  });
}
$('.FusionChart-sel select').change(function () {
  type = $(this).val();
  FusionChart();
});



/********************切换抽奖方法*****************/
$('.lottery').on('click','a',function(e){
  e.preventDefault();
  $(this).addClass('select').siblings('.select').removeClass('select');
  $($(this).attr('href')).addClass('select').siblings('.select').removeClass('select');
});

/*********页面加载完后，异步请求登录用户的抽奖统计信息**********/
$.ajax({
  type: 'GET',
  url: 'php/16_lottery_data.php',
  data: {uname: localStorage['loginName']},
  success: function (result) {
    //result形如：{uname:xx,uid:xx,totalCount:xx,usedCount:xx,leftCount:xx}
    if (result.leftCount <= 0) {
      $('#bt-lottery').css('background','#999');
      return;
    }
    $('#bt-lottery').html(`开始抽奖(总次数:${result.totalCount},剩余次数:${result.leftCount})`).
      prop('disabled', false); //启用按钮


    //绘制大转盘抽奖页面
    drawLottery();
    function drawLottery() {
      var progress = 0; //所有图片的加载进度
      var pan = new Image(); //圆盘图片
      pan.src = "images/pan.png";
      pan.onload = function () {
        progress += 80;
        if (progress == 100) {
          startDraw();
        }
      }
      var pin = new Image(); //指针图片
      pin.src = "images/pin.png";
      pin.onload = function () {
        progress += 20;
        if (progress == 100) {
          startDraw();
        }
      }
      function startDraw() {  //开始绘制圆盘和指针
        var canvas = document.querySelector('#canvas-lottery');
        canvas.width = pan.width;
        canvas.height = pan.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(pan, 0, 0);
        ctx.drawImage(pin, canvas.width / 2 - pin.width / 2, canvas.height / 2 - pin.height / 2);

        function wheel(){
          //允许旋转的总时长
          var duration = Math.random() * 4000 + 5000;
          //当前已经旋转的持续时长
          var last = 0;
          //当前已经旋转的角度数
          var degree = 0;

          //平移坐标系的原点——旋转的轴点——让它平移到画布中央
          ctx.translate(canvas.width / 2, canvas.height / 2);
          var timer = setInterval(function () {
            //degree += speedFn(duration,last);
            degree +=(2*(duration*duration)-8*duration);
            degree %= 360;  //360和0度是等价的
            //画笔旋转着画圆盘
            ctx.rotate(degree * Math.PI / 180);
            ctx.drawImage(pan, -pan.width / 2, -pan.height / 2);
            ctx.rotate(-degree * Math.PI / 180);
            //画笔正着画指针
            ctx.drawImage(pin, -pin.width / 2, -pin.height / 2);
            last += 16.7;
            //旋转时间到
            if (last >= duration) {
              //清除定时器
              clearInterval(timer);
              timer=null;
              $('#bt-lottery').prop('disabled', false).css('background','#01AF63');
              result.leftCount <= 0&&$(self).css('background','#01AF63');
              //把坐标系原点平移回到画布左上角，为下一次抽奖做准备
              ctx.translate(-canvas.width / 2, -canvas.height / 2);
              //判断所获奖项
              var level = 0;
              if (degree >= 270 && degree < 300) {
                level = 1;
              } else if ((degree >= 0 && degree < 30) || (degree >= 210 && degree < 240)) {
                level = 2;
              } else if ((degree >= 30 && degree < 60) || (degree >= 90 && degree < 120) || (degree >= 150 && degree < 180) || (degree >= 300 && degree < 330)) {
                level = 3;
              } else {
                level = 4;
              }
              //异步提交给服务器,保存抽奖信息
              requset(level);
            }
          }, 16.7);
        }

        //为“开始抽奖”按钮绑定一次监听函数
        $('#bt-lottery').on('click', function () {
          $(this).prop('disabled', true).css('background','#999');
          $('#bt-lottery').html(`开始抽奖(总次数:${result.totalCount}
                ,剩余次数:${--result.leftCount})`);
          var select=$('.lottery .select').html();
          if(select=='大转盘抽奖'){
            //调用大转盘抽奖
            wheel();
          }else{
            //调用九宫格抽奖
            nineLottery();
          }
        });

        //九宫格抽奖函数
        function nineLottery(){
          var y=Math.floor(Math.random()*9)+70;
          var i=0;
          var timer = setInterval(function () {
            var x=Math.floor(Math.random()*9);
            $('.div'+x).addClass('color').parents().siblings().find('.color').removeClass('color');
            i++;
            if (i>= y) { //旋转时间到
              //清除定时器
              clearInterval(timer);
              timer=null;
              $('#bt-lottery').prop('disabled', false).css('background','#01AF63');
              result.leftCount <= 0&&$(self).css('background','#01AF63');
              //判断所获奖项
              var level=0;
              if (x==4) {
                level = 1;
              } else if (x==0|| x==8) {
                level = 2;
              } else if (x==2|| x==6) {
                level = 3;
              } else {
                level = 4;
              }
              //异步提交给服务器,保存抽奖信息
              requset(level);
            }
          },30);
        }

        //给用户以提示并异步提交给服务器：lottery_add.php
        function requset(level){
          $.ajax({
            type: 'post',
            url: 'php/17_update_lottery.php',
            data: {level: level, uname: localStorage['loginName']},
            success: function (txt) {
              $('.level').html(level);
			  $('.modal-reward').fadeIn(300);
			  //alert('恭喜你抽得'+level+'奖');
			  $('.modal-reward button').click(function(){
					$('.modal-reward').fadeOut(300);
			  });
            }
          });
        }
      }
    }
  }
});





