/**
 * Created by admin on 2016/11/28.
 */
var URL = {
    getMenu:"http://mmb.ittun.com/api/getindexmenu",  //index
    getDiscount:"http://mmb.ittun.com/api/getmoneyctrl",  //index
    getTitle:"http://mmb.ittun.com/api/getcategorytitle",  //category
    getTable:"http://mmb.ittun.com/api/getcategory",  //category
    getproNav: "http://mmb.ittun.com/api/getcategorybyid",  //productlist
    getproList:"http://mmb.ittun.com/api/getproductlist", //productlist
    getStore:"http://mmb.ittun.com/api/getgsshop",  //gsproduct
    getAddress:"http://mmb.ittun.com/api/getgsshoparea",  //gsproduct
    getProduct:"http://mmb.ittun.com/api/getgsproduct",  //gsproduct
    getDetails:"http://mmb.ittun.com/api/getproduct",  //bijia
    getContent:"http://mmb.ittun.com/api/getproductcom",  //bijia
    getSitenav:"http://mmb.ittun.com/api/getsitenav"  //sitenav
};

/*解析当前页面获取的URL数据，获取后返回对象*/
/*function analyseURL(url) {
    var obj = {};
    var str = url.split("?")[1];
    str.split("&").forEach(function (item) {
        var arr = item.split("=");
        obj[arr[0]] = arr[1] ? arr[1] : '';
    });
    return obj;
}*/


/*获取数据主公共函数*/
/*function getData(url, data, callback) {
    $.ajax({
        type: "get",
        url: url,
        data: data,
        dataType: "json",
        beforSend: function () {
            $(".product").text("正在拼命加载中……");
        },
        success: function (data) {
            callback(data);
        }
    });
}*/

(function (window) {
    function tools() {
    };
    tools.fn = tools.prototype = {
      constrcutor:tools
    };
    tools.extend = tools.fn.extend = function (obj) {
        for(var k in obj){
            this[k] = obj[k];
        }
    };
    tools.extend({
        query:function (url) {
            var obj = {};
            var str = url.split("?")[1];
            str.split("&").forEach(function (item) {
                var arr = item.split("=");
                obj[arr[0]] = arr[1] ? arr[1] : '';
            });
            return obj;
        },
        getData:function (url,data,callback) {
            $.ajax({
                type: "get",
                url: url,
                data: data,
                dataType: "json",
                beforSend: function () {
                    $(".product").text("正在拼命加载中……");
                },
                success: function (data) {
                    callback(data);
                }
            });
        }
    })

    window.tools = tools;
})(window);