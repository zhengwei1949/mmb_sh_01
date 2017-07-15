$(function(){
	//暂时没有数据
	$.getJSON("http://127.0.0.1:9090/api/getbrandtitle",function(data){
		//获取网址 window.location
		var num = window.location.search.slice(-1);//最后一个数字
		console.log(window.location.search);
		num = +num;
		console.log(num)
		var name = (data.result[num].brandTitle).slice(0,(data.result[num].brandTitle).length-4);
			console.log(name);
			$(".hot_brand").text(name+"品牌哪个好") ;  
		$.getJSON("http://127.0.0.1:9090/api/getbrand?brandtitleid="+num+"",function(data){
			$.each(data.result,function(i,v){
				var li = $("<li></li>")
				var span1 = $("<span></span>")
				$(span1).text(i+1);
				var span2 = $("<span></span>")
				$(span2).text(v.brandInfo)
				var span3 = $("<span></span>")
				span3.addClass("icon-angle-right")
				var a = $("<a href='#'></a>") 
				var a1 = document.createElement('a');
				a1.href="brandTitle3.html?brandtitleid="+v.brandTitleId+"";
				$(a).text(v.brandName)
				$(a1).append(span1);
				$(a1).append(a);
				$(a1).append($('<br>'))
				$(a1).append(span2);
				$(a1).append(span3);
				$(li).append(a1);//li内的a
				$(".brands").append(li);
			})
		});
	})
})