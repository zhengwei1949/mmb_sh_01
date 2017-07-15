/**
 * @Author: liyang
 * @Date:   2016-11-22 18:50:00
 * @Last Modified by:   liyang
 * @Last Modified time: 2016-11-25 20:00:00
 */

$(function () {
    /* 渲染首页菜单栏 */
    $.getJSON('http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getindexmenu'],
        function (data) {
            var mainTem = template('mainOrder', data);
            $('.main-order').html(mainTem);

            /* 给更多按钮添加点击事件，点击后展开 */
            $('.main-order li a:eq(7)').on('click', function () {
                $(this).parent().parent().toggleClass('moreHeight');
            })
        }
    );
    /* 渲染超值折扣商品列表 */
    $.getJSON('http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getinlanddiscount'],
        function (data) {
            console.log(data);
            var countProduct = template('countProduct', data);
            $('.countList').html(countProduct);
        }
    )
});
