$(function () {// 文档就绪
    $("#inputPassword3").val("");
    $("#sureOr").val("");

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
    $("#sureOr").mouseenter(function () {
        //console.log("yes")
        if($("#inputPassword3").val().length!=0){
            $("#sureOr").attr("disabled",false);
        }
        else{$("#sureOr").attr("disabled",true);}
    })

    $("#sureOr").blur(function () {
        if($("#inputPassword3").val() != $("#sureOr").val() && $("#sureOr").val().length!= 0){
            $("#sureOr").css('border-color','red');
            $("#sureOr").css('background-color','#9f0f17');
            $("#sureOr").css('opacity','0.5');
        }
        else{
            $("#sureOr").css('border-color','');
            $("#sureOr").css('background-color','');
            $("#sureOr").css('opacity','1');
        }
        $("#sureOr").focus(function () {
            $("#sureOr").css('border-color','');
            $("#sureOr").css('background-color','');
            $("#sureOr").css('opacity','1');
        })
    })
    $('li:nth-child(4)').on('click', function(e) {
        e.preventDefault();  // 阻止链接跳转
        var url = "腾讯微云登录.html";
        $('li:nth-child(3)').removeClass('current');
        $(this).addClass('current');
        window.location.href = url;
    });

    $(".btn-danger").click(function () {
        var usernum = $("#inputnum3").val();
        var email = $("#nputEmail3").val();
        var pwd = $("#inputPassword3").val();
        $.ajax({
            url:"http://localhost:3000/users/reg",
            type:"get",
            data:{username:usernum,email:email,password:pwd},
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data){
                if(data.res == "ok"){
                    alert("注册成功！");
                    var url = "腾讯微云登录.html";
                    window.location.href = url;
                }
                else{
                    alert(data);
                }
            }
        })
    })
});