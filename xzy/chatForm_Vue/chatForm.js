window.onload = function () {
    var vm = new Vue({
        el: "#wrapper",
        data: {
            loginUser: "向中燕",                //登陆用户名
            allPerson: chatListData,            //所有讨论组
            activePersonID: "001",              //选中的讨论组ID
            activeChatMsg: msgHistory["001"],   //选中的讨论组的历史消息
            chatFormTitle: chatListData[0].title,   //聊天窗口标题
            inputValue: null,                   //消息输入框的内容
            searchTxt: null                     //搜索框的内容
        },
        methods: {
            //切换焦点行
            changeActive: function (id) {
                this.activePersonID = id;
                this.activeChatMsg = msgHistory[id];

                //更新聊天窗口标题
                for (var i = 0; i < chatListData.length; i++) {
                    if (chatListData[i].chatID == id) {
                        this.chatFormTitle = chatListData[i].title;
                        break;
                    }
                }
            },
            //发消息
            sendMsg: function () {                
                var input = document.getElementById("inputMsg");
                input.focus();
                if (this.inputValue == null || this.inputValue == "") {
                    return;
                }
                
                var nowtime = new Date();
                var time = nowtime.Format("yyyy-MM-dd HH:mm:ss");

                var newMsg = {};
                newMsg.userName = this.loginUser;
                newMsg.time = time;
                newMsg.img = "../resource/image/user1.jpg";
                newMsg.msg = this.inputValue;

                this.activeChatMsg.push(newMsg);
                this.inputValue = null;
            }
        }
    });

    //发消息后，滚动条到底。
    vm.$watch('activeChatMsg', function (nval, oval) {
        var msgArea = document.getElementById("messageArea");
        msgArea.scrollTop = msgArea.scrollHeight;
    });

    document.getElementById("inputMsg").focus();
}