/**
 * @Author: zq
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   zq
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function () {
    //1. 主体内容部分
    $.ajax({
        url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getmoneyctrl'],
        type: 'get',
        data: {pageid: 0},
        dataType: 'json',
        async: 'true',
        success: function (data) {
            var html = '';
            for (var k in data.result) {
                html +=  '<li>'
                    +'<a href="#" id="'+data.result[k].productId+'">'
                    + '<span class="left_pic">' + data.result[k].productImgSm + '</span>'
                    + '<span class="right_text">'
                    + '<i>' + data.result[k].productName + '<n>' + data.result[k].productPinkage + '</n></i>'
                    + '<span class="price">'
                    + '<span>' + data.result[k].productFrom + '|' + data.result[k].productTime + '</span>'
                    + '<span class="comment fr">'
                    + '<s class="glyphicon glyphicon-comment"></s>'
                    + '<span>' + data.result[k].productComCount + '</span>'
                    + '</span>'
                    + '</span>'
                    + '</a>'
                    + '</li>'
            }
            $('.product ul').html(html);

            /* 2.渲染页数下拉菜单 */
            var fenmu = data.pagesize;
            var pages = Math.ceil(data.totalCount / fenmu);
            var selStr = '';
            for (var i = 0; i < pages; i++) {
                selStr += '<option value="' + i + '">' + (i + 1) + '/' + pages + '</option>';
            }
            selStr = '<select name="" id="">'
                + selStr
                + '</select>';
            $('.page form').html(selStr);

            /* 3.渲染完成后，给select注册change事件，用来监听页数number，当发生改变时，根据select的value值来传参，进行ajax请求 */
            $('.page form select').on('change', function () {
                var pageid = this.value;
                /*向后台请求数据*/
                $.ajax({
                    url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getmoneyctrl'],
                    dataType: 'json',
                    data: {pageid: pageid},
                    /* 这里传的键值对，前面的pageid是接口文档提供的，后面的是自己获取到的值 */
                    type: 'get',
                    success: function (data) {
                        //重复加载页面时的渲染过程，直接拿过来用即可
                        var html = '';
                        for (var k in data.result) {
                            html += '<li>'
                                +'<a href="#" id="'+data.result[k].productId+'">'
                                + '<span class="left_pic">' + data.result[k].productImgSm + '</span>'

                                + '<span class="right_text">'
                                + '<i>' + data.result[k].productName + '<n>' + data.result[k].productPinkage + '</n></i>'
                                + '<span class="price">'
                                + '<span>' + data.result[k].productFrom + '|' + data.result[k].productTime + '</span>'
                                + '<span class="comment fr">'
                                + '<s class="glyphicon glyphicon-comment"></s>'
                                + '<span>' + data.result[k].productComCount + '</span>'
                                + '</span>'
                                + '</span>'
                                + '</a>'
                                + '</li>'
                        }
                        $('.product ul').html(html);
                    },
                    fail: function (error) {
                        alert('请求失败');
                    }
                })
            });


            /* 4.接着实现点击下一页上一页功能 */
            $('.next_page').on('click', function () {
                //先获取到当前select的value值
                //点击下一页时，其实就是要跳转到当前页对应的option的下一个option
                var pageIndex = parseInt($('.page form select')[0].value);
                console.log(pageIndex);
                if(pageIndex >= pages-1){
                    pageIndex = pages-1;
                    return;
                }
                $('.page form select option').removeAttr('selected').eq(pageIndex+=1).attr('selected', true);
                $('.page form select').val(pageIndex);
                $('.page form select').change();
            });
            $('.pre_page').on('click',function(){
                var pageIndex = parseInt($('.page form select')[0].value);
                console.log(pageIndex);
                if(pageIndex <=0){
                    pageIndex = 0;
                    return;
                }
                $('.page form select option').removeAttr('selected').eq(pageIndex=pageIndex-1).attr('selected', true);
                $('.page form select').val(pageIndex);
                $('.page form select').change();
            })

        },
        fail: function (error) {
            alert('请求的数据不存在');
        }
    });
});