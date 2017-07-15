$(function(){
	$.getJSON("http://127.0.0.1:9090/api/getbrandtitle",function(data){
		$.each(data.result,function(i,v){
			var li = document.createElement('li');
			var a = document.createElement('a');
			$(a).text(v.brandTitle)
			a.href="brandTitle2.html?brandtitleid="+v.brandTitleId;
			// a.target = "_blank";
			var span = document.createElement('span');
			$('.brands li a').append(span);
			$(span).addClass("icon-angle-down");
			$(li).append(a);
			$('.brands').append(li);
		})
	})
})