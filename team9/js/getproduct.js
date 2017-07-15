$(function() {
	// 获取内容详情的ajax：
	var num=window.location.search.split("=");
	num = num[1];
	console.log(num);
	$.ajax({
		url:'http://mmb.ittun.com/api/getproduct',
		data:{productid:num},
		success:function(data) {
			var html=template('template',data);
			$('.product_message').html(html);
		}
	});
	// 获取评论部分的ajax：
	$.ajax({
		url:'http://mmb.ittun.com/api/getproductcom',
		data:{productid:num},
		success:function (data) {
			var html=template('template1',data);
			$('.product-com-list').html(html);
		}
	});
})
