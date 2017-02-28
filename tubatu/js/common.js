/**************获取全局变量登录用户名loginName******************/
var loginName = localStorage['loginName'];


/*************************************************************/
/******************加载网页头部，登录框和尾部*******************/
$(function () { //页面加载完成事件的回调
    //加载网页头部
    $('div#header').load('php/0_header.php', function () {
        //获取登录按钮处的内容
        if (loginName != undefined) {
            $("#welcome").html(loginName + ',&nbsp;&nbsp;欢迎回来' + '&nbsp;&nbsp;');
            $('#bt-Login').html('[退出]');
        }
    });
   // $('header#header').load(//'php/0_header.php', function () {
        //获取登录按钮处的内容
        if (loginName != undefined) {
            $("#welcome").html(loginName + ',&nbsp;&nbsp;欢迎回来' + '&nbsp;&nbsp;');
            $('#bt-Login').html('[退出]');
        }
    //}
    //);
    //加载网页登录框
    $('.modal').load('php/0_login_modal.php');
    //加载网页退出框
    $('.modal-quit').load('php/0_modal-quit.php');
    //加载网页尾部
    $('div#footer').load('php/0_footer.php');
});


/********************************************************/
/*****************点击登录按钮登录个人账号*****************/
$('#header').on("click", "#bt-Login", function (e) {
    e.preventDefault();
    var login=$("#bt-Login").html();
    if(login=='[登录]'){//登录账号
        $('.modal').fadeIn(300);
    }else{//退出账号
        $('.modal-quit').fadeIn(300);
        $('.modal-quit').on('click','.btn',function(){
            $('.modal-quit').fadeOut(300);
            if($(this).hasClass('btn-success')){
                localStorage.removeItem('loginName');
                $("#welcome").html('您好，欢迎来到土巴兔！' + '&nbsp;&nbsp;');
                $('#bt-Login').html('[登录]');
                $('.addcount').html(0);
            }
        });

    }
});


/*********************************************************/
/********************登录个人页面**************************/
$('body').on('click', '#submit-login', function () {
    var data = $('#login-form').serialize();
    $.ajax({
        type: 'post',
        url: 'php/0_login.php',
        data: data,
        success: function (txt) {
            if (txt == 'succ') {
                $('div.modal').fadeOut(300);
                var loginName = $('.modal [name="uname"]').val();
                localStorage['loginName'] = loginName;
                $("#welcome").html(loginName + ',&nbsp;&nbsp;欢迎回来&nbsp;&nbsp;');
                $('#bt-Login').html('[退出]');
            } else {
                $('.modal .alert').html('账号或密码输入错误');
            }
        },
        complete:function(){
            $.ajax({
                url:'php/5_cart_count.php',
                data:{uname:localStorage['loginName']},
                success:function(txt){
                    $('.addcount').html(txt);
                }
            });
        }
    });
});








































