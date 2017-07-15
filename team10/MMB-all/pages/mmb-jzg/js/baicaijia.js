
$(function(){
	setList($('.list'))

	$('.return').on('click', function(){
		window.history.back(-1);
	})
	//获取顶部标签栏数据
		$.ajax({
			url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
			type: 'get',
			dataType: 'json',
			success: function(data,titleid){
				var html = template('bcjTitle', data);
				$('.nav').html(html);
				var titleLi = $('.nav').find('.tabs li');
				for (var i = 0; i < titleLi.length; i++){
			        titleLi[i].index = i;
			        $(titleLi[0]).addClass('now');
			        titleLi[i].onclick = function(){
			            var titleid = data.result[this.index].titleId
			            console.log(titleid)
			            $.ajax({
							url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
							data: {'titleid': titleid || 0},
							success: function(data){
								var html = template('bcjList', data);
								$('.list').html(html);
							}
						})
						$(titleLi).removeClass('now');
						$(titleLi[titleid || 0]).addClass('now');
						nav($('.nav').find('.ul-wapper .tabs'), titleid);
			        }
			    };
				
				var ulWidth = 0;
				for (var i = 0; i < titleLi.length; i++){
					ulWidth += $(titleLi[i]).width();
				}
                if (screen.width < ulWidth) {
                    $('.nav').find('.ul-wapper .tabs').css('width', ulWidth);
                }
				$(titleLi[titleid || 0]).addClass('now');
				nav($('.nav').find('.ul-wapper .tabs'), titleid);
			}
		})
	

                
	//设置顶部标签栏滑动方法
	function nav(dom, titleid){
		var domWidth = dom.width();
		var domParentWidth = dom.parent().width();

		//定义缓冲的距离
		var distance = 50;
		//设置初始的定位 最大的定位
		var maxX = 0;
		//滑动到最后面的定位，最小的定位
		var minX = domParentWidth - domWidth;
		//滑动定位
		var maxSwipe = maxX + distance;
		var minSwipe = minX - distance;
		//让菜单滑动
		var startX = 0;
		var moveX = 0;
		var distanceX = 0;
		var isMove = false;
		//记录当前的定位
		var currX = 0;

		//找到所有的li 放到lis中
		var li = dom.find('li');
		for(var i = 0; i < titleid; i++){
			currX -= $(li[i]).width();
		}
		if(currX < minX){
			currX = minX;
		}else if(currX > maxX){
			currX = maxX;
		}
		addTransition(dom);
        setTranslateX(dom, currX);
		//定义公用的方法
		function addTransition(dom){
			dom.css('transition','all .2s')
		};
		function removeTransition(dom){
			dom.css('transition','none')
		};
		function setTranslateX(dom, x){
			dom.css('transform','translateX('+ x +'px)');
		};
		//绑定事件
		//触摸事件，记录触摸的位置
		dom[0].addEventListener('touchstart', function(e){
			startX = e.touches[0].clientX;
		});
		//滑动事件 记录滑动的距离
		dom[0].addEventListener('touchmove', function(e){
			moveX = e.touches[0].clientX;
			distanceX = moveX - startX;
			//清除过渡
			// removeTransition();
			//当滑动到一定距离的时候不能滑动 当前要做定位的位子必须在滑动区间内
			if((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe){
				addTransition(dom);
				setTranslateX(dom, (currX + distanceX));
			}
		});
		//触摸结束事件
		dom[0].addEventListener('touchend', function(){
			//当触摸结束的时候，判断是否在定位区间内，不在则定位回去
			//当向右滑大于最大定位
			if((currX + distanceX) > maxX){
				currX = maxX;
				console.log(currX);
				addTransition(dom);
				setTranslateX(dom,currX);
			}
			//当向左滑动的时候 小于最小定位
			else if((currX + distanceX) < minX){
				currX = minX;
				// console.log(currX);
				addTransition(dom);
				setTranslateX(dom,currX);
			}
			//记录当前的位置
			else{
				currX = currX + distanceX;
			}
			//触摸结束之后重置所有的参数
			//定位参数currX不重置
			startX = 0;
			moveX = 0;
			distanceX = 0;
			isMove = 0;

		})
	}

	function setList(dom, titleid){
		$.ajax({
			url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
			data: {'titleid': titleid || 0},
			success: function(data){
				var html = template('bcjList', data);
				dom.html(html);
			}
		})
	}


	//设置点击按钮，返回顶部
	var fixHeight = 
	$('.fix').on('click', function(){
		document.documentElement.scrollTop = document.body.scrollTop =0;
	})
})

