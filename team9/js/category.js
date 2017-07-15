$(function(){
	$.getJSON('http://127.0.0.1:9090/api/getcategorytitle',function(data){
		$.each(data.result,function(i,v){
			var li  = $("<li></li>");
			var div = $("<div></div>");
			$(div).addClass("groupTitle");
			$(div).text(v.title);
			$('.title_box').append(li);
			$(li).append(div);
			//字体图标
			var span = $('<span></span>');
			$(div).append(span);
			$(span).addClass("icon-angle-down");
			//子列表
			var ul2 = $("<ul></ul>")
			$(ul2).addClass("groupCont clearfix")
			$(li).append(ul2);

			$.getJSON('http://127.0.0.1:9090/api/getcategory?titleid='+v.titleId+'',function(data){
				$.each(data.result,function(i,v){
					var li2  = $("<li></li>");
					$(li2).appendTo(ul2);
					var a2 =  $("<a href='#'></a>")
					$(li2).append(a2);
					$(a2).text(v.category);
				});
			});

		});
		//手风琴菜单
		 $(".groupTitle").on('click',function(){
	 	// next()
        $(this).next("ul").slideToggle(300);
		// parent()
		$(this).parent().siblings("li").children("ul").slideUp(300);
	 })


	});
	
});