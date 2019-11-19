﻿//当前登录用户
var loginUser = { "userName": "向中燕", "photo": "../resource/image/user1.jpg" };

//发出消息
function sendMsg() {
    var input = document.getElementById("inputMsg");
    var inputMsg = input.value;
    if (inputMsg == null || inputMsg == '') {
        return;
    }

    var html = createSendedMsg(inputMsg);
    var msgArea = document.getElementById("messageArea");
    msgArea.appendChild(html);
    input.value = null;
    msgArea.scrollTop = msgArea.scrollHeight;
    input.focus();
}

//用html显示发出的消息
function createSendedMsg(msg) {
    var nowtime = new Date();
    var time = nowtime.Format("yyyy-MM-dd HH:mm:ss");

    var item = document.createElement("div");
    item.className = 'sendMsgItem';
    item.innerHTML = createMsgHtml(msg, loginUser.userName, loginUser.photo, time);
    return item;
}

//用html显示收到的消息
function createRecivedMsg(msg, userName, photo, time) {
    var item = document.createElement("div");
    item.className = 'reciveMsgItem';
    item.innerHTML = createMsgHtml(msg, userName, photo, time);
    return item;
}

//消息的html
function createMsgHtml(msg, userName, photo, time) {
    return '<div class="msgTitle">' + userName + '&nbsp;&nbsp;&nbsp;&nbsp;' + time + '</div>'
        + '<div>'
        + '<img class="photo" src="' + photo + '" />'
        + '<div class="msgContent">' + msg + '</div>'
        + '<div class="clear"></div>'
        + '</div>';
}

//加载历史消息
function loadHistoryData(historyMsg) {
    $("#messageArea").html("");
    if (historyMsg.length == 0) {
        return;
    }

    var msgArea = document.getElementById("messageArea");

    for (var msgItem of historyMsg) {
        var html = null;

        if (msgItem.userName == loginUser.userName) {
            html = createSendedMsg(msgItem.msg);
        }
        else {
            var photo = '../resource/image/user1.jpg';
            html = createRecivedMsg(msgItem.msg, msgItem.userName, photo, msgItem.time);
        }

        msgArea.appendChild(html);
    }
}

function receiveSystemMsg(msg) {
    var html = '<span>系统消息：' + msg + '</span>';

    var item = document.createElement("div");
    item.className = 'systemMsg';
    item.innerHTML = html;

    var msgArea = document.getElementById("messageArea");
    msgArea.appendChild(item);

    return item;
}

function inputKeyDown() {
    if (window.event.keyCode == 13) {
        sendMsg();
    }
}

window.onload = function () {
    document.getElementById("inputMsg").focus();
}

$(document).ready(function () {
    loadChatList();
    registEvent();
});

function loadChatList() {
    var msgText = "";
    for (var i = 0; i < chatListData.length; i++) {
        var item = chatListData[i];
        msgText += '<li class="person">'
            + '<img class="photo" src = "' + item.img + '" alt = "photo" />'
            + '<span class="chatID" >' + item.chatID + '</span>'
            + '<span class="userName">' + item.title + '</span>'
            + '<span class="time">' + item.lastTime + '</span>'
            + '<div class="previewMsg">' + item.lastMsg + '</div>'
            + '</li>';
    }

    $("#personArea").html(msgText);
}

function registEvent() {
    $(".person").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");

        var id = $(".active .chatID").html();
        var msgItem;
        if (id == "001") {
            msgItem = msgData_001;
        }
        else if (id == "002") {
            msgItem = msgData_002;
        }
        else if (id == "003") {
            msgItem = msgData_003;
        }

        loadHistoryData(msgItem);
    });
}
