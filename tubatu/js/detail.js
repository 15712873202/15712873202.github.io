/*****************实现放大镜处图片的传入**********************/
$(function () {
    //轮播图片的传入
    $.ajax({
        url: 'php/1_slider_picture.php',
        success: function (list) {
            var html = '';
            $.each(list, function (i, elem) {
                html += `
                    <li>
                      <img src=${elem.spic}>
                    </li>
				`;
            });
            $('#icon_list').html(html);
        }
    });
    //15个商品种类图片的传入
    var tstyle = 'zoom';
    $.ajax({
        url: 'php/2_zoom_product.php',
        data: {tstyle: tstyle},
        success: function (list) {
            var html = '';
            $.each(list, function (i, elem) {
                html += `
                    <li>
                      <img src=${elem.tpic}>
                      ${elem.tname}
                      <input type="hidden" value="${elem.tid}"/>
                    </li>
                `;
            });
            $('.color_class').html(html);
        }
    });
    //购物车处加入购物车中的商品数量
    if(loginName != undefined){
        $.ajax({
            url:'php/5_cart_count.php',
            data:{uname:localStorage['loginName']},
            success:function(txt){
                $('.addcount').html(txt);
            }
        });
    }
});


/***********************************************************************/
/*****************将商品信息展示在商品列表中******************************/
var $general = $('#main .general');
$.each($general, function (i, elem) {
    var tstyle = $(elem).attr('id');

    /*********************加载完毕默认显示第一页********************/
    $(function () {
        loadProductByPage(1);
    });

    /*********************点击上部实现页面跳转**********************/
    $(elem).on('click', 'header .jump', function () {
        var content = $(this).html();
        var page = $(elem).find('ol.pager li.active a').html();
        var $start = $(this).siblings().find('.start')
        var $end = $(this).siblings().find('.end');
        var end = $end.html();
        if (content == '&lt;' && page == 2) {
            $(this).addClass('stop');
            --page;
        } else if (content == '&gt;' && page == end - 1) {
            $(this).addClass('stop');
            ++page;
        } else if (content == '&lt;' && page > 2) {
            $(this).siblings('.jump').removeClass('stop');
            --page;
        } else if (content == '&gt;' && page < end - 1) {
            $(this).siblings('.jump').removeClass('stop');
            ++page;
        }
        $start.html(page);
        loadProductByPage(page);
    });

    /***********点击分页条中的页号时，实现数据的异步加载**************/
    $(elem).on('click', 'ol.pager a', function (e) {
        //阻止跳转行为
        e.preventDefault();
        //获取要跳转的页号
        var pageNum = $(this).attr('href');
        loadProductByPage(pageNum);
        var $target = $(this).parent().parent().siblings().find('.start');
        $target.html(pageNum);
        var count = $target.siblings('.end').html();
        if (pageNum == 1) {
            $target.parent().siblings('.before').addClass('stop');
        } else if (pageNum == count) {
            $target.parent().siblings('.after').addClass('stop');
        } else {
            $target.parent().siblings('.jump').removeClass('stop');
        }
    });

    /***********点击价格、销量和好评分别进行排序**************/
    $(elem).on('click', 'header ul li', function (e) {
        e.preventDefault();
        var $target = $(e.target);
        e.target.nodeName == 'A' && ($target = $target.parent());
        $target.addClass('current').siblings('.current').removeClass('current');
        //获取要跳转的页号
        var pageNum= $(elem).find('.pager .active a').html();
        loadProductByPage(pageNum);
    });

    /****************分页加载商品数据，并动态创建分页条***************/
    function loadProductByPage(pageNum) {
        var rank = $(elem).find('header .current a').attr('href');
        $.ajax({
            url: 'php/3_product_select.php',
            data: {tstyle: tstyle, pageNum: pageNum, rank: rank},
            success: function (pager) {
                $(elem).find('header ol .end').html(pager.pageCount);
                var html = '';
                $.each(pager.data, function (i, list) {
                    html += `
                      <li>
                        <a href=""><img src=${list.tpic}></a>
                        <p>￥${list.tprice}</p>
                        <h1><a href="">${list.tname}</a></h1>
                        <div>
                          <a class="contrast"><b>${list.buyed}</b>销量</a>
                          <a class="p-operate"><b>${list.love}</b>好评</a>
                          <a href="${list.tid}" class="addcart"><i></i>加入购物车</a>
                        </div>
                      </li>
                    `;
                });
                $(elem).find('ul.general_style').html(html);
                var html = '';
                if (pager.pageNum - 2 > 0) {
                    html += `<li><a href="${pager.pageNum - 2}">${pager.pageNum - 2}</a></li> `;
                }
                if (pager.pageNum - 1 > 0) {
                    html += `<li><a href="${pager.pageNum - 1}">${pager.pageNum - 1}</a></li> `;
                }
                html += `<li class="active"><a href="#">${pager.pageNum}</a></li> `;
                if (pager.pageNum + 1 <= pager.pageCount) {
                    html += `<li><a href="${pager.pageNum + 1}">${pager.pageNum + 1}</a></li> `;
                }
                if (pager.pageNum + 2 <= pager.pageCount) {
                    html += `<li><a href="${pager.pageNum + 2}">${pager.pageNum + 2}</a></li> `;
                }
                $(elem).find('ol.pager').html(html);
            }
        });
    }
});


