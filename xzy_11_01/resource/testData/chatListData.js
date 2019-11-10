var chatListData = [{
    "chatID": "001",
    "title": "css学习小组",
    "img": "../resource/image/user1.jpg",
    "lastTime": "10-20",
    "lastMsg": "css有3种布局模型，分别是：流布局，浮动布局，和层布局。",
    "isActive": true
}, {
    "chatID": "002",
    "title": "html学习小组",
    "img": "../resource/image/user1.jpg",
    "lastTime": "10-19",
    "lastMsg": "html用于定位元素的属性有class和id"
}
    , {
    "chatID": "003",
    "title": "js学习小组",
    "img": "../resource/image/user1.jpg",
    "lastTime": "10-18",
    "lastMsg": "最新的js版本是ECMAScript 6"
}]

var msgData_001 = [
    {
        "userName": "向中燕",
        "time": "2019-10-20 18:25",
        "msg": "请问css有几种布局模型？",
        "img": "../resource/image/user1.jpg"
    }, {
        "userName": "李雷",
        "time": "2019-10-20 18:26",
        "msg": "css有3种布局模型，分别是：流布局，浮动布局，和层布局。",
        "img": "../resource/image/user1.jpg"
    }
];

var msgData_002 = [
    {
        "userName": "向中燕",
        "time": "2019-10-19 18:34",
        "msg": "html用什么方式定位元素？",
        "img": "../resource/image/user1.jpg"
    }, {
        "userName": "李雷",
        "time": "2019-10-19 18:35",
        "msg": "html通过属性class和id定位元素",
        "img": "../resource/image/user1.jpg"
    }
]

var msgData_003 = [
    {
        "userName": "向中燕",
        "time": "2019-10-18 18:40",
        "msg": "定义js语法的最新的标准是？",
        "img": "../resource/image/user1.jpg"
    }, {
        "userName": "李雷",
        "time": "2019-10-18 18:41",
        "msg": "最新的js版本是ECMAScript 6",
        "img": "../resource/image/user1.jpg"
    }
]

var msgHistory = {
    "001": msgData_001
    , "002": msgData_002
    , "003": msgData_003
}