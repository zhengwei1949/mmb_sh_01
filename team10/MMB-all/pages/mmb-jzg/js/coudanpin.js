

setFilter($('.filter'));
setShop($('.shop_down'));
setArea($('.areasele'));
setProduct($('.pro_shop'), { "shopid": 0, "areaid": 0 });
//设置点击返回上一页
$('.return').on('click', function(){
        window.history.back(-1);
    })

var lis = $('.filter').find('li');
lis[0].onclick = function(){
	$('.areasele').css('display', 'none');
	$('.shop_down').css('display', 'block');
}
lis[1].onclick = function(){
	$('.shop_down').css('display', 'none');
	$('.areasele').css('display', 'block');
}
$('.areasele').click(function(){
	$(this).hide();
})
$('.shop_down').click(function(){
	$(this).hide();
})

//给标签栏渲染数据
function setFilter(dom, data, callback) {
    var data = { "result": [{ "selected": "京东", "selectName": "shop" }, { "selected": "华北", "selectName": "area" }, { "selected": "全部价格", "selectName": "price" }] };
    var html = template('filter', data);
    dom.html(html);
}
//给商城下拉框渲染数据
function setShop(dom, shopUrl) {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getgsshop",
        success: function(data) {
            var html = template('shop_down', data);
            dom.html(html);
        }
    })
}

    



//给地域下拉框渲染数据
function setArea(dom){
	$.ajax({
		url: "http://127.0.0.1:9090/api/getgsshoparea",
		success: function(data){
			var html = template('areasele', data);
			dom.html(html);
		}
	})
}

//给商品列表渲染数据
function setProduct(dom,data,callback){
	$.ajax({
        url: "http://127.0.0.1:9090/api/getgsproduct",
        data: { 'shopid': data.shopid || 0, 'areaid': data.areaid || 0 },
        success: function(data) {
            var html = template('pro_shop', data);
            dom.html(html);
        }
    })
}

//设置点击商城下拉框 渲染商品列表数据
function GetShopProduct(select, shopid, shopname) {
    $('.shop').html(shopname + "<i></i>");
    var areaid = $('.filter').find('.area').data('id');
    setProduct($('.pro_shop'), { "shopid": shopid, "areaid": areaid });
}

//设置点击地域下拉框  渲染商品列表数据
function GetAreaProduct(select, areaid, areaname) {
    $('.area').html(areaname + "<i></i>");
    var shopid = $('.filter').find('.shop').data('id');
    setProduct($('.pro_shop'), { "shopid": shopid, "areaid": areaid });
}