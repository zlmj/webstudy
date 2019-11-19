//当前登录用户
var loginUser = { "userName": "向中燕", "photo": "../resource/image/user1.jpg" };

//发出消息
function sendMsg() {
    var input = document.getElementById("inputMsg");
    var inputMsg = input.value;
    input.focus();
    if (inputMsg == null || inputMsg == '') {
        return;
    }

    var html = createSendedMsg(inputMsg);
    var msgArea = document.getElementById("messageArea");
    msgArea.appendChild(html);
    input.value = null;
    msgArea.scrollTop = msgArea.scrollHeight;
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
    document.getElementById("messageArea").innerHTML = '';
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

function clickPerson(personID) {
    var items = document.getElementsByClassName("active");
    if (items.length > 0) {
        items[0].className = "person";
    }

    document.getElementById(personID).className = "person active";

    var msgItem = msgHistory[personID];
    loadHistoryData(msgItem);
}

//聊天组列表
class PersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = chatListData;
        this.activeID = "001";
    }

    render() {
        return this.state.map((item) =>
            <li id={item.chatID} class={(item.chatID == this.activeID) ? "person active" : "person"}
                onClick={this.changeActivePerson.bind(this, item.chatID)}>
                <img class="photo" src={item.img} alt="photo" />
                <span class="chatID" >{item.chatID}</span>
                <span class="userName">{item.title}</span>
                <span class="time">{item.lastTime}</span>
                <div class="previewMsg">{item.lastMsg}</div>
            </li>);
    }

    changeActivePerson(id) {
        this.activeID = id;
    }
}

//对话框
class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = msgHistory[props.personID];
    }

    render() {
        return this.state.map((item) =>
            (<div class={(item.userName == loginUser.userName) ? "sendMsgItem" : "reciveMsgItem"}>
                <div class="msgTitle">{item.userName + "    " + item.time}</div>
                <div>
                    <img class="photo" src={item.img} />
                    <div class="msgContent">{item.msg}</div>
                    <div class="clear"></div>
                </div>
            </div>)
        );
    }
}

//标题
class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        for (var i = 0; i < chatListData.length; i++) {
            if (chatListData[i].chatID == props.personID) {
                this.state.title = chatListData[i].title;
                break;
            }
        }
    }

    render() {
        return this.state.title;
    }
}

ReactDOM.render(
    <PersonList />,
    document.getElementById('personArea')
);

ReactDOM.render(
    <ChatView personID="001" />,
    document.getElementById('messageArea')
);

ReactDOM.render(
    <TitleBar personID="001" />,
    document.getElementById('titleBar')
);

document.getElementById("inputMsg").focus();
