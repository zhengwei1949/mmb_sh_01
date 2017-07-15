
$(function(){
	
	$('.listBox').tap(function(e) {
		var li = e.target.parentNode.parentNode;
	
		//禁止重复请求
		if($(li).hasClass('disabled')) {
			$($('.shopBox').children()).remove();
			$(li).removeClass('disabled');
			return;
		}
	
	/*	if($(li).hasClass('shop1')) {
			$.ajax({
			url:'http://127.0.0.1:9090/api/getgsshop',
			type:'get',
			dataType:'json',
			beforeSend:function(){
					$(li).addClass('disabled');
			},
			success:function(data) {
				
				var html = template('item1',data);
				$($('.shopBox').children()).remove();
				$('.shopBox').append(html);
				var lis = $('.shopBox').children();
				$(lis).tap(function(e){

					var li1 = e.target.parentNode;
					// console.log(li1);
					var span = $(li1).find('span');
					// var lis = $(this).children();
					$.each(lis,function(i,v){
						$(v).find('span').removeClass('active');
					})
					
					$(span).addClass('active');
				})
			}
		});
	

		}
		if($(li).hasClass('shop2')) {

			$.ajax({
			url:'http://127.0.0.1:9090/api/getgsshoparea',
			type:'get',
			dataType:'json',
			beforeSend:function(){
					$(li).addClass('disabled');
			},
			success:function(data) {
			
				var html = template('item2',data);
				$($('.shopBox').children()).remove();
				$('.shopBox').append(html);
				var lis = $('.shopBox').children();
				$(lis).tap(function(e){

					var li1 = e.target.parentNode;
					// console.log(li1);
					var span = $(li1).find('span');
					// var lis = $(this).children();
					$.each(lis,function(i,v){
						$(v).find('span').removeClass('active');
					})
					
					$(span).addClass('active');
				})
			}
		});
	

		}*/
		
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
				flag=false;
				var html = template(id,data);
				$($('.shopBox').children()).remove();
				$('.shopBox').append(html);
				var lis = $('.shopBox').children();
				$(lis).tap(function(e){
					
					
					var li1 = e.target.parentNode;
					// console.log(li1);
					var span = $(li1).find('span');
					// var lis = $(this).children();
					$.each(lis,function(i,v){
						$(v).find('span').removeClass('active');
					})
					
					$(span).addClass('active');
					var temp;
					var str = '';
					if(id==='item2') {
						 str = $(this).text().substr(7,2)+" ";
						 index2 = $(this).index();
						
						
					}else {
						str = $(this).text();
						index1 = $(this).index();
					}
					$($(li).find('a')).html('<i>'+str+'</i>'+'<span></span>');
					
					$($('.shopBox').children()).remove();
				
					console.log(index1);
				});
				

			}
		});
	

		}
		

	});
	
	
	
})