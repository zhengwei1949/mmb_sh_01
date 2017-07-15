$(function(){
	
	$.ajax({
		url:'http://'+net.url+':9090/api/getsitenav',
		type:'get',
		dataType:'json',
		success:function(data) {
			
			var html = template('item1',data);
			$('.nav-list').append(html);
       }
   });
});
