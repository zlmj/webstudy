window.onload = function () {
    var chatV = new Vue({
        el: "#wrapper",
        data: {
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
        },
        methods: {
            sendmsg: function () {
                if (this.msg) {
                    var data = { psn: this.curpsn, msg: this.msg, date: '', sysmsg: false };
                    this.hismsg.push(data);
                    var chat = document.getElementsByClassName("chat");
                    chat[0].scrollTop = chat[0].scrollHeight;
                    this.msg = "";
                }
            },
        }
    });
};




// $(function () {
//     // $.get("http://192.168.31.146:8066/chat/getchatroombyuid?uid=u00", function (data, status) {
//     //     alert("数据: " + data + "\n状态: " + status);
//     // });
//     $("#tmsg").keyup(function () {
//         reFunction();
//     });

//     $("div.button button").click(function () {
//         myFunction();
//     });

//     $("ul li.person").click(function () {
//         $("ul li.active").removeClass("active");
//         $(this).addClass("active");
//     });

//     $("div.top input").keyup(function () {
//         if (event.keyCode == 13) {
//             search();
//         }
//     });

//     $(".search").click(function () {
//         search();
//     });
//     var search = function () {
//         var value = $("div.top input").val();
//         $(".people .person").each(function () {
//             var value2 = $(this).children(".name").text();
//             if (value2.indexOf(value) > -1) {
//                 $(this).click();
//                 return false;
//             }
//         });
//     }

//     function myFunction() {
//         var tmsg = $("#tmsg").val();
//         if (tmsg) {
//             var ele = document.createElement("div");
//             ele.className = "msgitem";
//             ele.innerHTML = '<span class="himg right"></span> <div class="ut right"> 刘能</div><div class="bubble me">' + tmsg + '</div>';
//             var chat = document.getElementsByClassName("chat");
//             chat[0].appendChild(ele);
//             $("#tmsg").val("");
//             chat[0].scrollTop = chat[0].scrollHeight;

//         }
//     }
//     function reFunction() {
//         if (event.keyCode == 13) {
//             myFunction();
//         }
//     }
// });

