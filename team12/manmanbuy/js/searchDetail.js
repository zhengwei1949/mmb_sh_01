$(function () {
    var productId = getData('productId');    //截取当前网页路径中productid的值
    var category = getData('category');
    var com = getData('com');         //截取当前网页路径中评论数的值
    //对商品内容栏部分进行ajax请求
    $.getJSON(url() + '/api/getproduct',
        {productid: productId},
        function (data1) {
            var tag1 = template('content', data1);
            $(".content").html(tag1);
            //$('.layer-left a:eq(1)').find('span').text(category + ' >');
            $('.contrast-tab ul li:eq(2)').text(com);
        });
    //对评论栏内容进行ajax请求
    $.getJSON(url() + '/api/getproductcom',
        {productid: productId},
        function (data2) {
            var tag2 = template('comment', data2);
            $(".comment").html(tag2);
        });

    returnTop('#reTop');    //调用返回顶部函数
});
