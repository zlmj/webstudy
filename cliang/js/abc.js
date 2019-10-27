function send()
{
    var msg=" <div class='msg me'>"+$("#msgvalue").val()+"</div>";
    $("#contentvalue").append(msg);
    $("#msgvalue").val("");
}
var selectItem;
var data;
//读取人员列表
function ReaderPersonList()
{
   /* $.ajax(
        {
            type : "get",   
            async:false,
            data:"{}",
            dataType:"jsonp",
            url : "http://192.168.31.120:8080/chat/second.html?uid=fj", 
            error : function(XMLHttpRequest, textStatus, errorThrown) {   
                alert("错误:"+textStatus);
                alert(XMLHttpRequest.readyState);
            },    
            success : function(data) {   
                        alert(data);
            }
        });*/
        $("#peoples").empty();
    data=[{"SystemID":"zlhis","MainCode":"病历","MainID":"false","Subject":"病历讨论","LastUname":"张三","LastUid":"u001","Unread":0,"Uname":"张三","LastTime":"2019-10-19 11:53:44","CreateTime":"2019-10-18 10:25:51","CreatorID":"u001","Creator":"张三","LastMsg":""},{"SystemID":"zlhis","MainCode":"病历","MainID":"0001","Subject":"病历讨论","LastUname":"李四","LastUid":"u002","Unread":0,"Uname":"张三","LastTime":"2019-10-24 18:30:56","CreateTime":"2019-10-18 09:41:48","CreatorID":"u001","Creator":"张三","LastMsg":"传输"}];
     
    var i=0;
    data.forEach(element => {
        var msg="<li class='person' data-chat='person1' onmousedown='ItemMouseDown(this)' itemindex="+
        i+" ><img src='image/user1.jpg' alt=''/><span class='name'>"+
        element.LastUname+"</span><span class='time'>"+
        element.LastTime +"</span><span class='preview'>"+
        element.Subject +"</span></li>"
        $("#peoples").append(msg);
        i=i+1;
    });
}

function ItemMouseDown(item)
{
    if(selectItem!=undefined)
    {
        selectItem.style = "";
    }
    item.style = "background-color: cornsilk";
    selectItem=item;

   var itemindex= item.getAttribute("itemindex");
   var element =data[itemindex];
   var datavalue={};//{ system: “zlhis”,maincode:”病历”,mainId:” 0001”}
   datavalue.system=element.SystemID;
   datavalue.maincode=element.MainCode
   datavalue.mainId=element.MainID;
   $.ajax(
    {
        url: "http://192.168.31.146:8066/record/getall",
            type: "post",
            data: { system: "zlhis",maincode:"病历",mainId:"0001"},
            success: function (result) {
                alert(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
    });
}