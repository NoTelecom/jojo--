$(document).ready(function(){
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
    $.ajax({
        url:"http://localhost:3000/index/getFile?type=trash",
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
                var picSrc = '../图片区/'+item.type+'.png';
                var listName = "file-item_"+i;
                    addTable.append('<tr> ' + '<td>'+'<input type="checkbox" value='+i+'>'+'</input>'+'</td>'+'<td>'+'<img width="3%" src='+picSrc+'>'+' ' + item.name +
                        '</td>' + '<td>' + new Date(item.date) +
                        '</td>' + '<td>' + change(item.size) +
                        '</td>' + '</tr>');
                var temp = $(".table-hover").find("tr").eq(i+1);
                temp.addClass(listName);
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
                        ' id="toDelete">'+'彻底删除'+'</button>'+' '+'<button type="button" class="btn btn-default" id="redo">'+' 恢 复 '+'</button>');
                }
                else if(this.checked == false){
                    checkNum--;
                    arrayName.pop(data[this.value].file);
                    arrayType.pop(data[this.value].type);
                }
                 //console.log(arrayName)
                 //console.log(arrayType)
                //console.log("checknum "+checkNum)
                if(checkNum == 0) {
                    $("input[type='checkbox']").css("opacity",0);
                    $(".file-header").empty().append('<th>'+' '+'</th>'+
                        '<th>'+'名称'+'</th>'+ '<th class="date">'+
                        '删除时间'+'</th>'+'<th>'+'大小');
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
                $("#toDelete").click(function () {
                    var j;
                    for(j = 0; j < checkNum; j++){
                        $.ajax({
                            url:"http://localhost:3000/index/deleteFile",
                            type:"get",
                            data:{filename:arrayName[j],type:arrayType[j]},
                            dataType:"json",
                            xhrFields: {
                                withCredentials: true
                            },
                            success:function (trashData) {
                                console.log(trashData);
                                alert("彻底删除成功！")
                                $('.inner').load("weicloudtrash.html");
                            },

                            error: function () {
                                alert("delete file error!")
                            }
                        })

                    }
                    // if(j == checkNum)alert("成功将"+checkNum+"项加入回收站")

                })
                //恢复
                $("#redo").click(function () {
                    var j;
                    for(j = 0; j < checkNum; j++){
                        $.ajax({
                            url:"http://localhost:3000/index/huifu",
                            type:"get",
                            data:{filename:arrayName[j],type:arrayType[j]},
                            dataType:"json",
                            xhrFields: {
                                withCredentials: true
                            },
                            success:function (trashData) {
                                console.log(trashData);
                                alert("恢复成功！")
                                $('.inner').load("weicloudtrash.html");
                            },

                            error: function () {
                                alert("regain file error!")
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

    //全部清空
    $("#all-choose").click(function () {
        // $("input[type='checkbox']").attr("checked","true");
        // $("input[type='checkbox']").css("opacity",1);
        var len = $('.table tr').length-1;
        console.log(len)
    });

})