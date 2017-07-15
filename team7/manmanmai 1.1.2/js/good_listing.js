/**
 * @Author: zq
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   zq
 * @Last Modified time: 2016-11-29 20:00:00
 */
$(function () {
    var curpagenum = 1;
    var maxpagenum;
    //laber();

    //1.商品列表部分
    var c = tool.getParam("categoryid");

    var pagenum = tool.getParam("pageid");

    if (pagenum == undefined || pagenum == null)
        pagenum = 1;
    $.ajax({
        url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getproductlist'],
        type: 'get',
        data: {categoryid: c, pageid: pagenum},
        dataType: 'json',
        async: 'true',
        success: function (data) {

            curpagenum = pagenum;
            maxpagenum = data.totalCount / data.pagesize + data.totalCount % data.pagesize;
            var html = '';
            for (var k in data.result) {
                html += '<li class="clearfix" >' +
                    '<a href="good_details.html?productid=' + data.result[k].productId + '">' +
                    '<span class="left_pic">' + data.result[k].productImg + '</span>' +
                    '<span class="right_text">' +
                    '<i>' + data.result[k].productName + '</i>' +
                    '<b>' + data.result[k].productPrice + '</b>' +
                    '<span class="price">' +
                    '<span>' + data.result[k].productQuote + '</span>' +
                    '<span>' + data.result[k].productCom + '</span>' +
                    '</span>' +
                    '</span>' +
                    '</a>' +
                    '</li>'
            }

            $('.product ul').html(html);

            //2.下拉菜单部分
            var fenmu = data.pagesize;
            var pages = Math.ceil(data.totalCount / fenmu);
            var selStr = '';
            for (var i = 0; i < pages; i++) {
                selStr += '<option value="' + (i+1) + '">' + (i + 1) + '/' + pages + '</option>';
            }
            $('select').append(selStr);

            $('select').on('change', function () {
                var pageid = this.value;
                $.ajax({
                    url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getproductlist'],
                    type: 'get',
                    data: {categoryid: c, pageid: pageid},
                    dataType: 'json',
                    async: 'true',
                    success: function (data) {
                        curpagenum = pagenum;
                        maxpagenum = data.totalCount / data.pagesize + data.totalCount % data.pagesize;

                        var html = '';
                        for (var k in data.result) {
                            html += '<li class="clearfix" >' +
                                '<a href="good_details.html?productid=' + data.result[k].productId + '">' +
                                '<span class="left_pic">' + data.result[k].productImg + '</span>' +
                                '<span class="right_text">' +
                                '<i>' + data.result[k].productName + '</i>' +
                                '<b>' + data.result[k].productPrice + '</b>' +
                                '<span class="price">' +
                                '<span>' + data.result[k].productQuote + '</span>' +
                                '<span>' + data.result[k].productCom + '</span>' +
                                '</span>' +
                                '</span>' +
                                '</a>' +
                                '</li>'
                        }
                        $('.product ul').html(html);
                    },
                    fail: function (error) {
                        alert('请求的数据不存在');
                    }
                });
            });

            /* 4.实现点击下一页功能 */
            $('.next_page').on('click', function () {
                //先获取到当前select的value值

                //点击下一页时，其实就是要跳转到当前页对应的option的下一个option
                var pageIndex = parseInt($('.page form select')[0].value);

                //下一页的value值  所以自加
                pageIndex+=1 ;
                if(pageIndex === pages+1){
                    //判断是否到达最后一页，如果是则直接返回，点击事件结束
                    return;
                }
                //先将下一页的selected属性设置为true,然后移除其所有兄弟元素的该属性
                $('.page form select option').eq(pageIndex).attr('selected', true).siblings().removeAttr('selected');

                //将select的value值设置为下一页的value，触发change事件
                $('.page form select').val(pageIndex).change();
            });

            /* 5.实现点击上一页功能 */
            $('.pre_page').on('click', function () {
                //先获取到当前select的value值
                //点击下一页时，其实就是要跳转到当前页对应的option的下一个option
                var pageIndex = parseInt($('.page form select')[0].value);

                pageIndex-=1;
                if(pageIndex === 0){
                    //判断是否到达第一页，如果是则直接返回，点击事件结束
                    return;
                }
                $('.page form select option').eq(pageIndex).attr('selected', true).siblings().removeAttr('selected');
                $('.page form select').val(pageIndex);

                //将select的value值设置为下一页的value，触发change事件
                $('.page form select').val(pageIndex).change();
            })


        },
        fail: function (error) {
            alert('请求的数据不存在');
        }

    });
    //顶部导航部分
    $.ajax({
        url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getcategorybyid'],
        type:'get',
        data:{categoryid:c},
        dataType:'json',
        success:function(data){
            $(".current a").html(data["result"][0].category);
        }
    })
});


