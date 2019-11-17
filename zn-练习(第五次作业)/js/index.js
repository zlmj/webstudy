class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.chats
        };
    }
    render() {
        return (<div class="left">
            <div class="top">
                <input type="text" placeholder="搜索" />
                <a href="javascript:;" class="search"></a>
            </div>
            <ul class="people">
                {/* {
                    this.state.chats.map((ch) =>
                        <li class="person" >
                            <img src="ch.img" alt="" />
                            <span class="name">{ch.name}</span>
                            <span class="time">{ch.date}</span>
                            <span class="preview">{ch.lstmsg}</span>
                        </li>
                    )} */}
            </ul>
        </div >);
    }
}

class Chat extends React.Component {
    render() {
        return (<h1>34dfsdfd</h1>);
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state.data = props.data;
    }
    render() {
        return (<div class="container">
            <ChatList chats={this.state.data.chats}></ChatList>
            {/* <Chat data={this.state.data}></Chat> */}
        </div>);
    }
}


var data = {
    curpsn: "刘能",
    msg: "",//当前输入消息
    hismsg: [
        { psn: "谢广坤", msg: "刘能，别跟我抢村长！", date: "2019-11-10 22:57:41", sysmsg: false },
        { psn: "刘能", msg: " 广坤，我~我~我~跟你说，别得意...有能耐我们比试比试", date: "2019-11-10 23:01:41", sysmsg: false },
        { psn: "", msg: "系统消息：谢大脚加入讨论组", date: "2019-11-10 22:57:41", sysmsg: true },
        { psn: "谢大脚", msg: " 你们俩再说啥呢？", date: "2019-11-10 23:06:41", sysmsg: false },
    ],//历史消息列表
    chats: [
        { img: "img/谢大脚.jpg", name: "谢大脚", date: "2:09 PM", "lstmsg": "刘能，把上次的烟钱给结了" },
        { img: "img/刘能.jpg", name: "刘能", date: "2:10 PM", "lstmsg": "大脚，别~别闹，咱家玉~玉米卖了就结账" },
        { img: "img/谢广坤.jpg", name: "谢广坤", date: "2:12 PM", "lstmsg": "刘能你脸皮真厚！" },
    ] //讨论列表
};
ReactDOM.render(<Container data={data}></Container>, document.getElementById("wrapper"));