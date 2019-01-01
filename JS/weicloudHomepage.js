 $(function () {// 文档就绪
    //验证是否已经登陆
    $.ajax({
        url:"http://localhost:3000/users/isLog",
        type:"get",
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        success:function (data) {
            if(data.res != "ok"){

                alert("您还未登录，所以不能访问呦~");

                var url = "腾讯微云登录.html";
                $('body').load(url);
                //$('body').css('background','');

            }

        }
    })
     //取得cookie
     function getCookie(c_name)
     {
         if (document.cookie.length>0)
         {
             c_start=document.cookie.indexOf(c_name + "=")
             if (c_start!=-1)
             {
                 c_start=c_start + c_name.length+1
                 c_end=document.cookie.indexOf(";",c_start)
                 if (c_end==-1) c_end=document.cookie.length
                 return unescape(document.cookie.substring(c_start,c_end))
             }
         }
         return ""
     }
    //展示file的大小，以kb,mb,gb衡量
     function change(limit){
         var size = "";
         if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
             size = limit.toFixed(2) + "B"
         }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
             size = (limit/1024).toFixed(2) + "KB"
         }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
             size = (limit/(1024 * 1024)).toFixed(2) + "MB"
         }else{                                            //其他转化成GB
             size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
         }

         var sizeStr = size + "";                        //转成字符串
         var index = sizeStr.indexOf(".");                    //获取小数点处的索引
         var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
         if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
             return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
         }
         return size;
     }

     //dom文档加载 构造HTML DOM模型时展示
     $(document).ready(function(){
         $.ajax({
             url:"http://localhost:3000/index/getFile?type=all",
             type:"get",
             dataType:"json",
             xhrFields: {
                 withCredentials: true
             },
             success:function (data) {
                 console.log(data);
                 console.log("数目 "+data.length)
                 var addTable = $('.table-hover');
                 for(var i = 0 ;i < data.length;i++){
                     var item = data[i];
                     var listName = "file-item_"+i;
                     var picSrc = '../图片区/'+item.type+'.png';
                     //是图片时可弹出模态框
                     if(item.type == "img"){
                         addTable.append('<tr> ' + '<td>'+
                             '<input type="checkbox" value='+i+'>'+'</input>'
                             +'</td>'+'<td data-toggle="modal" ' +
                             'data-target="#imgModal">'+'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                             '</td>' + '<td>' + new Date(item.date) +
                             '</td>' + '<td>' + change(item.size) +
                             '</td>' + '</tr>');
                     }
                     else if(item.type == "doc"){
                         addTable.append('<tr> ' + '<td>'+
                             '<input type="checkbox" value='+i+'>'+'</input>'
                             +'</td>'+'<td data-toggle="modal" ' +
                             'data-target="#docModal">'+'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                             '</td>' + '<td>' + new Date(item.date) +
                             '</td>' + '<td>' + change(item.size) +
                             '</td>' + '</tr>');
                     }
                     else if(item.type == "video"){
                         addTable.append('<tr> ' + '<td>'+
                             '<input type="checkbox" value='+i+'>'+'</input>'
                             +'</td>'+'<td data-toggle="modal" ' +
                             'data-target="#videoModal">'+'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                             '</td>' + '<td>' + new Date(item.date) +
                             '</td>' + '<td>' + change(item.size) +

                             '</td>' + '</tr>');
                     }
                     else{
                         addTable.append('<tr> ' + '<td>'+'<input type="checkbox" value='+i+'>'+'</input>'+'</td>'+'<td>'+'<img width="3%" src='+picSrc+'>'+' ' + item.name +
                             '</td>' + '<td>' + new Date(item.date) +
                             '</td>' + '<td>' + change(item.size) +
                             '</td>' + '</tr>');
                     }
                     var temp = $(".table-hover").find("tr").eq(i+1);
                     temp.addClass(listName);
                 }
                 //模态框弹出及展示,如果是音乐，就在底下出现进度条播放
                 for(var i = 0 ;i < data.length;i++){
                     var listName = "file-item_"+i;
                     $("."+listName).click(function () {
                         //console.log(this.className.slice(10))
                         var j = this.className.slice(10);
                         if(data[j].type == "img"){
                             //console.log("it is img")
                             var cookieUsername = getCookie("username")
                             var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                             //console.log(url)
                             $("#imgSrc").attr("src",url);
                         }
                         else if(data[j].type == "doc"){
                             //console.log("it is doc")
                             var cookieUsername = getCookie("username")
                             var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                             //console.log(url)
                             $("#txt").attr("href",url);
                         }
                         else if(data[j].type == "video"){
                             //console.log("it is video")
                             var cookieUsername = getCookie("username")
                             var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                             console.log(url)
                             $("#mp4").attr("src",url);
                             $("#sou").attr("src",url);
                         }
                         else if(data[j].type == "radio"){
                             $('.right').append( '<div class="theRadio">'+'<img id="removeRadio" src="../图片区/叉号.png">'+'</img>'+ '<audio id="mp3" src="" controls="controls" loop="loop" autoplay="autoplay">'+'</audio>'+
                                 '</div>');
                             //console.log("it is radio")
                             var cookieUsername = getCookie("username")
                             var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                             //console.log(url)
                             $("#mp3").attr("src",url);
                             //音乐点击叉号关闭哦
                             $('#removeRadio').click(function () {
                                 $('.theRadio').remove();
                             });
                         }
                     })
                 }
                 //判断复选框是否选中
                  $("input[type='checkbox']").attr("checked");
                 var checkNum = 0;
                 var arrayName = new Array();
                 var arrayType = new Array();
                 //有选中的选项时，出现删除按钮，否则消失
                 $("input[type='checkbox']").click(function (e) {
                     console.log(this.value)
                     if(this.checked == true){
                         arrayName.push(data[this.value].file);
                         arrayType.push(data[this.value].type);
                         checkNum++;
                         $(".file-header").empty().append('<button class="btn btn-danger"' +
                             ' id="toTrash">'+'删除'+'</button>');
                     }
                     else if(this.checked == false){
                         checkNum--;
                         arrayName.pop(data[this.value].file);
                         arrayType.pop(data[this.value].type);
                     }
                     // console.log(arrayName)
                     // console.log(arrayType)
                     //console.log("checknum "+checkNum)
                     if(checkNum == 0) {
                         $("input[type='checkbox']").css("opacity",0);
                         $(".file-header").empty().append('<th>'+' '+'</th>'+
                         '<th>'+'名称'+'</th>'+ '<th class="date">'+
                         '上次修改时间'+'</th>'+'<th>'+'大小');
                         // $("input[type='checkbox']").hover(function(){
                         //     this.style="opacity:1";
                         // },function(){
                         //     this.style="opacity:0";
                         // });
                     }
                     else{
                         $("input[type='checkbox']").css("opacity",1);
                     }
                     //放入回收站
                     $("#toTrash").click(function () {
                         var j;
                         for(j = 0; j < checkNum; j++){
                             $.ajax({
                                 url:"http://localhost:3000/index/gotoTrash",
                                 type:"get",
                                  data:{filename:arrayName[j],type:arrayType[j]},
                                 dataType:"json",
                                 xhrFields: {
                                     withCredentials: true
                                 },
                                 success:function (trashData) {
                                    console.log(trashData);
                                    alert("成功加入回收站！")
                                     window.location.reload();
                                 },

                                 error: function () {
                                    alert("to trash error!")
                                 }
                             })

                         }
                         // if(j == checkNum)alert("成功将"+checkNum+"项加入回收站")

                     })
                 })


             },
             error: function () {
                 alert("no");
             }
         })

     })
    //点击即按日期顺序排列
    $(".date").click(function () {
        $.ajax({
            url:"http://localhost:3000/index/getFileByTime",
            type:"get",
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            success:function (data) {
                 $(".table-hover").empty().append('<tr>'+'<th>'+'名称'+'</th>'+
                     '<th class="date">'+'上次修改时间'+'</th>'+'<th>'+'大小'+'</th>');
                console.log(data);
                console.log("上次修改时间处理后数目 "+data.length)
                var addTable = $('.table-hover');
                for(var i = 0 ;i < data.length;i++){
                    var item = data[i];
                    var listName = "file-item_"+i;
                    addTable.append('<tr> ' + '<td>' + item.name +
                        '</td>' + '<td>' + new Date(item.date) +
                        '</td>' + '<td>' + change(item.size) +
                        '</td>' + '</tr>');
                    var temp = $(".table-hover").find("tr").eq(i+1);
                    temp.addClass(listName);
                }

            },

            error: function () {
                alert("按修改时间排序未成功！");
            }
        })
    })
    //登出
    $("#exit").click(function () {
        $.ajax({
                url:"http://localhost:3000/users/outLogin",
                type:"get",
                dataType:"json",
                xhrFields: {
                    withCredentials: true
                },
                success:function (data) {
                    if(data.res == "ok"){
                        alert("登出成功！")
                        var url = "腾讯微云登录.html";
                        $('body').load(url);            }
                }
            })
    })
    /*被点击时传送对应index
     的标志符号，此处仅仅写一个ajax就好*/
     $(".menu-list li").click(function (e) {
         console.log(e.target.parentNode.className)
         var event = e.target.parentNode.className;
         $.ajax({
             url:"http://localhost:3000/index/getFile?type="+event,
             type:"get",
             dataType:"json",
             xhrFields: {
                 withCredentials: true
             },
             success:function (data) {
                 if(event == 'trash'){
                     $('.inner').load("weicloudtrash.html");

                 }
                 else{
                     if(event == 'all') $('.inner-top').load("weicloudhome.html"+" .inner-top");
                     else $('.inner-top').load("weicloud"+event+".html");
                     $(".table-hover").empty().append('<tr class="file-header">'+'<th>'+' '+'</th>'+'<th>'+'名称'+'</th>'+
                         '<th class="date">'+'上次修改时间'+'</th>'+'<th>'+'大小'+'</th>');
                     console.log(data);
                     console.log("数目 "+data.length)
                     var addTable = $('.table-hover');
                     for(var i = 0 ;i < data.length;i++){
                         var item = data[i];
                         var picSrc = '../图片区/'+item.type+'.png';
                         var listName = "file-item_"+i;
                         //是图片时可弹出模态框
                         if(item.type == "img"){
                             addTable.append('<tr> ' + '<td>'+
                                 '<input type="checkbox" value='+i+'>'+'</input>'
                                 +'</td>'+'<td data-toggle="modal" ' +
                                 'data-target="#imgModal">' +'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                                 '</td>' + '<td>' + new Date(item.date) +
                                 '</td>' + '<td>' + change(item.size) +
                                 '</td>' + '</tr>');
                         }
                         else if(item.type == "doc"){
                             addTable.append('<tr> ' + '<td>'+
                                 '<input type="checkbox" value='+i+'>'+'</input>'
                                 +'</td>'+'<td data-toggle="modal" ' +
                                 'data-target="#docModal">'+'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                                 '</td>' + '<td>' + new Date(item.date) +
                                 '</td>' + '<td>' + change(item.size) +
                                 '</td>' + '</tr>');
                         }
                         else if(item.type == "video"){
                             addTable.append('<tr> ' + '<td>'+
                                 '<input type="checkbox" value='+i+'>'+'</input>'
                                 +'</td>'+'<td data-toggle="modal" ' +
                                 'data-target="#videoModal">'+'<img width="3%" src='+picSrc+'>'+' '+ item.name +
                                 '</td>' + '<td>' + new Date(item.date) +
                                 '</td>' + '<td>' + change(item.size) +
                                 '</td>' + '</tr>');
                         }
                         else{
                             addTable.append('<tr> ' + '<td>'+'<input type="checkbox" value='+i+'>'+'</input>'+'</td>'+'<td>'+'<img width="3%" src='+picSrc+'>'+' ' + item.name +
                                 '</td>' + '<td>' + new Date(item.date) +
                                 '</td>' + '<td>' + change(item.size) +
                                 '</td>' + '</tr>');
                         }
                         var temp = $(".table-hover").find("tr").eq(i+1);
                         temp.addClass(listName);
                     }
                     //模态框弹出及展示图片
                     for(var i = 0 ;i < data.length;i++){
                         var listName = "file-item_"+i;
                         $("."+listName).click(function () {
                             //console.log(this.className.slice(10))
                             var j = this.className.slice(10);
                             if(data[j].type == "img"){
                                 //console.log("it is img")
                                 var cookieUsername = getCookie("username")
                                 var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                                // console.log(url)
                                 $("#imgSrc").attr("src",url);
                             }
                             else if(data[j].type == "doc"){
                                 //console.log("it is doc")
                                 var cookieUsername = getCookie("username")
                                 var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                                 //console.log(url)
                                 $("#txt").attr("href",url);
                             }
                             else if(data[j].type == "video"){
                                 //console.log("it is video")
                                 var cookieUsername = getCookie("username")
                                 var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                                 console.log(url)
                                 $("#mp4").attr("src",url);
                                 $("#sou").attr("src",url);
                             }
                             else if(data[j].type == "radio"){
                                 $('.right').append( '<div class="theRadio">'+'<img id="removeRadio" src="../图片区/叉号.png">'+'</img>'+ '<audio id="mp3" src="" controls="controls" loop="loop" autoplay="autoplay">'+'</audio>'+
                                     '</div>');
                                 //console.log("it is radio")
                                 var cookieUsername = getCookie("username")
                                 var url = "http://localhost:3000/"+cookieUsername+"/"+data[j].type+"/"+data[j].file;
                                 //console.log(url)
                                 $("#mp3").attr("src",url);
                                 //音乐点击叉号关闭哦
                                 $('#removeRadio').click(function () {
                                     $('.theRadio').remove();
                                 });
                             }

                         })
                     }
                 }


                     //判断复选框是否选中
                     $("input[type='checkbox']").attr("checked");
                     var checkNum = 0;
                     var arrayName = new Array();
                     var arrayType = new Array();
                     //有选中的选项时，出现删除按钮，否则消失
                     $("input[type='checkbox']").click(function (e) {
                     console.log(this.value)
                     if(this.checked == true){
                         arrayName.push(data[this.value].file);
                         arrayType.push(data[this.value].type);
                         checkNum++;
                         $(".file-header").empty().append('<button class="btn btn-danger"' +
                             ' id="toTrash">'+'删除'+'</button>');
                     }
                     else if(this.checked == false){
                         checkNum--;
                         arrayName.pop(data[this.value].file);
                         arrayType.pop(data[this.value].type);
                     }
                     // console.log(arrayName)
                     // console.log(arrayType)
                     //console.log("checknum "+checkNum)
                     if(checkNum == 0) {
                         $("input[type='checkbox']").css("opacity",0);
                         $(".file-header").empty().append('<th>'+' '+'</th>'+
                             '<th>'+'名称'+'</th>'+ '<th class="date">'+
                             '上次修改时间'+'</th>'+'<th>'+'大小');
                         // $("input[type='checkbox']").hover(function(){
                         //     this.style="opacity:1";
                         // },function(){
                         //     this.style="opacity:0";
                         // });
                     }
                     else{
                         $("input[type='checkbox']").css("opacity",1);
                     }
                     //放入回收站
                     $("#toTrash").click(function () {
                         var j;
                         for(j = 0; j < checkNum; j++){
                             $.ajax({
                                 url:"http://localhost:3000/index/gotoTrash",
                                 type:"get",
                                 data:{filename:arrayName[j],type:arrayType[j]},
                                 dataType:"json",
                                 xhrFields: {
                                     withCredentials: true
                                 },
                                 success:function (trashData) {
                                     console.log(trashData);
                                     //console.log("weicloud"+event+".html")
                                     alert("成功加入回收站！")
                                     //console.log("weicloud"+event+".html")
                                     window.location.reload();
                                 },

                                 error: function () {
                                     alert("to trash error!")
                                 }
                             })

                         }
                         // if(j == checkNum)alert("成功将"+checkNum+"项加入回收站")

                     })
                 })
             },
             error: function () {
                 alert("no");
             }
         })
     })



     $(".close").on('mouseenter', ".video_link", function(event){
         var videoDom = event.target;
         videoDom.addEventListener('play', function(){ videoDom.play(); })
     })
     
     $('#form-file').click(function () {
         setTimeout(function(){
             window.location.reload();
         },6000);

     });
     // $("#upTheFile").click(function () {
     //     console.log("hey,boy!")
     // })
     //
     // $("#form-file").click(function () {
     //     console.log("y")
     //     $.ajax({
     //         url:"http://localhost:3000/index/upfile",
     //         type:"post",
     //         dataType:"json",
     //         // data:{},
     //         xhrFields: {
     //             withCredentials: true
     //         },
     //         success:function (data) {
     //             console.log(data);
     //             if(data.res == "ok"){
     //                 alert("上传成功！")
     //                 console.log(data[0].size)
     //             }
     //             else alert("sorry,由于某种原因上传失败了呢~")
     //         },
     //
     //         error: function () {
     //             alert("no");
     //         }
     //     })
     // })


})