/**
 * Created by 永恒 on 2016/11/30.
 */
// 渲染头部的数据
(function(){
    $(function(){
        function location () {
            var url = window.location.search;
            var data = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    data[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return data;
        };
        location();
        var data = location().productId;
        function get() {
            $.ajax({
                dataType:"json",
                type:"GET",
                data:{productid:data},
                url:"http://127.0.0.1:9090/api/getproduct",
                success:function (data) {
                    var bjShop = data. result[0].bjShop;
                    var productImg = data.result[0].productImg;
                    var productName = data.result[0].productName;
                    $(".product-name").html(productName);
                    $(".product-img").html(productImg);
                    $(".plist").html(bjShop);
                }
            })
        }
        get();

        //渲染评论数据
        function set() {
            $.ajax({
                dataType:"json",
                type:'GET',
                data:{productid:data},
                url:"http://mmb.ittun.com/api/getproductcom",
                success:function (data) {
                    var html = template("gata",data);
                    $(".style").html(html);
                }
            })
        }
        set()
    });
})()
