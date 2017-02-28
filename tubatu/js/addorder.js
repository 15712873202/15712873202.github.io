/**********根据当前登录用户名，查询其购物车内容*********/
$(function () {
    $.ajax({
        url: 'php/10_cart_detail_settlement.php',
        data: {uname: localStorage['loginName']},
        success: function (detailList) {
            //遍历购物车详情列表，拼接HTML片段，添加到展示列表
            var html = '';
            var totalPrice = 0;  //购物车�?�金�?
            $.each(detailList, function (i, d) {
                totalPrice += d.tprice * d.count; //计算总金�?
                html += `
                    <tr>
                      <td>
                        <img src="${d.tpic}" width="50" >
                        <span>${d.tname}</span>
                      </td>
                      <td>${(d.tprice * 1).toFixed(2)}</td>
                      <td>${d.count}</td>
                      <td>${(d.tprice * d.count).toFixed(2)}</td>
                    </tr>
                `;
            });
            $('.list-order tbody').html(html);
            var tr = $('.list-order tbody tr');
            if (tr.length > 0) {
                if (totalPrice < 1000) {
                    totalPrice += 100;
                    $('.submit-freight').html(100.00);
                }
                $('.submit-price').html(totalPrice.toFixed(2));//修改总金�?
                $('input[name="price"]').val(totalPrice);
            }
            //精简购物车详情数组，编码为JSON字符串，赋�?�给input隐藏域用于表�?
            $.each(detailList, function (i, d) {
                delete(d.cartId);  //只保留productId和count
                delete(d.did);
                delete(d.tpic);
                delete(d.tname);
                delete(d.tprice);
            });
            var str = JSON.stringify(detailList); //把JS的数组编码为JSON字符�?
            $('input[name="productList"]').val(str);
        }
    });
});


/*******************************************************/
/**********根据当前登录用户名，查询其收货人信息*********/
$(function () {
    $.ajax({
        url: 'php/11_send_address.php',
        data: {uname: localStorage['loginName']},
        success: function (list) {
            var html = '';
            $.each(list, function (i, elem) {
                html += `
                    <div class="user-address" data-toggle=${elem.aid}>
                      <div class="default-address">
                        <span class="lace align align-top"></span>
                        <span class="lace align align-bottom"></span>
                        <span class="lace vertical vertical-left"></span>
                        <span class="lace vertical vertical-right"></span>
                        <ul class="detail-address">
                          <li>
                            <a class="rt to-default">设为默认</a>
                            <span class="name"><i></i><span class="rcvName">${elem.rcvName}</span></span>
                          </li>
                          <li><i></i><span class="telphone">${elem.telphone}</span></li>
                          <li>
                              <i></i>
                              <span class="provs">${elem.provs}</span>
                              <span class="cities">${elem.cities}</span>
                              <span class="address">${elem.address}</span>
                          </li>
                        </ul>
                        <i class="selected"></i>
                      </div>
                      <p >
                        <button class="rt btn btn-danger">删除</button>
                      </p>
                    </div>
                `;
            });
            $('.address-box').html(html);
        }
    });
});


/***********************************************************************************/
/*****************修改默认收货地址 div class='address-box'**************************/
$('.address-box').on('click', '.to-default', function (e) {
    e.preventDefault();
    if ($(this).html() == '设为默认') {
        $(this).html('默认地址')
            .parents('.user-address').addClass('default-use')
            .find('.lace').addClass('all-default-use')
            .siblings('.selected').addClass('all-default-use')
            .parents('.user-address').find('.btn').addClass('all-default-use');
        $(this).parents('.user-address')
            .siblings('.default-use').removeClass('default-use')
            .find('.all-default-use').removeClass('all-default-use')
            .parents('.user-address').find('.to-default').html('设为默认');
    }
});


/****************************************************************************************/
/*****************修改默认收货地址 div class='address-box'处的鼠标悬浮效果***************/
$('.address-box').on('mouseover', '.user-address', function () {
    $(this).find('.lace').addClass('hover')
        .siblings('.selected').addClass('hover')
        .parents('.user-address').find('.btn').addClass('hover');
});
$('.address-box').on('mouseout', '.user-address', function () {
    $(this).find('.lace').removeClass('hover')
        .siblings('.selected').removeClass('hover')
        .parents('.user-address').find('.btn').removeClass('hover');
});


