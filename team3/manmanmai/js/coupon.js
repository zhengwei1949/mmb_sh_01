$(function(){
	$(".container").css('minHeight', $(window).height() - $("footer").get(0).offsetHeight - $("header").height());

	$.ajax({
		type:'get',
		url:"http://127.0.0.1:9090/api/getcoupon",
		async:true,
		dataType:"json",
		success:function(data){
			var html=template("coupon",data);
			$(".container").html(html);

		}
	});
});