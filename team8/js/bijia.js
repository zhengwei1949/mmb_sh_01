/**
 * Created by admin on 2016/11/26.
 */
(function () {

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    /*渲染导航栏点击事件获取数据*/
    (function () {
        renderHtml();
    })();

    function renderHtml() {
        /*获取导航栏数据渲染页面*/
        renderNav();
        function renderNav() {
            /*获取当前页面的data值*/
            /*需要解析当前页面获取的URL数据，获取后返回对象*/
            var categoryid = tools.query(location.search).categoryid;
            tools.getData(URL.getproNav, {categoryid:categoryid}, function (data) {
                var html = template("detailsNav", data);
                $('.pronavLinks').append(html);
            });
        }
        /*提取全局变量productid*/
        var productid;
        /*获取商品详情页数据渲染页面start*/
        renderDetails();
        function renderDetails() {
            productid =tools.query(location.search).productid;
            tools.getData(URL.getDetails,{productid:productid},function (data) {
                var html = template("detailsShow", data);
                $('.detailsShow').append(html);
                var titleName =(data.result[0].productName).split(' ')[0];
                $('<a href="category.html">'+titleName+'</a><i class="iconfont icon-xiangyou1"></i>').appendTo('.pronavLinks');
            })
        }
        /*获取商品详情页数据渲染页面end*/
        /*获取商品评论数据渲染页面start*/
        renderCom();
        function renderCom() {
            tools.getData(URL.getContent,{productid:productid},function (data) {
                var html = template("comContent", data);
                $('.comContent ul').append(html);
            })
        }
        /*获取商品评论数据渲染页面end*/


    }

})();
