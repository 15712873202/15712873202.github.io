/*****************刷新页面即将tbt_cart_detail中的ischecked归零****************/
$(function () {
    $.ajax({
        type: 'post',
        url: 'php/9_refreshChecked.php',
        data: {uname: localStorage['loginName']}
    });
});

/***********************判断购物车是否为空**************************/
function isShow() {
    var tr = $('#table_cart tbody tr');
    if (tr.length > 0) {
        $('#cart_full').css('display', 'block');
        $('#cart_empty').css('display', 'none');
    } else {
        $('#cart_full').css('display', 'none');
        $('#cart_empty').css('display', 'block');
    }
}

abs();
function abs() {
    /**************从后台为购物车插入数据**************/
    $(function () {
        $.ajax({
            url: 'php/6_shoppingcart_detail.php',
            data: {uname: loginName},
            success: function (detailList) {
                var html = '';
                $.each(detailList, function (i, list) {
                    html += `
                    <tr>
                    <td>
                        <input class= "lf" type = "checkbox" / >
                        <input type="hidden" value =${list.did}/>
                        <div><img src='${list.tpic}'/></div>
                    </td>
                    <td>
                        <a href="">${list.tname}</a>
                    </td>
                    <td class='table_price'>${list.tprice}</td>
                    <td>
                        <button class= 'table_calc'> - </button><input type="text" class='table_count' value='${list.count}'><button class='table_calc'>+</button>
                    </td>
                    <td>
                        <span class= 'sum_price' >${(list.tprice*list.count).toFixed(2)}</span>
                    </td>
                    <td>
                        <a href = "" class= 'table_delete' >删除</a>
                    </td>
                    </tr>
				    `;
                });
                $('#table_cart tbody').html(html);
                //调用结算去结算处价格函数
                calcSum();
            },
            complete: function () {
                //数据插入完毕后立即判断购物车是否为空
                isShow();
            }
        });
    });
}
$('body').on("click", "#submit-login", function (e) {
    e.preventDefault();
    abs();
});

/**********从后台为大家都在看请求数据 div class='hot-search'************/
$(function () {
    $.ajax({
        url: 'php/6_hot_search.php',
        success: function (list) {
            var html = '';
            $.each(list, function (i, elem) {
                html += `
                    <li>
                        <img src = "${elem.tpic}" width = "270" >
                        <div class= "hot-content" >
                            <p class= "hot-product" >${elem.tname} < / p >
                            <p class= "hot-price" > &yen;
                                ${elem.tprice}
                            </p>
                        </div>
                    </li>
                `;
            });
            $('.hot-list ul').html(html);
        },
        error: function (list) {
            console.log(list);
        }
    });
});

/***************改变购物车中购买商品数量**************/
$('#table_cart tbody').on('click', 'button.table_calc', function () {
    var self = this;
    var calc = $(this).html();
    var count = parseInt($(this).siblings('input').val());
    var price = $(this).parent().siblings('.table_price').html();
    if (calc == '-' && count > 1) {
        count--;
    }
    if (calc == '+') {
        count++;
    }
    $(this).siblings('input').val(count);
    var did = $(this).parent().siblings().children("[type='hidden']").attr('value');
    $.ajax({
        type: 'post',
        url: 'php/7_shoppingcart_update.php',
        data: {count: count, did: did},
        success: function (txt) {
            if (txt == 'succ') {
                $(self).siblings('input').val(count);
                $(self).parent().siblings().children(".sum_price").html((count * price).toFixed(2));
                //更新去结算处的总价
                calcSum();
            } else {
                console.log('修改失败');
            }
        }
    });
});

/*******************计算去结算处的总价******************/
function calcSum() {
    //此处只选择和计算勾选的商品数量及其总价
    var $sumPrice = $('.sum_checked');
    var $sumCount = $('.checked_count');
    var total_price = 0;
    var all_Count = 0;
    $.each($sumPrice, function (i, elem) {
        total_price += parseInt($(elem).html());
    });
    $.each($sumCount, function (i, elem) {
        all_Count += parseInt($(elem).val());
    });
    $('.all_sum').html(total_price.toFixed(2));
    $('.all_count').html(all_Count);
}

/*******************勾选所有checkbox*******************/
$('#selAll').click(function () {
    var $chbs = $('#table_cart tbody :checkbox');
    var self = $(this);
    var ischecked = 0;
    $.each($chbs, function (i, elem) {
        $(elem).prop('checked', $(self).prop('checked'));
    });
    if ($(this).prop('checked')) {
        //修改购买商品的状态为1
        ischecked = 1;
    }
    //调用勾选商品函数
    checkBox();
    //调用去结算处价格函数
    calcSum();
    //到后台改变所选商品的状态
    $.ajax({
        type: 'post',
        url: 'php/9_isAllChecked.php',
        data: {ischecked: ischecked, uname: localStorage['loginName']}
    });
});

