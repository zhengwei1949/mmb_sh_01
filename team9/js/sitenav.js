$(function() {

	var main = $('.main');
	// 获取商品导航的ajax：
	$.ajax({
			url:'http://127.0.0.1:9090/api/getsitenav',
			success: function(data) {
				var html=template('template',data);
				console.log(html);
				main.html(html);
			}
		});
});
