/******定义全局变量，判断是否可以注册******/
var uname = false;
var upwd = false;
var reupwd = false;
var tel = false;
var email = false;
var authcode = false;


/******表单获得焦点时的操作********/
$('input').focus(function () {
  $(this).next('.comment').fadeIn(300)
    .removeClass('false').removeClass('true');
  var self=$(this).attr('name');
  if(self=='uname'){
    uname = false;
    $(this).next('.comment').html('6-20位，不能以数字开头');
  }else if(self=='upwd'){
    upwd = false;
    $(this).next('.comment').html('密码长度6-12位');
  }else if(self=='reupwd'){
    reupwd = false;
    if(upwd){
      $(this).next('.comment').html('俩次输入密码必须相同');
    }else{
      $(this).next('.comment')
          .addClass('false').html('请输入密码后再输入');
    }
  }else if(self=='tel'){
    tel = false;
    $(this).next('.comment').html('手机号码必须有效');
  }else if(self=='email'){
    email = false;
    $(this).next('.comment').html('邮箱格式必须有效');
  }
});


/*******验证用户名********/
$('#uname').blur(function () {
  var $uname = $(this).val();
  var res = /^\d\s{5,19}$/g;
  if ($uname == '') {
    $(this).next('.comment').html('不能为空').addClass('false');
  } else if ($uname.length < 6) {
    $(this).next('.comment').html('不能少于6位').addClass('false');
  } else if (res.test($uname)) {
    $(this).next('.comment').html('不能以数字开头').addClass('false');
  } else {
    $.ajax({
      type: 'post',
      url: 'php/0_register_confirm_uname.php',
      data: {uname: $uname},
      success: function (txt) {
        if (txt == 'succ') {
          $('#uname').next('.comment').html('用户名已存在').addClass('false');
        } else if (txt == 'err') {
          $('#uname').next('.comment').html('').addClass('true');
          uname = true;
        }
      }
    });
  }
});


/***********验证密码**********/
$('#upwd').blur(function () {
  var $upwd = $(this).val();
  var res = /^\d{6,8}$/g;
  if ($upwd == '') {
    $(this).next('.comment').html('不能为空').addClass('false');
  } else if ($upwd.length < 6) {
    $(this).next('.comment').html('不能少于6位').addClass('false');
  } else if (res.test($upwd)) {
    $(this).next('.comment').html('不能是少于9位的纯数字').addClass('false');
  } else {
    $('#upwd').next('.comment').html('').addClass('true');
    upwd = true;
  }
});


/***********再次验证密码**********/
$('#reupwd').blur(function () {
  var $upwd = $('#upwd').val();
  var $reupwd = $(this).val();
  if(upwd) {
    if ($reupwd != $upwd) {
      $(this).next('.comment').html('俩次输入密码必须相同').addClass('false');
    } else {
      $(this).next('.comment').html('').addClass('true');
      reupwd = true;
    }
  }
});


/***********验证手机号码**********/
$('#tel').blur(function () {
  var $tel = $(this).val();
  var res = /^1[3578]\d{9}$/g;
  if ($tel == '') {
    $(this).next('.comment').html('不能为空').addClass('false');
  } else if (!res.test($tel)) {
    $(this).next('.comment').html('号码无效').addClass('false');
  } else {
    $(this).next('.comment').html('').addClass('true');
    tel = true;
  }
});


/***********验证邮箱**********/
$('#email').blur(function () {
  var $email = $(this).val();
  var res = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
  if ($email == '') {
    $(this).next('.comment').html('邮箱不能为空').addClass('false');
  } else if (!res.test($email)) {
    $(this).next('.comment').html('邮箱格式有误').addClass('false');
  } else {
    $(this).next('.comment').html('').addClass('true');
    email = true;
  }
});


/***********验证验证码*************/
$('#authcode').blur(function () {
  var $authcode = $("#authcode").val();
  $.ajax({
    type: 'post',
    url: 'php/0_register_tm.php',
    data: {authcode: $authcode},
    success: function (result) {
      if (result == 'ok') {
        authcode = true;
      }
    }
  });
});

/***************切换验证码图片************/
$('.change-img').click(function () {
  $(this).prev('.code-img').attr("src",'php/0_register_vcode.php?' + Math.random());
});

/********************点击立即注册****************/
$('#bt-register').click(function () {
  if (uname && upwd && reupwd && tel && email && authcode) {
    var data = $('#form-register').serialize();
    console.log(data);
    $.ajax({
      type: 'post',
      url: 'php/0_register.php',
      data: data,
      success: function () {
        $('.modal-register').fadeIn(300);
      }
    });
  }
});












