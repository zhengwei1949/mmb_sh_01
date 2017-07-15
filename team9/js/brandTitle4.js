$(function(){
	// 一级数据
	$.getJSON("http://127.0.0.1:9090/api/getbrandtitle",function(data){
		//获取网址 window.location
		var num = window.location.search.slice(-1);//最后一个数字
		//console.log(window.location.search);
		num = +num;
		//console.log(num)
		var name = (data.result[num].brandTitle).slice(0,(data.result[num].brandTitle).length-4);
			//console.log(name);
			$(".topBar").text(name+"最新评论") ; //红褐色字内容
			$(".nav_cont").prepend(name); //三级导航列表
			// $(".nav .nav_cont")[0].href = "brandLists2.html?brandtitleid="+num;
			// brandLists2.html?brandtitleid=0
		//二级数据	                                              一级数据来的
		$.getJSON("http://127.0.0.1:9090/api/getbrand?brandtitleid="+num,function(data){
			var num1 = window.location.search.slice(-1);
			num1 = +num1;
		    //console.log(num1)
		    //三级数据                                                            二级数据来的
		    $.getJSON("http://127.0.0.1:9090/api/getbrandproductlist?brandtitleid="+num1+"&&pagesize=4",function(data){
		    	//获取商品简单信息
		    var div = $("<div></div>");
		    $(div).append(data.result[num1].productName)
		    //console.log(data.result[num1].productName);
		    $(".product").append(data.result[num1].productImg)
		    $(".product").append(div)
		    	var num2 = window.location.search.slice(-1);
					num2 = +num2;
					$.getJSON("http://127.0.0.1:9090/api/getproductcom?productid="+num2,function(data){
						$.each(data.result,function(i,v){

							var div0 = $("<div></div>")
							$(div0).addClass("com_infoTop")
							var div1 = $("<div></div>")
							$(div1).addClass("square")
							var span = $("<span></span>")
							$(span).append(v.comName+":");
							var span4 = $("<span></span>")
							$(span4).append(" ★★★★★");
							var span1 = $("<span></span>")
							$(span1).append(v.comTime);
							var span2 = $("<span></span>")
							$(span2).append("&nbsp;&nbsp;&nbsp;&nbsp;"+v.comContent);
							var div = $("<div></div>")
							$(div).addClass("arrow")
							$(div).append(span);
							$(div).append(span4);
							$(div).append(span1);
							$(div).append("<br>");
							$(div).append(span2);
							$(div0).append(div)
							$(div0).append(div1)
							$(".com_box").append(div0);								
						})
					})
		    	
		    })
		});
	})
})