/**************************************************************************************/
/*****************修改和删除收货地址 div class='.btn'***********************************/
$('.address-box').on('click', '.btn', function () {
    var provs = $(this).parents('.user-address').find('.provs').html();
    var cities = $(this).parents('.user-address').find('.cities').html();
    var rcvName = $(this).parents('.user-address').find('.rcvName').html();
    var address = $(this).parents('.user-address').find('.address').html();
    var telphone = $(this).parents('.user-address').find('.telphone').html();
    var self = $(this);
    var aid = $(this).parents('.user-address').attr('data-toggle');
    if ($(this).hasClass('btn-danger')) {
        $.ajax({
            type: 'post',
            url: 'php/11_delete_address.php',
            data: {aid: aid},
            success: function (txt) {
                if (txt == 'succ') {
                    $(self).parents('.user-address').remove();
                }
            }
        });
    }
});



/**************************************************************************************/
/***************添加收货人信息模态框的显示效果div class='address-modal'****************/
//打开模态框
$('.add-address').click(function () {
    $('.address-modal').fadeIn(300);
    $('.delete-modal').click(function (e) {
        e.preventDefault();
        $('.address-modal').fadeOut(300);
    });
});
//保存收货地址
$('.save-address').click(function () {
    $('.address-detail').find('b').css('display', 'none');
    var provs = $('#provs').val();
    var cities = $('#cities').val();
    var rcvName = $('.address-detail [name="uname"]').val();
    var address = $('.address-detail [name="address"]').val();
    var telphone = $('.address-detail [name="telphone"]').val();
    if (!provs && !cities) {
        $('#provs').siblings('b').css('display', 'block');
    } else if (!address) {
        $('.address-detail [name="address"]').siblings('b').css('display', 'block');
    } else if (!rcvName) {
        $('.address-detail [name="uname"]').siblings('b').css('display', 'block');
    } else if (!telphone) {
        $('.address-detail [name="telphone"]').siblings('b').css('display', 'block');
    } else {
        $('.address-modal').fadeOut(300);
        var html = $('.address-box').html();
        $.ajax({
            type: 'post',
            url: 'php/11_save_address.php',
            data: {
                username: localStorage['loginName'],
                provs: provs,
                cities: cities,
                rcvName: rcvName,
                telphone: telphone,
                address: address
            },
            success: function (txt) {
                html += `
                        <div class="user-address">
                          <div class="default-address">
                            <span class="lace align align-top"></span>
                            <span class="lace align align-bottom"></span>
                            <span class="lace vertical vertical-left"></span>
                            <span class="lace vertical vertical-right"></span>
                            <ul class="detail-address">
                              <li>
                                <a class="rt to-default">设为默认</a>
                                <span class="name"><i></i>${rcvName}</span>
                              </li>
                              <li><i></i>${telphone}</li>
                              <li>
                                <i></i>
                                <span class="provs">${provs}</span>
                                <span class="cities">${cities}</span>
                                <span class="address">${address}</span>
                              </li>
                            </ul>
                            <i class="selected"></i>
                          </div>
                          <p >
                            <button class="rt btn btn-danger">删除</button>
                            <button class="rt btn btn-success">修改</button>
                          </p>
                        </div>
                `;
                $('.address-box').html(html);
            }
        });
    }
});


/***********************************************************/
/***************发票信息div class='invoice'****************/
//修改发票信息
$('.modify').click(function(){
    $(this).fadeOut(300);
    $('.default-invoice').removeClass('default')
        .siblings('.invoice').addClass('default');
});
$('.invoice').on('click', '[name="invoice"]', function () {
    var chk = $(this).prop('checked');
    var style=$(this).next('i').html();
    var div = $(this).attr('data-toggle');
    if (chk) {
        $(div).addClass('checked').siblings('.checked').removeClass('checked');
    }
    $(div).on('click','button',function(){
        var input=$(div).find('input');
        var html=`
            <p>
                <span>发票类型</span>
                <span>${style}</span>
            </p>
        `;
        $.each(input,function(i,elem){
            html+=`
                <p>
                    <span>${$(elem).prev().html()}</span>
                    <span>${$(elem).val()}</span>
                </p>
            `;
        });
        $('.default-invoice').html(html);
        $('.default-invoice').addClass('default')
            .siblings('.invoice').removeClass('default');
        $('.modify').fadeIn(300);
    });
});



/**************************************************************/
/*****************表格中tfoot中的textarea**********************/
//保存teatarea中的值为全局变量
var textarea = $('tfoot textarea').val();
$('tfoot textarea').click(function () {
    $(this).val() == textarea && $(this).val('');
    $(this).animate({'height': '60px'}, 500);
});
$('tfoot textarea').blur(function () {
    $(this).animate({'height': '25px'}, 500);
    if ($(this).val() == '') {
        $(this).val(textarea);
    }
});


