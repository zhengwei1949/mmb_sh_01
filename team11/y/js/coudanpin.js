/**
 * Created by Yang on 2016/11/25.
 */
window.onload=function () {
    setShop($('.popsort'));
    setArea($('.popcat'));
    setProductList($('.product-list'), { "shopid": 0, "areaid": 0 });
    setFilter($('.filter'));
};
function setShop(dom, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsshop",
        type:"get",
        success: function(data) {
            var html = template('gsShop', data);
            dom.html(html);
        }
    })
}
function setArea(dom, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsshoparea",
        success: function(data) {
            var html = template('gsArea', data);
            dom.html(html);
        }
    })
}
function setProductList(dom, data, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsproduct",
        data: { 'shopid': data.shopid || 0, 'areaid': data.areaid || 0 },
        success: function(data) {
            var html = template('gsProductList', data);
            dom.html(html);
        }
    })
}
function setFilter(dom, data, callback) {
    var data = { "result": [{ "selected": "京东", "selectName": "shop" }, { "selected": "华北", "selectName": "area" }, { "selected": "全部价格", "selectName": "price" }] };
    var html = template('filter', data);
    dom.html(html);
}


function SelectShow(selectname) {
    $('#' + selectname).toggleClass('on');
}

function GetShopProduct(select, shopid, shopname) {
    $('.shop').html(shopname + "<i class='iconfont icon-xiangxia1'></i>");
    $('.shop').attr('data-id', shopid);
    $('[data-' + select + ']').parent().removeClass('on');
    $('[data-' + select + '=' + shopid + ']').parent().addClass('on');
    //$('[data-' + select + '=' + shopid + ']').parent().parent().parent().removeClass('on');
    $("#shop").removeClass("on");
    var areaid = $('.filter').find('.area').data('id');
    setProductList($('.product-list'), { "shopid": shopid, "areaid": areaid });
}

function GetAreaProduct(select, areaid, areaname) {
    $('.area').html(areaname + "<i class='iconfont icon-xiangxia1'></i>");
    $('.area').attr('data-id', areaid);
    $('[data-' + select + ']').parent().removeClass('on');
    $('[data-' + select + '=' + areaid + ']').parent().addClass('on');
    //$('[data-' + select + '=' + areaid + ']').parent().parent().parent().removeClass('on');
    $("#area").removeClass("on");
    var shopid = $('.filter').find('.shop').data('id');
    setProductList($('.product-list'), { "shopid": shopid, "areaid": areaid });
}