/***********************************************************/
/*****************实现开始的放大镜及附属效果******************/
var zoom = {
    moved: 0,//保存左移的li个数
    WIDTH: 60,//保存每个li的宽度
    OFFSET: 20,//保存ul的起始left值
    MAX: 3,//保存可左移的最多li个数
    MSIZE: 200,//保存mask的大小
    MAXLEFT: 200, MAXTOP: 200,//保存mask可用的最大坐标
    csuit: null,//保存套装中商品的数量
    init: function () {
        //为id为preview下的div添加单击事件代理，仅a能响应事件，事件处理函数为move
        $("#smallDiv").on(
            "click", "a", this.move.bind(this));
        //为id为icon_list的ul添加鼠标进入事件代理，仅li下的img可响应事件，处理函数为changeImgs
        $("#icon_list").on(
            "mouseenter", "li>img", this.changeImgs);
        //为id为superMask的div添加hover事件,切换mask的显示和隐藏,再绑定鼠标移动事件为moveMask
        $("#superMask").hover(this.toggle, this.toggle)
            .mousemove(this.moveMask.bind(this));
        //为class为color_class下的ul添加单击事件代理，仅img能响应事件，事件处理函数为proDetail
        $('.color_class').on('click', 'li', this.proDetail.bind(this));
    },
    moveMask: function (e) {
        var x = e.offsetX;//获得鼠标相对于父元素的x
        var y = e.offsetY;//获得鼠标相对于父元素的y
        //计算mask的left: x-MSIZE/2
        var left = x - this.MSIZE / 2;
        //计算mask的top: y-MSIZE/2
        var top = y - this.MSIZE / 2;
        //如果left越界，要改回边界值
        left = left < 0 ? 0 : left > this.MAXLEFT ? this.MAXLEFT : left;
        //如果top越界，要改回边界值
        top = top < 0 ? 0 : top > this.MAXTOP ? this.MAXTOP : top;
        //设置id为mask的元素的left为left,top为top
        $("#mask").css({left: left, top: top});
        //设置id为largeDiv的背景图片位置:
        $("#largeDiv").css(
            "backgroundPosition",
            -left * 2 + "px " + -top * 2 + "px");
        this.fn();//页面加载完成后立即调用大图
    },
    toggle: function () {//切换mask的显示和隐藏
        $("#mask").toggle();
        $("#largeDiv").toggle();
    },
    move: function (e) {//移动一次
        var $target = $(e.target);//获得目标元素$target
        var btnClass = $target.attr("class");
        //如果btnClass中没有disabled
        if (btnClass.indexOf("disabled") == -1) {
            //如果btnClass以forward开头
            //将moved+1
            //否则
            //将moved-1
            this.moved += btnClass.indexOf("forward") != -1 ? 1 : -1;
            //设置id为icon_list的ul的left为-moved*WIDTH+OFFSET
            $("#icon_list").css("left", -this.moved * this.WIDTH + this.OFFSET);
            this.checkA();//检查a的状态:
        }
    },
    checkA: function () {//检查两个a的状态
        //查找class属性以backward开头的a，保存在$back
        var $back = $("a[class^='backward']");
        //查找class属性以forward开头的a，保存在$for
        var $for = $("a[class^='forward']");
        if (this.moved == 0) {//如果moved等于0
            //设置$back的class为backward_disabled
            $back.attr("class", "backward_disabled");
        } else if (this.moved == this.MAX) {
            //否则，如果moved等于MAX
            //设置$for的class为forward_disabled
            $for.attr("class", "forward_disabled");
        } else {//否则
            //$back的class为backward
            $back.attr("class", "backward");
            //$for的class为forward
            $for.attr("class", "forward");
        }
    },
    changeImgs: function (e) {//根据小图片更换中图片
        //获得目标元素的src属性，保存在变量src中
        var src = $(e.target).attr("src");
        //查找src中最后一个.的位置i
        var i = src.lastIndexOf(".");
        //设置id为mImg的元素的src为:
        //src从开头-i 拼上-m  拼上src从i到结尾
        $("#mImg").attr("src", src.slice(0, i) + "-m" + src.slice(i));
        $("#largeDiv").css("backgroundImage", "url(" + src.slice(0, i) + "-l" + src.slice(i) + ")");
    },
    proDetail: function (e) {
        //获得目标元素的src属性，保存在变量src中
        var $target = $(e.target);
        e.target.nodeName != "LI" && ($target = $target.parent());
        $target.addClass('selected').siblings('.selected').removeClass('selected');
        var src = $target.find('img').attr("src");
        //查找src中最后一个.的位置i
        var i = src.lastIndexOf(".");
        //设置id为mImg的元素的src为:
        //src从开头-i 拼上-m  拼上src从i到结尾
        $("#mImg").attr("src", src.slice(0, i - 2) + "-m" + src.slice(i));
        $("#largeDiv").css("backgroundImage", "url(" + src.slice(0, i - 2) + "-l" + src.slice(i) + ")");
        this.csuit = parseInt($target.text());
        var price = 50;
        var discount = null;
        if (this.csuit == 1) {
            discount = 8;
        } else if (this.csuit == 3) {
            discount = 7;
        } else if (this.csuit == 5) {
            discount = 6;
        }
        $('.discount').html('<i></i>' + discount + '.0折');
        $('.sum_price').html('&yen;' + price * this.csuit);
        $('.sum_discount').html('&yen;' + price * this.csuit * discount / 10);
    },
    fn: function (e) {
        //获得目标元素的src属性，保存在变量src中
        var src = $('#mImg').attr("src");
        var i = src.lastIndexOf(".");
        $("#largeDiv").css("backgroundImage", "url(" + src.slice(0, i - 2) + "-l" + src.slice(i) + ")");
    }
}
zoom.init();


