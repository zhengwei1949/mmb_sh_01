getMoney();
function getMoney(){
    var productId = $('#goods').val();
    var num = window.localStorage.getItem('num');
    num = +num + 20;
    
	$.ajax({
		// 请求方式是get
		type : 'get',
		data:{productid:num},
        url : 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        // 数据类型是json
        dataType : 'json',
        // 回调函数
        success : function(data){
			
        	// $符的参数是获取到类名为header的元素，template的两个参数，第一个代表的是id名，第二个是返回的数据data
        	$( ".details " ).html( template( "goods", data ));
        	$( ".huoqu " ).html( template( "saying", data ));
        }
	});
}

$(function(){
	$("#back").click(function(){
		$("html,body").animate({scrollTop:0},500);
	})
})		