/***********************************************************/
/*****************支付方式div class='payment'****************/
$('.payment').on('click', 'a', function (e) {
    e.preventDefault();
    $(this).addClass('current').siblings('.current').removeClass('current');
    var i = $('.payment a').index(this); //0/1/2/3
    $('input[name="payment"]').val(i+1);
});


/********************************************************************/
/**********提交订单divclass='submit-orders'随着鼠标滚动的效果********/
$(document).scroll(function () {
    //获取楼梯相对于屏幕左边的距离
    if ($('body').scrollTop() > 400) {
        //�?.submit-orders移除固定定位
        $('.submit-orders').removeClass('submit-fixed');
    } else {
        //�?.submit-orders恢复固定定位
        $('.submit-orders').addClass('submit-fixed');
    }
});


/*************************************************************************/
/*********************  收货地址中的select切换城市功能 *********************/
var cities = [
    [],
    [{"name": "合肥", "value": "合肥"}, {"name": "六安", "value": "六安"},
        {"name": "蚌埠", "value": "蚌埠"}, {"name": "淮南", "value": "淮南"},
        {"name": "安庆", "value": "安庆"}, {"name": "黄山", "value": "黄山"}],
    [{"name": "沈阳", "value": "沈阳"}, {"name": "辽阳", "value": "辽阳"},
        {"name": "鞍山", "value": "鞍山"}, {"name": "锦州", "value": "锦州"},
        {"name": "大连", "value": "大连"}, {"name": "本溪", "value": "本溪"}],
    [{"name": "南京", "value": "南京"}, {"name": "苏州", "value": "苏州"},
        {"name": "无锡", "value": "无锡"}, {"name": "常州", "value": "常州"},
        {"name": "镇江", "value": "镇江"}, {"name": "徐州", "value": "徐州"}],
    [{"name": "杭州", "value": "杭州"}, {"name": "温州", "value": "温州"},
        {"name": "宁波", "value": "宁波"}, {"name": "绍兴", "value": "绍兴"},
        {"name": "嘉兴", "value": "嘉兴"}, {"name": "金华", "value": "金华"}],
    [{"name": "石家庄", "value": "石家庄"}, {"name": "秦皇岛", "value": "秦皇岛"},
        {"name": "保定", "value": "保定"}, {"name": "唐山", "value": "唐山"},
        {"name": "沧州", "value": "沧州"}, {"name": "承德", "value": "承德"}],
    [{"name": "东城", "value": "东城"}, {"name": "西城", "value": "西城"},
        {"name": "海淀", "value": "海淀"}, {"name": "大兴", "value": "大兴"},
        {"name": "通州", "value": "通州"}, {"name": "石景山", "value": "石景山"}],
    [{"name": "河东", "value": "河东"}, {"name": "河西", "value": "河西"},
        {"name": "南开", "value": "南开"}, {"name": "和平", "value": "和平"},
        {"name": "滨海", "value": "滨海"}, {"name": "宝坻", "value": "宝坻"}]
];
$('#provs').change(function () {
    var i = provs.selectedIndex;
    var selCts = $('#cities');
    if (i != 0) {
        var html = `<option value="">请选择</option>`;
        var city = cities[i];
        for (var i = 0; i < city.length; i++) {
            html += `<option value=${city[i].value}>${city[i].name}</option>`;
        }
        $('#cities').html(html);
    } else {
        $('#cities').html('<option value="请选择">请选择</option>');
    }
});



/*******************************************************/
/**********************点击提交订单***********************/
$('.submit-orders .btn').click(function(e){
  e.preventDefault();
  $('input[name="uname"]').val(localStorage['loginName']);
  //表单序列化，读取所有的要提交的数据
  var data = $('#form-order').serialize();
  console.log(data);
  $.ajax({
    type:'post',
    url:'php/12_add_order.php',
    data:data,
    success:function(result){
        //保存订单编号
        localStorage['orderNum'] = result.orderNum;
        //操作成功后删除购物车详情表中当前用户ischecked=1的商品信息
        $.ajax({
            type:'post',
            url:'php/13_delete_cart_detail.php',
            data:{uname:localStorage['loginName']},
            success:function(txt){
              if(txt=='succ'){
                  //跳转到下一页面
                  location.href='usercenter.html';
                }
            }
        });
    }
  });　
});














