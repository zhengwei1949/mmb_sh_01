$(function() {

	var main = $('.main');
	// 获取商品导航的ajax：
	$.ajax({
			url:getUrl()+'getsitenav',
			success: function(data) {
				var html=template('template',data);
				console.log(html);
				main.html(html);
			}
		});
});