var historymsg=[{user:"张三",time:'2019-10-14 16:42:09',msg:"how are you?"},{user:"李四",time:'2019-10-14 16:42:09',msg:"i'm fan!"},{user:"王五",time:'2019-10-14 16:42:09',msg:"Ok"}];
var curuser={user:"李四"};

window.onload=function(){
    var uid = getQueryVariable("uid");
    var system=getQueryVariable("system");
    var maincode=getQueryVariable("maincode");
    var mainid=getQueryVariable("mainid");
    var uname = null;
    var auth="4xbxjaGF0YWRtaWbem";    
    
    //初始化讨论列表
    $.ajax({
        url: "http://192.168.31.132:8033/chat/getchatroombyuid?uid="+uid,
        // url: "http://192.168.31.144:8066/chat/getchatroombyuid?uid="+uid,
        type: "get",
        // datatype:"jsonp",
        async: false,
        // beforeSend: function (xhr) {
        //     if (auth != null) xhr.setRequestHeader("Authorization", auth);
        // },
        success: function (result) {
            if (result && result.length > 0) {
                LoadChatRoom(result, uid);
                console.log(result);
            }
        },
        error: function () {
            console.log('读取讨论列表失败');
        }
    });


// 将获取的讨论组列表加载到表格上
    function LoadChatRoom(chatlist,uid){
        chatlist.forEach(function (val) {
            var tmp = "";
            var data = "system=" + val.SystemID + "&maincode=" + val.MainCode + "&mainID=" + val.MainID + "&subject=" + val.Subject + "&name=" + val.Uname + "," + uid;
            var lastmsg = val.LastMsg != null && val.LastMsg.indexOf("data:image") > -1 ? "图片" : val.LastMsg;
            if (val.Unread) {
                tmp = '<tr class="list_2" bind-data="' + data +'"><td rowspan="2"><img src="./img/user1.jpg" class="img-responsive img-circle" style="width: 75px;height:50px;"></td><td>'+ val.Subject + '</td> <td>'+ val.LastTime + '</td></tr> <tr class="list_2" > <td colspan="2">' + val.LastUname + "：" + lastmsg + '</td></tr>';
            }
            else {
                tmp = '<tr class="list_2"  bind-data="' + data +'"><td rowspan="2"><img src="./img/user1.jpg" class="img-responsive img-circle" style="width: 75px;height:50px;"></td><td>'+ val.Subject + '</td> <td>'+ val.LastTime + '</td></tr> <tr class="list_2" > <td colspan="2">' + val.LastUname + "：" + lastmsg + '</td></tr>';
            }
            $(".list_1").append(tmp);
        });
    };

//     // 点击讨论组列表加载历史数据
// $(".list_2").click(function(){
//     var id=$(this).find("i");
//     if(id){
//         $(id).remove();    
//     }
//     $(".list_2").removeClass("active");
//     $(this).addClass("active");
//     var data=$(this).attr("bind-data");
//     if(data){
//         getArrpars(data);
//         checkin(data);
//     }
// });

    // 点击讨论组列表加载模拟数据
    $(".list_2").click(function(){
        var temp='<span class="himg right"></span><div class="userlist right">{0}{1}</div><div class="comment me">{2}</div>';
        var chart=document.getElementsByClassName("content");
        historymsg.forEach(element => {
            var ele=document.createElement("div")
            ele.className="chat-list";
                ele.innerHTML='<span class="himg right"></span><div class="userlist right">'+element.user+'&nbsp;&nbsp;&nbsp;&nbsp;'+element.time+'</div><div class="comment me">'+element.msg+'</div>';
            chart[0].appendChild(ele);
        });
        chart[0].scrollTop=chart[0].scrollHeight;
    });
    

    // 获取历史数据
    function checkin(data){
        $.ajax({
            url:  "http://192.168.31.132:8033/record/getall",
            // url:  "http://192.168.31.146:8066/record/getall",
            type: "post",
            // datatype:"jsonp",
            data: { system: system, maincode: maincode, mainid:mainid },
            // beforeSend: function (xhr) {
            //     if (auth != null) xhr.setRequestHeader("Authorization", auth);
            //  },
            success: function (result) {
                if (result == null || result.length == 0 || result == '[]') {
                    console.log('无历史数据');
                    return;
                }
                var chart=document.getElementsByClassName("content");
                result = eval('(' + result + ')');
                console.log(result);
                var html = '';
                for (var i = 0; i < result.length; i++) {
                    html += '<div class="chat-item item-right clearfix rela">'                   
                    html += '<span class="himg right"></span><div class="userlist right">'+result[i].Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+result[i].Date+'</div><div class="comment me">'+result[i].Content+'</div>'
                html += '</div>';  
                }
                $(".chat-list").append(html);
                // scrollToEnd();
                chart[0].scrollTop=chart[0].scrollHeight; 
            

                    // var temp='<span class="himg right"></span><div class="userlist right">'+result[i].Name+result[i].Date+'</div><div class="comment me">'+result[i].Content+'</div>';
                    // var chart=document.getElementsByClassName("content");
                    // result.forEach(element => {
                    //     var ele=document.createElement("div")
                    //     ele.className="chat-list";
                    //     if(result.Name == uname)
                    //         ele.innerHTML='<span class="himg right"></span><div class="userlist right">'+element.Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+element.Date+'</div><div class="comment me">'+element.Content+'</div>';
                    //         else
                    //     ele.innerHTML='<span class="himg left"></span><div class="userlist left">'+element.Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+element.Date+'</div><div class="comment you">'+element.Content+'</div>';
                    //     // chart[0].appendChild(ele);
                    //     $(".chat-list").append(ele);
                    // });
                    // chart[0].scrollTop=chart[0].scrollHeight;             
                    
                }
        });
    }











function getArrpars(url) {
    uname = getQueryVariable("name", url);
    var arr = uname.split(",");
    if (arr.length > 0) {
        uname = arr[0];
        uid = arr[0];
    }
    uname = decodeURIComponent(uname);
    uid = decodeURIComponent(uid);

system = getQueryVariable("system", url);
system = decodeURIComponent(system);
//主体编码
maincode = getQueryVariable("maincode", url);
maincode = decodeURIComponent(maincode);
//主体id
mainid = getQueryVariable("mainid", url);
mainid = decodeURIComponent(mainid);
//对话框名称
subject = getQueryVariable("subject", url);
subject = decodeURIComponent(subject);
$(".header").html('<p class="h3 text-center">'+subject+'</p>');
}



    // 获取历史数据
    function checkin(data){
        $.ajax({
            url:  "http://192.168.31.132:8033/record/getall",
            // url:  "http://192.168.31.146:8066/record/getall",
            type: "post",
            // datatype:"jsonp",
            data: { system: system, maincode: maincode, mainid:mainid },
            // beforeSend: function (xhr) {
            //     if (auth != null) xhr.setRequestHeader("Authorization", auth);
            //  },
            success: function (result) {
                if (result == null || result.length == 0 || result == '[]') {
                    console.log('无历史数据');
                    return;
                }
                var chart=document.getElementsByClassName("content");
                result = eval('(' + result + ')');
                console.log(result);
                var html = '';
                for (var i = 0; i < result.length; i++) {
                    html += '<div class="chat-item item-right clearfix rela">'                   
                    html += '<span class="himg right"></span><div class="userlist right">'+result[i].Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+result[i].Date+'</div><div class="comment me">'+result[i].Content+'</div>'
                html += '</div>';  
                }
                $(".chat-list").append(html);
                // scrollToEnd();
                chart[0].scrollTop=chart[0].scrollHeight; 
            

                    // var temp='<span class="himg right"></span><div class="userlist right">'+result[i].Name+result[i].Date+'</div><div class="comment me">'+result[i].Content+'</div>';
                    // var chart=document.getElementsByClassName("content");
                    // result.forEach(element => {
                    //     var ele=document.createElement("div")
                    //     ele.className="chat-list";
                    //     if(result.Name == uname)
                    //         ele.innerHTML='<span class="himg right"></span><div class="userlist right">'+element.Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+element.Date+'</div><div class="comment me">'+element.Content+'</div>';
                    //         else
                    //     ele.innerHTML='<span class="himg left"></span><div class="userlist left">'+element.Name+'&nbsp;&nbsp;&nbsp;&nbsp;'+element.Date+'</div><div class="comment you">'+element.Content+'</div>';
                    //     // chart[0].appendChild(ele);
                    //     $(".chat-list").append(ele);
                    // });
                    // chart[0].scrollTop=chart[0].scrollHeight;             
                    
                }
        });
    }



    //获取URL参数
function getQueryVariable(variable, sourcestr) {
    sourcestr = sourcestr ? sourcestr : window.location.search.substr(1);
    //匹配指定variable的QueryString
    var reg = new RegExp('(^|&)' + variable + '=([^&]*)(&|$)', 'i');
    var r = sourcestr.match(reg);
    if (r != null) {
        return r[2]; //用于解码"="后的值,即
    }
    return "";
}


// 搜索框
function search(){
    // 获取搜索框的值
    var searchtxt=$("#search_1").val();
    if(searchtxt){
        // 在li讨论组列表中循环
        $(".list_2").each(function(val,e){
            // 循环查找讨论组标题
            var txt=$(e).children(".list_4").text();
            // 如果讨论组标题中包含搜索框的值
            if(txt.indexOf(searchtxt)>=0){
                $(".list_2.active").removeClass("active");
                $(this).addClass("active");
                $(this).click();
            }
        }
        );
    }
// 如果搜索框为空，则清除所有激活样式
    else{
        $(".list_2.active").removeClass("active");
    }
}

// 按enter搜索
$("#search_1").keyup(function(event){
    var keycode=(event.keycode?event.keycode:event.which);
    if(keycode=='13'){
        search();
    }
});

// 点击图片搜索
$("#search_img").click(function(){
    search();
});


Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 8 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
};


}