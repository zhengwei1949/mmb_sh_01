$(function(){
	// 一级数据
	$.getJSON("http://127.0.0.1:9090/api/getbrandtitle",function(data){
		//获取网址 window.location
		var num = window.location.search.slice(-1);//最后一个数字
		console.log(window.location.search);
		num = +num;
		console.log(num)
		var name = (data.result[num].brandTitle).slice(0,(data.result[num].brandTitle).length-4);
			console.log(name);
			$(".hot_brand").text(name+"产品销量排行") ; //红褐色字内容
			$(".nav_cont").prepend(name); //三级导航列表
			$(".nav .nav_cont")[0].href = "brandTitle2.html?brandtitleid="+num;
			// brandLists2.html?brandtitleid=0
		//二级数据	                                              一级数据来的
		$.getJSON("http://127.0.0.1:9090/api/getbrand?brandtitleid="+num,function(data){
			var num1 = window.location.search.slice(-1);
			num1 = +num1;
		    console.log(num1)
		    $.getJSON("http://127.0.0.1:9090/api/getbrandproductlist?brandtitleid="+num1+"&&pagesize=4",function(data){
		    	$.each(data.result,function(i,v){
		    		var li = $("<li></li>")
		    		$(".brands").append(li)
		    		var a = $('<a></a>')//外包的a标签
					$(a).attr("href","getproduct.html?productid="+ v.productId)
		    		$(li).append(a);
		    		var p1 = $('<p></p>')//商品名
		    		$(p1).append(v.productName)
		    		var span2 = $('<span></span>')//价格
		    		$(span2).append(v.productPrice)
		    		var span3 = $('<span></span>')//五星
		    		$(span3).append("★★★★★")
		    		var span4 = $('<span></span>')//报价
		    		$(span4).append(v.productQuote)
		    		var a1 = $('<a></a>')//评论
		    		$(a1).attr("href","brandTitle4.html?productid="+v.productId);
		    		$(a1).append(v.productCom)
		    		$(a).append(v.productImg);//图片
		    		var div = $("<div></div>")
		    		$(a).append(div);
		    		$(div).append(p1);
		    		$(div).append($("<br>"));
		    		$(div).append(span2);
		    		$(div).append(span3);
		    		$(div).append($("<br>"));		    		
		    		$(div).append(span4);
		    		$(div).append(a1);		
		    	})
		    	
		    })
		});
	})
})