$(function(){
	var res = ["平板电视", "液晶电视", "LED电视", "等离子电视", "3D电视", 
	"智能电视", "网络电视", "空调", "变频空调", "中央空调", "移动空调", 
	"嵌入式空调", "冷暖空调", "挂壁式空调", "单冷空调", "风管式空调", 
	"家庭影院", "冰箱", "对开门冰箱 ", "迷你冰箱", "双门冰箱", "三门冰箱", 
	"DVD高清播放器", "蓝光dvd播放器", "音响/音箱", "洗衣机", "滚筒洗衣机", 
	"全自动洗衣机", "迷你洗衣机", "干衣机", "波轮洗衣机", "脱水机", 
	"双缸洗衣机", "热水器", "燃气热水器", "空气能热水器", "电热水器", 
	"电热水龙头", "即热式热水器", "太阳能热水器", "酒柜/冰吧/冷柜", "酒柜", 
	"消毒柜/洗碗机", "手机", "智能手机", "直板手机", "翻盖手机", "安卓手机",
	 "滑盖手机", "数码相机", "单反相机", "长焦相机", "单电相机 "]
	 
	 
	 var data={items:res};
	 var list = template('tpl',data);
	 $('.brand-ranking').append(list);
	 var num = window.localStorage.getItem('num');
	
	 $('.rankingBox').each(function(i,v){
	 	 if($(v).attr('data-id')===num) {
	 	
	 	
	 	 $($(v).siblings()).css('display','none');
	 	 $(v).css('display','block');
	 	 $('.rankingBox').tap(function(e){
	 	
		var li = e.target.parentNode;
	
		if($(li).hasClass('disabled')){
			if($(li).index()==0) {
				$('.num').remove();
			}
			if($(li).index()==1) {
				$('.productList').remove();
			}
			if($(li).index()==2) {
				$('.comment').remove();
			}
			
			$(li).removeClass('disabled');
			return;
		}
	
		if($(li).index()==0 && !$(li).hasClass('disabled')) {
			
			
			$.ajax({
				url:'http://'+net.url+':9090/api/getbrand',
				type:'get',
				dataType:'json',
				data:{brandtitleid:num},
				success:function(data) {
					$(li).addClass('disabled');
					var html = template('item1',data);
					$('.listBox').append(html);
					var children = $(li).children();
					$(($(children).eq(1)).find('i')).addClass('first');
					$(($(children).eq(2)).find('i')).addClass('second');
					$(($(children).eq(3)).find('i')).addClass('third');
				
				}
			});
		}
		if($(li).index()==1 && !$(li).hasClass('disabled')) {
			
			
			$.ajax({
				url:'http://'+net.url+':9090/api/getbrandproductlist',
				type:'get',
				dataType:'json',
				data:{brandtitleid:num,pagesize:4},
				success:function(data) {
					$(li).addClass('disabled');
					var html = template('item2',data);
					$('.salesBox').append(html);
				
				
				}
			});
		}
		if($(li).index()==2 && !$(li).hasClass('disabled')) {
			
			
			$.ajax({
				url:'http://'+net.url+':9090/api/getproductcom',
				type:'get',
				dataType:'json',
				data:{productid: 1},
				success:function(data) {
					
					var obj = [data.result[0]];
					data1 ={
						result:obj
					}
					console.log(data1);
					$(li).addClass('disabled');
					var html = template('item3',data1);
					$('.commentBox').append(html);
				
				
				}
			});
		}
	 });
    }		
});
	
	 	
	
	
});