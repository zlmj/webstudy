var currentUser;
var mockChats;


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
            return [{ cid: "1", title: "讨论组一", preview: "说你呢，胡言乱语...", time: '10-25 09:00' }, { cid: "2", title: "Web练习讨论组-课时2", preview: "怎么能够偷懒呢？", time: '10-26 22:00' }];
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
