$(function() {
	function GetQueryString(name){
		var reg = new RegExp('(^|&)' + name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null){
			return unescape(r[2]);
		}
		return null;
	}
	// 获取内容详情的ajax：
	$.ajax({
		url:getUrl()+'api/getproduct',
		data:{productid:GetQueryString('productid')},
		success:function(data) {
			var html=template('template',data);
			$('.product_message').html(html);
		}
	});
	// 获取评论部分的ajax：
	$.ajax({
		url:getUrl()+'getproductcom',
		data:{productid:GetQueryString('productid')},
		success:function (data) {
			var html=template('template1',data);
			$('.product-com-list').html(html);
		}
	});
	// 点击评论关闭
	var flag = false;
	$(".product-com-title").on("click",function(){
		if(!flag) {
			$(".product-com-list").css("display","none");
			flag = true;
		} else {
			$(".product-com-list").css("display","block");
			flag = false;
		}

	})
})