/****************************************************************/
/***************************调用勾选商品函数**********************/
function checkBox() {
    var $checked = $('tbody [type="checkbox"]');
    $.each($checked, function (i, elem) {
        //$(elem).prop('checked',$(self).prop('checked'));
        //如果勾选了此商品，则分别为其计算价格处和计算数量处添加class属性值sum_checked和checked_count
        if ($(elem).prop("checked")) {
            $(elem).parent()
                .siblings()
                .children(".sum_price").addClass('sum_checked');
            $(elem).parent()
                .siblings()
                .children(".table_count").addClass('checked_count');
        } else {
            //如果没勾选此商品，则分别为其计算价格处和计算数量处删除class属性值sum_checked和checked_count
            $(elem).parent()
                .siblings()
                .children(".sum_price").removeClass('sum_checked');
            $(elem).parent()
                .siblings()
                .children(".table_count").removeClass('checked_count');
        }
    });
}
/****************勾选checkbox计算去结算处价格*************/
$('#table_cart').on('click', 'tbody :checkbox', function () {
    var a = 0;
    var did = $(this).next().val();
    var ischecked = 0;
    //调用勾选商品函数
    checkBox();
    //调用去结算处价格函数
    calcSum();
    if (!$(this).prop('checked')) {
        $("#table_cart thead :checkbox").prop('checked', false);
        tophp();
        return;
    } else {
        ischecked = 1;
        tophp();
        var $chbs = $('#table_cart tbody :checkbox');
        $.each($chbs, function (i, elem) {
            if ($(elem).prop('checked') == false) {
                $('#selAll').prop('checked', false);
                a = 1;
                return;
            }
        });
    }
    if (a == 0) {
        $('#selAll').prop('checked', true);
    }
    //到后台改变所选商品的状态
    function tophp() {
        $.ajax({
            type: 'post',
            url: 'php/9_isChecked.php',
            data: {did: did, ischecked: ischecked, uname: localStorage['loginName']}
        });
    }
});

/***************删除购买商品**************/
$('#table_cart tbody').on('click', 'a.table_delete', function (e) {
    e.preventDefault();
    var self = this;
    $('.delete-modal').css('display', 'block');
    $('.delete-modal p.delete').click(function () {
        $('.delete-modal').css('display', 'none');
    });
    $('.delete-modal').on('click', '.btn', function () {
        if ($(this).hasClass('btn-danger')) {
            var did = $(self).parent().siblings().children("[type='hidden']").attr('value');
            $.ajax({
                type: 'post',
                url: 'php/8_shoppingcart_detail_delete.php',
                data: {did: did},
                success: function (txt) {
                    if (txt == 'succ') {
                        $(self).parent().parent().remove();
                        calcSum();//调用结算去结算处价格函数
                    } else {
                        alert('删除失败');
                    }
                },
                complete: function () {
                    //调用函数判断购物车是否为空
                    isShow();
                }
            });
        }
        $('.delete-modal').css('display', 'none');
    });
});



/***********大家都在看 div class='hot-search'**********/
//保存左移的次数
var count = 0;
//保存左移的距离
var moved = 0;
//保存每次移动的距离
var width = 1220;
//保存可左移的最大次数
var max = 24;
//为div添加单击事件代理，仅a能响应事件

//$('.hot-list').on('click','span',function(){
$('.hot-list>span').click(function(){
    console.log(111);
    //查找class属性以left开头的a，保存在$left
    var $left = $("a[class^='left']");
    //查找class属性以right开头的a，保存在$right
    var $right = $("a[class^='right']");

    //如果moved等于0
    if (count == 0) {
        //给$left添加disabled
        $left.addClass('disabled');
        moved = 0;
        //$('.hot-list ul').css('left',moved);
    } else if (count == max ){
        //否则，如果count等于max,给$right添加disabled
        $right.addClass('disabled');
        moved = -24 * width;
        //$('.hot-list ul').css('left',moved);
    } else {//$left和$right的class移除disabled
        if($(this)==$left){
            $left.removeClass('disabled');
            count--;
        }else{
            $right.removeClass('disabled');
            count++;
        }
        moved = -count * width;
    }
    $('.hot-list ul').css('left', moved);
});