/*****************************************************************/
/**********************改变放大镜处购买数量************************/
$('#count').on('click', '.calc', function () {
    var calc = $(this).html();
    var buy_count = $(this).siblings('input').val();
    if (calc == '-' && buy_count > 1) {
        buy_count--;
    } else if (calc == '+') {
        buy_count++;
    }
    $(this).siblings('input').val(buy_count);
});


/***********************************************************/
/*********************购物车中订单和优惠券********************/
function mouseon() {
    $(this).find('.bound_box').animate({left: '-101px', zIndex: 10}, 350);
}
function mouseout() {
    $(this).find('.bound_box').animate({zIndex: -10}, 0).animate({left: '0px'}, 350);
}
$('#order').hover(mouseon, mouseout);
$('#coupons').hover(mouseon, mouseout);



/***********************************************************************/
/*******************回到顶部to_top和楼梯随着鼠标滚动的效果*****************/
$(document).scroll(function () {
    //获取楼梯相对于屏幕左边的距离
    var w = $('#elevator').offset().left;
    if ($('body').scrollTop() >= 500) {
        //让楼梯固定定位
        $('#elevator').addClass('fixed')
            .css('left', w)
            .css('top', '200px');
        //让to_top显示出来
        $('a.to_top').css('display', 'block');
    } else {
        //让楼梯恢复默认情况
        $('#elevator').removeClass('fixed');
        //让to_top隐藏起来
        $('a.to_top').css('display', 'none');
    }
});


/********************************************************************/
//保存加入购物车的商品数量全局变量
var addcount = parseInt($('.addcount').html());


/**************************放大镜处加入购物车**************************/
$('.buy_submit .add_cart').click(function (e) {
    e.preventDefault();


    /**********实现数据到数据库的变化***********/
    var count = parseInt($('.buy_count').val());
    var pid = $(this).parent().siblings().find('.selected [type="hidden"]').val();
    $.ajax({
        type: 'post',
        url: 'php/4_cart_add.php',
        data: {pid: pid, count: count, uname: localStorage['loginName']},
        success: function () {
            console.log('加入购物车成功，而且数据成功保存到数据库');
        }
    });


    /**********实现加入购物车的动态效果***********/
    addcount += count;
    var iconcart = $('.iconcart');
    var addImg = $(this).parent().siblings().find('.selected').eq(0);
    var cloneImg = addImg.clone();
    cloneImg.css({
        'position': 'absolute',
        'top': addImg.offset().top,
        'left': addImg.offset().left,
        'z-index': '1000',
        'opacity': '1',
    }).appendTo($('body')).animate({
        'top': iconcart.offset().top,
        'left': iconcart.offset().left
    }, 1000, function () {
        cloneImg.animate({
            'width': '0',
            'height': '0'
        }, function () {
            $('.addcount').html(addcount);
            //调用函数判断是否需要改变字体大小
            changFont();
            $(this).remove();
        });
    });
});


/***********************************************************************/
/**************改变购物车处加入购物车商品的数量的字体大小******************/
function changFont() {
    if (addcount > 99) {
        $('.addcount').css('fontSize', '10px');
    } else {
        $('.addcount').css('fontSize', '14px');
    }
}


