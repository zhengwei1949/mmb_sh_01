/**
 * autor:liqungwu
 * date:2016-7-14
 */

//请求数据渲染页面
setFilter($('.filterBox'));
setShop($('.popShop'));
setArea($('.popArea'));
setProductList($('.gsProductList'), {'shopid': 0, 'areaid': 0})

//点击显示隐藏下拉列表
$('.filter ul li').eq(0).on('click', function () {
    $('.popShop').toggleClass('hide');
    $('.popArea').removeClass('hide').addClass('hide');
})

$('.filter ul li').eq(1).on('click', function () {
    $('.popArea').toggleClass('hide');
    $('.popShop').removeClass('hide').addClass('hide');
})

//方法
function setFilter(dom) {
    var data = {
        "result": [{"selected": "京东", "selectName": "shop"},
            {"selected": "华北", "selectName": "area"},
            {"selected": "全部价格", "selectName": "price"}]
    };
    var html = template('gsFilter', data);
    dom.html(html);
}

function setShop(dom) {
    $.ajax({
        url: getUrl()+'getgsshop',
        success: function (data) {
            var html = template('gsShop', data);
            dom.html(html);
        }
    })
}

function setArea(dom) {
    $.ajax({
        url: getUrl()+'getgsshoparea',
        success: function (data) {
            var html = template('gsArea', data);
            dom.html(html);
        }
    })
}

function setProductList(dom, data) {
    $.ajax({
        url: getUrl()+'getgsproduct',
        data: data,
        success: function (data) {
            var html = template('gsProductList', data);
            dom.html(html);
        }
    })
}

function getShopProduct(shopid, shopname) {
    $('.popShop').addClass('hide');
    $('.shop').html(shopname).attr('data-id', shopid);
    var areaid = $('.filter').find('.area').attr('data-id');
    setProductList($('.gsProductList'), {'shopid': shopid, 'areaid': areaid});
}

function getAreaProduct(areaid, areaname) {
    $('.popArea').addClass('hide');
    $('.area').html(areaname).attr('data-id', areaid);
    var shopid = $('.filter').find('.shop').attr('data-id');
    setProductList($('.gsProductList'), {'shopid': shopid, 'areaid': areaid});
}

