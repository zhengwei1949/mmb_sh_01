$(function() {
    //返回回顶部  
    backTop();

    $('.goback').on('click', function() {
        window.history.back(-1);
    })
});


//返回回顶部  函数
function backTop() {
    $('.backTop').on('click', function() {

        $('html,body').stop().animate({
            'scrollTop': 0
        }, 300);
    });
}

//ajax请求数据函数  
function queryData(data, url, callback) {
    $.ajax({
        type: "get",
        url: url,
        async: true,
        dataType: 'json',
        data: data,
        success: function(data) {
            callback(data);

        }
    });
}

//返回上一页
