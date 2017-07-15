$(function () {
    getData();
    getProduct();
    returnTop('#reTop');
})

function getData() {
    $.ajax({
        url: url() + '/api/getindexmenu',
        data: {},
        dataType: 'json',
        success: function (data) {
            var h = template('category1', data);
            var cate = document.getElementById('category');
            cate.innerHTML = h;
            getMore();
            $('.category li').on('click', function () {
                var index = $(this).index();
                var road = data.result[index].titlehref;
                var text = '';
                if (index == 1 || index == 4) {
                    text = data.result[index].name;
                }
                window.location = 'pages/' + road + '?name=' + text;
            });
        }
    });
}

function getMore() {
    var $menu = $(".category > ul >li:gt(7)");
    $menu.hide();
    var $moreBtn = $(".category > ul >li:eq(7)> a");
    $moreBtn.click(function () {
        $menu.toggle();
        return false;
    })
}

function getProduct() {
    $.ajax({
        url: url() + '/api/getmoneyctrl',
        data: {},
        dataTpe: 'json',
        success: function (data) {
            var html = template('product', data);
            var con = document.getElementById('recommendCon');
            con.innerHTML = html;
        }
    })
}
