$(function () {// 文档就绪

    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
//验证是否已经登陆
    $.ajax({
        url:"http://localhost:3000/users/isLog",
        type:"get",
        dataType:"json",
        xhrFields: {
                    withCredentials: true
        },
        success:function (data) {
            if(data.res == "ok"){
                //setCookie("username",user.value,1);
                console.log("已登录了喔~");
                var url = "weicloudhome.html";
                $('body').load(url);
            }

        }
    })


    $("input[type='email']").blur( function() {
        var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
        if(   reg1.test( $('input[type=email]').val() ) == false && $('input[type=email]').val().length!=0) {
            $("input[type='email']").css('border-color','red');/*,'background-color','red','opacity','0.5'*/
            $("input[type='email']").css('background-color','#9f0f17');
            $("input[type='email']").css('opacity','0.5');
        }

    });
    $("input[type='email']").focus(function () {
        $("input[type='email']").css('border-color','');/*,'background-color','red','opacity','0.5'*/
        $("input[type='email']").css('background-color','');
        $("input[type='email']").css('opacity','1');
    })

    $("input[type='text']").blur( function() {

        if( /^\+?[a-zA-Z]*$/.test( $('input[type=text]').val() ) == false && $('input[type=text]').val().length!=0 ) {
            $("input[type='text']").css('border-color','red');/*,'background-color','red','opacity','0.5'*/
            $("input[type='text']").css('background-color','#9f0f17');
            $("input[type='text']").css('opacity','0.5');
        }
    });
    $("input[type='text']").focus(function () {
        $("input[type='text']").css('border-color','');/*,'background-color','red','opacity','0.5'*/
        $("input[type='text']").css('background-color','');
        $("input[type='text']").css('opacity','1');
    })


    $('li:nth-child(3)').on('click', function(e) {
           e.preventDefault();  // 阻止链接跳转
        var url = "weicloud%20resigster.html";
        $('li:nth-child(1)').removeClass('current');
        $(this).addClass('current');
        $('article').load(url).fadeIn('slow'); // 加载新内容,url地址与该地址下的选择器之间要有空格,表示该url下的#container
         });
    
    $("button[type='button']").click(function () {
        var url = "weicloud%20resigster.html";
        $('li:nth-child(1)').removeClass('current');
        $(this).addClass('current');
        $('article').load(url);
    })

    $(".btn-danger").click(function (event) {
        event.preventDefault();
        //button的默认行为会使页面刷新，至登录无法实现
        var usernum = $("#inputnum3").val();
        var pwd = $("#inputPassword3").val();
        $.ajax({
            url:"http://localhost:3000/users/login",
            type:"get",
            data:{username:usernum,password:pwd},
            dataType:"JSON",
            xhrFields: {
                withCredentials: true
            },
            success: function(data){
                if(data.res == "ok"){
                    console.log(usernum)
                    setCookie("username",usernum,1);
                    alert("登录成功！");
                    var url = "weicloudhome.html";
                    $('li:nth-child(1)').removeClass('current');
                    $('body').load(url);

                }
                else{
                    alert("抱歉，账号或密码出错了呢~");
                }
            }
        })
    })

    $("#register").click(function (event) {
        event.preventDefault();
        var url = "weicloud%20resigster.html";
        $('article').load(url).fadeIn('slow');// 加载新内容,url地址与该地址下的选择器之间要有空格,表示该url下的#container
    })
});