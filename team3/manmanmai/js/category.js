$(function() {

    $(".main").css('minHeight', $(window).height() - $("footer").get(0).offsetHeight - $("header").height() - $(".search").get(0).offsetHeight);

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        async: true,
        dataType: 'json',
        success: function(data) {
            //渲染标题栏数据
            var html = template('listTitle', data);
            $('.main').html(html);

            $('.listCont').eq(0).addClass('show');
            $('.listCont:gt(0)').addClass('hide');
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:9090/api/getcategory",
                async: true,
                data: { titleid: 0 },
                dataType: 'json',
                success: function(info) {
                    var html = template('list', info);
                    $('.listCont').eq(0).children().html(html);
                }
            });

            //添加点击事件请求数据
            $('.expandMore').on('click', function() {
                var id = $(this).attr('data-id');
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:9090/api/getcategory",
                    async: true,
                    data: { titleid: id },
                    dataType: 'json',
                    success: function(info) {
                        var html = template('list', info);
                        $('.listCont').eq(id).children().html(html);
                        //增加点击隐藏显示的事件
                        $('.listCont').eq(id).toggleClass('show hide');

                    }

                });



            });






        }

    });



});
