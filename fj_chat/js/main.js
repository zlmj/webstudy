/* fanjun 2019.10.15 web练习-html,css,js */

/* 快速回顾

jQuery 元素选择器（jQuery 使用 CSS 选择器来选取 HTML 元素）
    $(this)	                当前 HTML 元素
    $("p")	                所有 <p> 元素
    $("p.intro")	        所有 class="intro" 的 <p> 元素
    $(".intro")	            所有 class="intro" 的元素
    $("#intro")	            id="intro" 的元素
    $("ul li:first")	    每个 <ul> 的第一个 <li> 元素
    $("div#intro .head")    id="intro" 的 <div> 元素中的所有 class="head" 的元素

jQuery 属性选择器（jQuery 使用 XPath 表达式来选择带有给定属性的元素）
    $("[href]")             所有带有 href 属性的元素
    $("[href='#']")         所有带有 href 值等于 "#" 的元素
    $("[href!='#']")        所有带有 href 值不等于 "#" 的元素
    $("[href$='.jpg']")     所有 href 值以 ".jpg" 结尾的元素

*/

var historyMsg = [{ uname: "张三", time: '2019-10-16 08:00:09', msg: "哈喽" }, { uname: "李四", time: '2019-10-16 08:10:00', msg: "hello world" }, { uname: "王五", time: '2019-10-16 16:00:09', msg: "hello,html & css & javascript" }];
var currentUser = { uid: "fj", uname: "范俊" };

window.onload = function () {
    var divChat = document.getElementById("chatContent");
    var lastElement;
    historyMsg.forEach(msg => {
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


var sendMsg = function () {
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
};

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