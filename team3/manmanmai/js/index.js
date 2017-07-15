$(function() {
	//请求导航栏上的数据
	queryData({}, "http://127.0.0.1:9090/api/getindexmenu", function(data) {
		var html = template('navList', data);
		$('.nav').html(html);
		//初始化
		$('.list:gt(7)').hide();
		//点击'更多'效果
		$('.list:gt(6)').on('click', function() {
			$('.list:gt(7)').toggle();
		});
	});

	//请求折扣列表中的数据
	queryData({}, "http://127.0.0.1:9090/api/getmoneyctrl", function(data) {
		var html = template('moneyCtrl', data);
		$('.listItems').html(html);
	});

});