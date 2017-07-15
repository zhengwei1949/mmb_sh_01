$(function () {
    //页面一加载完成即执行ajax请求，获得数据
    $.getJSON(url() + '/api/getcategorytitle', function (data) {
        //把返回的数据通过模板引擎进行处理
        var tag = template('navTitle', data);
        //把标签字符串添加到页面中
        $(".nav").html(tag);

        //进行点击事件的监听，按下即触发
        $('.nav .nav-title').on('click', function () {
            //让本次点击的导航标题下的导航内容切换显示与隐藏
            //并让相邻的导航内容隐藏
            $(this).next().toggle().parent().siblings().find('.nav-content').hide();
            //记录下当前按钮的id值
            var id = $(this).attr('id')
            //进行二级ajax请求
            $.getJSON(url() + '/api/getcategory',
                {titleid: id},
                function (data) {
                    var tag2 = template('navContent', data);
                    //把标签字符串添加到符合id值的对应的导航内容之中
                    $('.nav .nav-content:eq(' + id + ')').html(tag2);
                });
        })
    });
});
