
function getImg(){
	$.ajax({
		// 请求方式是get
		type : 'get',
		data:{},
        url : 'http://127.0.0.1:9090/api/getinlanddiscount',
        // 数据类型是json
        dataType : 'json',
        // 回调函数
        success : function(data){
        	
        	// $符的参数是获取到ul元素，template的两个参数，第一个代表的是id名，第二个是返回的数据data
        	$( ".goods ul" ).html( template( "goods", data ));
        	$('li').click(function(){
        		window.localStorage.setItem('num',$(this).attr('data-id'));
        	})
        }
	});
}
getImg();




$(function(){
	$("#back").click(function(){
		$("html,body").animate({scrollTop:0},500);
	})
})	