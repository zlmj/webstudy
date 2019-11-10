window.onload = function () {
    new Vue({
        el: "#wrapper"
        , data: {
            allPerson: chatListData
            , currentMsgID: "001"
            , msgList: msgHistory["001"]
            , currentUser: "向中燕"
            , inputValue: ""
        }
        , methods: {
            changeActive: function (id) {
                this.currentMsgID = id;
                this.msgList = msgHistory[id];
            }
            , sendMsg: function () {
                if (this.inputValue == null || this.inputValue == "") {
                    return;
                }

                var nowtime = new Date();
                var time = nowtime.Format("yyyy-MM-dd HH:mm:ss");

                var newMsg = {};
                newMsg.userName = this.currentUser;
                newMsg.time = time;
                newMsg.img = "../resource/image/user1.jpg";
                newMsg.msg = this.inputValue;

                this.msgList.push(newMsg);
                this.inputValue = null;
                
                var msgArea = document.getElementById("messageArea");
                msgArea.scrollTop = msgArea.scrollHeight;
                var input = document.getElementById("inputMsg");
                input.focus();
            }
        }
    });

    document.getElementById("inputMsg").focus();
}