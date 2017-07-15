
$(function(){

	
	$('.listBox').tap(function(e) {
		var li = e.target.parentNode.parentNode;
	
		//禁止重复请求
		if($(li).hasClass('disabled')) {
			$($('.shopBox').children()).remove();
			$(li).removeClass('disabled');
			return;
		}
	
	
		if($(li).hasClass('shop1') || $(li).hasClass('shop2') ) {
			if($(li).hasClass('shop1')) {
				 url = 'http://'+net.url+':9090/api/getgsshop';
				 id = 'item1'
			} else {
				 url = 'http://'+net.url+':9090/api/getgsshoparea';
				 id = 'item2'
			}
			$.ajax({
			url:url,
			type:'get',
			dataType:'json',
			beforeSend:function(){
					$(li).addClass('disabled');
			},
			success:function(data) {
			
				var html = template(id,data);
				$($('.shopBox').children()).remove();
				$('.shopBox').append(html);
				var lis = $('.shopBox').children();
				$(lis).tap(function(e){
					$(li).attr('data-id',$(this).attr('data-id'));
					
					var li1 = e.target.parentNode;
					
					var span = $(li1).find('span');
				
					$.each(lis,function(i,v){
						$(v).find('span').removeClass('active');
					})
					
					$(span).addClass('active');
					var temp;
					var str = '';
					if(id==='item2') {
						 str = $(this).text().substr(7,2)+" ";
					
						
						
					}else {
						str = $(this).text();
					
					}
					$($(li).find('a')).html('<i>'+str+'</i>'+'<span></span>');
					
					$($('.shopBox').children()).remove();
					$(li).removeClass('disabled');
				
					$.ajax({
						url:'http://'+net.url+':9090/api/getgsproduct',
						type:'get',
						data:{shopid:$('.shop1').attr('data-id'),areaid:$('.shop2').attr('data-id')},
						dataType:'json',
						success:function(data){
							
							var html = template('item3',data);
							$($('.product-box').children()).remove();
							$('.product-box').append(html);
							
						}
				});
					
				});
				

			}
		});
	

		}
		

	});
	$.ajax({
		url:'http://'+url+':9090/api/getgsproduct',
		type:'get',
		data:{shopid:$('.shop1').attr('data-id'),areaid:$('.shop2').attr('data-id')},
		dataType:'json',
		success:function(data){

			var html = template('item3',data);
			$('.product-box').append(html);
		}
	})
	
	
});