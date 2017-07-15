$(function() {

    var pageCount, pageSize, totalCount, id;

    $(".sqk-content").css('minHeight', window.innerHeight - $("footer").height() - $(".sqk-header").height() - $(".sqk-pageselect").height() - 30);

    //页数切换
    //点击《下一页》按钮
    $("#btn_n").click(function() {
        if ($("#pageselect").get(0).selectedIndex === pageCount - 1) {
            return;
        }
        $("#pageselect").get(0).selectedIndex++;
        id = $("#pageselect").find("option:selected").val();
        queryData(id);
        backTop(200);
    })

    //点击《上一页》按钮
    $("#btn_p").click(function() {
        if ($("#pageselect").get(0).selectedIndex === 0) {
            return;
        }
        $("#pageselect").get(0).selectedIndex--;
        id = $("#pageselect").find("option:selected").val();
        queryData(id);
        backTop(200);
    })

    // 点击select选择页书
    $("#pageselect").change(function() {
        id = $("#pageselect").find("option:selected").val();
        queryData(id);
        backTop(100);
    });

    //获取数据，渲染页面
    function queryData(id) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl?pageid=' + id,
            // url: 'http://www.dii.com/manmanmai/api/moneyctrl.php',
            // data: { pageid: id },
            dataType: 'json',
            success: function(data) {
                render(data);
            }
        })
    }

    // 页面添加数据的方法
    function render(data) {
        var html = template('productRender', data);
        $(".sqk-content").find('li').remove();
        $(".sqk-content").children('ul').html(html);
    }

    //首次渲染页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        // url: 'http://www.dii.com/manmanmai/api/moneyctrl.php',
        data: { pageid: id },
        dataType: 'json',
        success: function(data) {
            //模版引擎渲染页面
            render(data);

            //计算总页数
            pageSize = data.pagesize;
            totalCount = data.totalCount;
            pageCount = Math.ceil(totalCount / pageSize);

            //根据总页数添加option
            var option = '';
            for (var i = 0; i < pageCount; i++) {
                option += '<option value="' + i + '">' + (i + 1) + '</option>'
            }
            $("#pageselect").append(option);
        }
    })

    //返回顶部
    function backTop(time) {
        $('html,body').stop().animate({ 'scrollTop': 0 }, time);
    }

    $('.backTop').on('click', function() {
        backTop(300);
    });
});
