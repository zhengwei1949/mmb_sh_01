$(function(){
	$.ajax({
		url:'http://'+net.url+':9090/api/getcoupon',
		type:'get',
		dataType:'json',
		success:function(data) {
			var html = template('tpl',data);
			$('.couponBox').append(html);
			$('.infoBox').tap(function(e){
				
				 window.localStorage.setItem('num',$(this).attr('data-id'));
			})
		}
	})
})