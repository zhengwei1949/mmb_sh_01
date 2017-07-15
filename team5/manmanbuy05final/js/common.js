/**
 * Created by Administrator on 2016/11/26.
 */

//封装的mmb对象，提供一些方法
window.mmb = {

    /*---集中管理url地址---*/
    url1: "http://127.0.0.1:9090/api/getbaicaijiatitle",
    url2: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
    url3: "http://127.0.0.1:9090/api/getgsshop",
    url4: "http://127.0.0.1:9090/api/getgsshoparea",
    url5: "http://127.0.0.1:9090/api/getgsproduct",
    /*---footter部分返回顶部的实现函数goBack----*/
    goBack: function () {
        //点击"返回顶部"字样回到顶部
        $(".footer-back").click(function () {
            document.body.scrollTop = 0;
        })
        //点arow回到顶部
        $("#arow").click(function () {
            document.body.scrollTop = 0;
        })
    },

};

