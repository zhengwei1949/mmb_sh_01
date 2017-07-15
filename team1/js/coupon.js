

$(function (){
'use strict';
	setCoupon($('.coupon-title'))
	function setCoupon(dom,callback){
		$.getJSON("http://mmb.ittun.com/api/getcoupon",function (data) {
			var html = template('couponTitle',data);
			dom.html(html);
		});
	}
});
