var currentUser;
var mockChats;

window.onload = function () {
    var uid = getQueryVariable("uid");
    currentUser = queryUser(uid);
    mockChats = queryChats(uid);
    
    $.ajax({
        url: "http://192.168.31.146:8066/chat/getchatroombyuid?uid=" + uid, 
        type: "get",
        async: false,
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"queryChatsJSONP",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(result){
            loadChats(result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //加载模拟数据
            loadChats(mockChats);
            //alert('远程取数据失败! status:' + XMLHttpRequest.status + ', ready:' + XMLHttpRequest.readyState + ', ' + textStatus + '\r\n将加载模拟数据...');
        }
    });
    
    // $.ajax({
    //     url: "http://192.168.31.146:8066/chat/getchatroombyuid?uid=" + this.currentUser.uid, 
    //     type: "get",
    //     async: false,
    //     dataType: "jsonp",
    //     jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    //     jsonpCallback:"queryChatsJSONP",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
    //     success: function(result){
    //         alert(result);
    //     },
    //     error: function(){
    //         alert('失败');
    //     }
    // });
    
    // $.ajax({
    //     //url: "http://192.168.31.146:8066/record/getall",
    //     //type: "post",
    //     //data: { system: "zlhis",maincode:"病历",mainId:"0001"},
    //     url: "http://192.168.31.146:8066/chat/getchatroombyuid?uid=" + this.currentUser.uid, 
    //     type: "get",
    //     async: false,
    //     dataType: "jsonp",
    //     success: function (result) {
    //         console.log(result);
    //         loadChats(result);
    //     },
    //     error: function (error) {
    //         console.log('jsonp加载讨论组数据失败：' + error.toString())
    //     }
    // }); 

    //var chatList = this.queryChats(uid);
    //loadChats(chatList);
}

// $(document).ready(function(){ 
//     var uid;
//     if (this.currentUser != null)
//         uid = this.currentUser.uid;
//     else
//         uid = "0001";
//     $.ajax({
//         url: "http://192.168.31.146:8066/chat/getchatroombyuid?uid=" + uid, 
//         type: "get",
//         async: false,
//         dataType: "jsonp",
//         jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
//         jsonpCallback:"queryChatsJSONP",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
//         success: function(result){
//             loadChats(result);
//             alert('成功');
//         },
//         error: function(){
//             //加载模拟数据
//             var chatList = this.queryChats(uid);
//             loadChats(chatList);
//             alert('失败');
//         }
//     });
// });

function loadChats(chatList) {
    var chatListElement = document.getElementById("chat-list-item");
    chatListElement.innerHTML = "";
    if (chatList != null && chatList.length > 0) {
        document.getElementById("no-chat-contact").classList.add('hidden');
        chatList.forEach(chat => {
            var liElement = document.createElement("li");
            liElement.className = "chat-list-item item";
            liElement.setAttribute("data-key", chat.key);
            liElement.onclick = function(){
                loadChatRecords(this);
            }
            liElement.innerHTML = '<img src="img/face/001.jpg" alt=""><span class="title">' + chat.title + '</span><span class="time">' + chat.time+ '</span><span class="preview">' + chat.preview + '</span>';
            chatListElement.appendChild(liElement);
        });
        chatListElement.classList.remove('hidden');
    }
    else {
        chatListElement.classList.add('hidden');
        document.getElementById("no-chat-contact").classList.remove('hidden');
    }
}

function loadChatRecords(chatItem) {
    //chatItem = this;
    console.log(chatItem);
    var list = document.querySelector('ul.chat-list-item');
    if(list != null) {
        var activeItem = list.querySelector('.active');
        if (activeItem != null) activeItem.classList.remove('active');
    }
    chatItem.classList.add('active');
    
    var divChat = document.getElementById("chatContent");
    divChat.innerHTML = "";
    var chatKey = chatItem.getAttribute('data-key');
    console.log(chatKey);
    var chatRecords = queryChatRecords(chatKey);
    if (chatRecords != null) {
        var lastElement;
        chatRecords.forEach(msg => {
            var divElement;
            if (msg.uname == currentUser.uname) {
                divElement = newMsgRightElement(msg);
            } 
            else {
                divElement = newMsgLeftElement(msg);
            }
            divChat.appendChild(divElement);
            lastElement = divElement;
        });
        if (lastElement != null) 
            lastElement.scrollIntoView({ behavior: "smooth" });
        else
            scrollMsgToEnd();
    }

 /*    friends.list.querySelector('.active').classList.remove('active');
    f.classList.add('active');
    chat.current = chat.container.querySelector('.active-chat');
    chat.person = f.getAttribute('data-chat');
    chat.current.classList.remove('active-chat');
    chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat');
    friends.name = f.querySelector('.name').innerText;
    chat.name.innerHTML = friends.name; */
}

function sendMsg() {
    var txtMsg = document.getElementById("textMsg");
    if (txtMsg.value) {
        var msg = { uname: "范俊", time: new Date().Format("yyyy-MM-dd HH:mm:ss"), msg: txtMsg.value };
        var divChat = document.getElementById("chatContent");
        var divElement = newMsgRightElement(msg);
        divChat.appendChild(divElement);
        txtMsg.value = "";
        divElement.scrollIntoView({ behavior: "smooth" });
        //chart.scrollTop = chart.scrollHeight;
    }
}

//todo:call api
function queryUser(uid)
{
    switch(uid) {
        case "fj":
            return { uid: "fj", uname: "范俊" };
        default:
            return null;
   } 
}
function queryChats(uid)
{
    switch (uid) {
        case "fj":
            return [{ key: "1", title: "讨论组一", preview: "说你呢，胡言乱语...", time: '10-25 09:00' }, { key: "2", title: "Web练习讨论组-课时2", preview: "怎么能够偷懒呢？", time: '10-26 22:00' }];
        default:
            return null;
    } 
    

}
function queryChatRecords(chatKey)
{
    switch(chatKey) {
        case "1":
            return [{ uname: "张三", time: '2019-10-16 08:00:09', msg: "哈喽" }, { uname: "李四", time: '2019-10-16 08:10:00', msg: "hello world" }, { uname: "王五", time: '2019-10-16 16:00:09', msg: "hello,html & css & javascript" }];
        case "2":
return [{ uname: "鲁班", time: '2019-10-26 10:00:09', msg: "猥琐发育！" }, { uname: "鲁班", time: '2019-10-26 11:10:00', msg: "别浪~~" }, { uname: "鲁班", time: '2019-11-11 11:11:11', msg: "光棍节到了" }, { uname: "范俊", time: '2019-11-11 11:11:11', msg: "怎么是购物节呢？" }, { uname: "马云", time: '2019-11-11 11:11:12', msg: "哇哈哈~" }];
        default:
            return null;
   } 
}


function newMsgLeftElement(msg) {
    var divElement = document.createElement("div");
    divElement.className = "record recordLeft";
    divElement.innerHTML = getMsgInnerHtml(msg);
    return divElement
}
function newMsgRightElement(msg) {
    var divElement = document.createElement("div");
    divElement.className = "record recordRight";
    divElement.innerHTML = getMsgInnerHtml(msg);
    return divElement
}
function getMsgInnerHtml(msg) {
    return '<span class="userName">' + msg.uname + '&nbsp;&nbsp;' + msg.time + '</span><span class="userImg"></span><span class="message">' + msg.msg + '</span>';
}

function scrollMsgToEnd() {
    var divChat = document.getElementById("chatContent");    
    if (divChat != null && divChat.lastElementChild != null) {
        divChat.lastElementChild.scrollIntoView({ behavior: "smooth" }); //平滑滚动
    }
}

function getQueryVariable(variable) {
    var reg = new RegExp('(^|&)' + variable + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2]; //用于解码"="后的值,即
    }
    return "";
}

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
}   
