/**
 * Created by yangxu on 2016/11/28.
 */
$(function () {
    //从地址栏获取数据
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var urlStr = decodeURI(window.location.search.substr(1));
        var r = reg.exec(urlStr);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var productid = getUrlParam("productid");
    var _id = getUrlParam("_id");
    var productImg = getUrlParam("productImg");
    var imgData=window.localStorage.getItem(_id+"img");
    var productName = getUrlParam("productName");
    var nameData=window.localStorage.getItem(_id+"name");
    //选染页面
    $.ajax({
        url: "http://127.0.0.1:9090/api/getproductcom",
        type: "get",
        data: {"productid": productid},
        dataType: "Json",
        success: function (data) {
            data.result[0].img=imgData;
            data.result[0].name=nameData;

            var html = template("brandProductComment", data);
            $(".comment").html(html);
        }
    });
    //返回上级目录
    $(".nav .goback").on("click", function () {
        window.history.back(-1);
    });
})