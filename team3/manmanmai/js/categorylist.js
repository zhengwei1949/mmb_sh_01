/**
 * Created by leiyutian on 2016/11/25.
 */
$(function() {
    //截取url发送过来的数据
    var url = window.location.search;
    // var i = url.substring(url.lastIndexOf('=')+1,url.length);
    var i = queryId(url).categoryId;

    //调用getAjaxdata,改变列表多级导航
    getAjaxdata('getcategorybyid', { categoryid: i }, function(v) {
        $('.nav_index').html(template('catebyid', v));
    });
    //页面第一次请求加载数据
    getAjaxdata('getproductlist', { categoryid: i }, function(v) {
        $('.product_hot_info').html(template('gstv', v));
    });
    //渲染的总条数为16条
    var sumstr = '';
    for (var j = 0; j < 16; j++) {
        sumstr += '<option value="' + j + '">' + (j + 1) + '\/16</option>';
    }
    $('.select_area').append(sumstr);
    //设置下拉框显示当前页面
    $('.select_area').val(i);

    //点击上一页，渲染对应的页面
    $('.prev').click(function() {
        var va = $('.select_area').get(0).selectedIndex;
        if (va >= 1) {
            va--;
            $('.select_area').val(va); //4  0
            getAjaxdata('getproductlist', { categoryid: va }, function(v) {
                $('.product_hot_info').html(template('gstv', v));
            });
            getAjaxdata('getcategorybyid', { categoryid: va }, function(v) {
                $('.nav_index').html(template('catebyid', v));
            });
        }
    });
    //点击下一页，渲染页面
    $('.next').click(function() {
        var va = $('.select_area').get(0).selectedIndex;
        if (va < 16) {
            va++
            $('.select_area').val(va); //12
            getAjaxdata('getproductlist', { categoryid: va }, function(v) {
                $('.product_hot_info').html(template('gstv', v));
            });
            getAjaxdata('getcategorybyid', { categoryid: va }, function(v) {
                $('.nav_index').html(template('catebyid', v));
            });
        }
    });

    //点击select下拉框 选择对应选项对应请求数据
    $('.select_area').change(function() {
        var test = $(this).children('option:selected').val();
        getAjaxdata('getproductlist', { categoryid: test }, function(v) {
            $('.product_hot_info').html(template('gstv', v));
        });
        getAjaxdata('getcategorybyid', { categoryid: test }, function(v) {
            $('.nav_index').html(template('catebyid', v));
        });
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
});
