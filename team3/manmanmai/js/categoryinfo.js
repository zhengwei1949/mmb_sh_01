/**
 * Created by leiyutian on 2016/11/26.
 */
$(function() {
    //截取url发送过来的数据
    var url = window.location.search;
    // var i = url.substring(url.lastIndexOf('=')+1,url.length);
    var i = queryId(url).productId;

    getAjaxdata('getproduct', { productid: i }, function(v) {
        console.log(v);
        //console.log($('.wraper')[0]);
        $('.main').append(template('productinfo', v));
    });


    getAjaxdata('getproductcom', { productid: i }, function(v) {
        console.log(v);
        //console.log($('.wraper')[0]);
        $('.main').append(template('cominfo', v));
    });














    //封装的Ajax请求方法
    function getAjaxdata(url, dt, fn) {
        $.ajax({
            get: 'get',
            url: 'http://127.0.0.1:9090/api/' + url,
            data: dt,
            dataType: 'json',
            success: function(data) {
                fn(data);
            }
        })
    }

    function queryId(url) {
        var obj = {};
        var str = url.split('?')[1];
        str.split('&').forEach(function(v, i) {
            var arr = v.split('=');
            obj[arr[0]] = arr[1] ? arr[1] : '';
        })
        return obj;
    }
})
