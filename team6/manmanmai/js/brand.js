$(function(){
	var res = [];
	$.ajax({
		url:'http://'+net.url+':9090/api/getbrandtitle',
		dataType:'json',
		type:'get',
		success:function(data) {
			
			$.each(data.result,function(i,v) {
				
				var str = '';
				for(var i=0;i<v.brandTitle.length;i++) {
					if(v.brandTitle[i] ==='十') {
						break;
					}
					str +=v.brandTitle[i]
					
				}
				res.push(str);
				
			});
		
			var html = template('tpl',data);
			$('.items').append(html);
			var links =( $('.brand-item')).find('a');
			/*$(links).each(function(i,v){

				// window.localStorage.setItem(i,$(v).attr('data-id'));
			});*/

			// console.log( $('.brand-item'));
			window.localStorage.clear();
			 $('.brand-item').click(function(e){
		  
		  	 window.localStorage.setItem('num',$(e.target).attr('data-id'));

		  });
			
		}
	});
	

})