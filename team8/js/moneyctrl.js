window.onload = function () {
    productList();
    next();
    prev();
};

//公用函数封装
function $ajax(value) {
    $.ajax({
        // url: 'http://localhost:9090/api/getmoneyctrl',
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        // url: 'http://192.168.13.81:9090/api/getmoneyctrl',
        type: 'get',
        data: {pageid: value},
        dataType: 'json',
        success: function (data) {
            var svShopHtml = template('sv_shop_art', data)
            $('.sv_shop').html(svShopHtml);
        }
    });
}

//selected渲染页面
function productList() {

    //一开始渲染页面第一页
    $ajax($('option:eq(0)').val());
    //切换渲染页面
    $('#sv_tPage').change(function () {
        $ajax($(this).val());
    });
}


//下一页
function next() {
    $('.sv_next').on('click', function () {
        var pic = $('#sv_tPage').val();
        if (pic < $('option').length) {
            pic++;
        }
        if (pic >= $('option').length) {
            pic = $('option').length-1;
        }
        $ajax(pic);
        $('#sv_tPage').change(function () {
            pic=$(this).val();
        });
        $('#sv_tPage').val(pic);
    })
}

//上一页
function prev() {
    $('.sv_prev').on('click', function () {
        var pic = $('#sv_tPage').val();
        if (pic >= 0) {
            pic--;
        }
        if (pic < 0) {
            pic = 0;
        }
        $ajax(pic);
        $('#sv_tPage').change(function () {
            pic=$(this).val();
        });
        $('#sv_tPage').val(pic);
    })
}