/***********************************************************************/
/**************************加入购物车的动态效果**************************/
$('body').on('click', '.addcart', function (e) {
    e.preventDefault();
    /***********************实现与后台的交互********************/
    var count = 1;
    var pid = $(this).attr('href');
    $.ajax({
        type: 'post',
        url: 'php/4_cart_add.php',
        data: {pid: pid, count: count, uname: localStorage['loginName']},
        success: function () {
            console.log('加入购物车成功，而且数据成功保存到数据库');
        },
    });


    /*****************实现加入购物车的动态效果*******************/
    var iconcart = $('.iconcart');
    var addImg = $(this).parent().siblings().find('img').eq(0);
    var cloneImg = addImg.clone();
    cloneImg.css({
        'width': '250px',
        //'height': '250px',
        'position': 'absolute',
        'top': addImg.offset().top,
        'left': addImg.offset().left,
        'z-index': '1000',
        'opacity': '1'
    }).appendTo($('body')).animate({
        'width': '50px',
        //'height': '50px',
        'top': iconcart.offset().top,
        'left': iconcart.offset().left
    }, 1000, function () {
        cloneImg.animate({
            'width': '0',
            'height': '0'
        }, function () {
            $('.addcount').html(++addcount);
            //调用函数判断是否需要改变字体大小
            changFont();
            $(this).detach();
        });
    });
});


/******************楼梯效果div id='elevatir'*****************/
/***********************************************************/
var elevator = {
    FHEIGHT: 0,//保存楼层div的高度
    //保存亮灯区域上下边界距文档显示区顶部距离
    UPLEVEL: 0, DOWNLEVEL: 0,
    DURATION: 1000,//动画持续时间
    init: function () {
        //var $general=$('#main .general');
        //$.each($general,function(i,elem){
        //.general的高+#.general的marginBottom
        this.FHEIGHT = parseFloat($('.general').css("height")) + parseFloat($('.general').css("marginBottom"));
        //楼层div的的this.UPLEVEL=(innerHeight-FHEIGHT)/2
        this.UPLEVEL = (innerHeight - this.FHEIGHT) / 2
        //楼层div的的this.DOWNLEVEL=UPLEVEL+FHEIGHT
        this.DOWNLEVEL = this.UPLEVEL + this.FHEIGHT;
        //});
        //为document绑定scroll事件为scroll方法
        $(document).scroll(this.scroll.bind(this));
        //为#elevator下的ul添加click事件代理,只有li才能响应事件
        $("#elevator ul").on("click", "li", function (e) {
                //停止body上的动画，清空队列
                $("body").stop(true);
                var $target = $(e.target);
                if (e.target.nodeName == "I") {//如果target是i
                    $target = $target.parent();//就改为其父元素
                }
                $target.addClass('active').siblings('.active').removeClass('active');
                //获得$target在所有li中的下标i
                var i = $target.index("#elevator ul>li");
                //查找当前.general的具有相同下标i的div
                var $div = $("#main .general:eq(" + i + ")");
                //启动动画，让body在DURATION时间内，滚动到div距页面顶部的总距离-UPLEVEL
                $("body").animate(
                    {scrollTop: $div.offset().top - this.UPLEVEL},
                    this.DURATION
                );
            }.bind(this)
        );
    },


    /*********************响应document的scroll事件*********************/
    scroll: function () {
        //查找.general下的div，对每个元素执行:
        var $general = $('#main .general');
        $.each($general, function (i, elem) {
            //.general的高+#.general的marginBottom
            this.FHEIGHT = parseFloat($(elem).css("height")) + parseFloat($(elem).css("marginBottom"));
            //楼层div的的this.UPLEVEL=(innerHeight-FHEIGHT)/2
            this.UPLEVEL = (innerHeight - this.FHEIGHT) / 2
            //楼层div的的this.DOWNLEVEL=UPLEVEL+FHEIGHT
            this.DOWNLEVEL = this.UPLEVEL + this.FHEIGHT;
            //获取当前元素elem距页面顶部的总距离totalTop
            var totalTop = $(elem).offset().top;
            //获取body滚动过的距离scrollTop
            var scrollTop = $("body").scrollTop();
            //用totalTop-scrollTop，保存在innerTop
            var innerTop = totalTop - scrollTop;
            //如果innerTop>UPLEVEL且<=DOWNLEVEL
            if (innerTop > this.UPLEVEL && innerTop <= this.DOWNLEVEL) {
                //设置当前div对应的相同下标的elevator中的li的class为active
                $("#elevator ul>li:eq(" + i + ")").addClass('active');
            } else {
                //移除elevator中的li的兄弟的的class为active
                $("#elevator ul>li:eq(" + i + ")").removeClass('active');
            }
        }.bind(this));
    }
}
elevator.init();









































































