/**
 * Created by yangxu on 2016/11/28.
 */
$(function(){
    //从地址栏获取数据
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var urlStr=decodeURI(window.location.search.substr(1));
        var r=reg.exec(urlStr);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var brandtitleid=getUrlParam("brandtitleid");
    var pagesize=getUrlParam("pagesize");
    //选染页面
    $.ajax({
        url:"http://127.0.0.1:9090/api/getbrandproductlist",
        type:"get",
        data:{"brandtitleid":brandtitleid,"pagesize":pagesize},
        dataType:"Json",
        success:function(data){
            for(var i=0;i<data.result.length;i++){
                data.result[i].skipUrl="brandProductcomment.html?productid="+data.result[i].productId+"&_id="+data.result[i]._id;
                var productImg=data.result[i].productImg;
                var productName=data.result[i].productName;
                var _id=data.result[i]._id;
                window.localStorage.setItem(_id+"img",productImg);
                window.localStorage.setItem(_id+"name",productName);
            }
            var html=template("brandlist",data);
            $(".salelist ul").html(html);
        }
    });
    //返回上级目录
    $(".nav ul li:nth-child(3)").on("click", function () {
        window.history.back(-1);
    })
});