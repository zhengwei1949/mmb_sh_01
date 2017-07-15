$(function(){
   
	$.ajax({
		url:'http://'+net.url+':9090/api/getbaicaijiatitle',
		type:'get',
		datdType:'json',
		success:function(data) {
			
			var html = template('tpl',data);
			$('.tit-box').append(html);
           
            $($('.tit-box li').first()).addClass('now');
			leftSwipe();
            $.ajax({
                  url:'http://'+net.url+':9090/api/getbaicaijiaproduct',
                  type:'get',
                  dataType:'json',
                  data:{titleid:0},
                  success:function(data) {
                    $('.product').remove();
                    var html = template('item',data);
                    $('.product-list').append(html);

                  }
                });
			$('.tit-box').tap(function(e){
                var li = e.target.parentNode;
                console.log($(li).attr('data-id'));
                var lis = $('.tit-box').children();
                $(li).addClass('now').siblings().removeClass('now');
                $.ajax({
                  url:'http://'+net.url+':9090/api/getbaicaijiaproduct',
                  type:'get',
                  dataType:'json',
                  data:{titleid:$(li).attr('data-id')},
                  success:function(data) {
                    $('.product').remove();
                    var html = template('item',data);
                    $('.product-list').append(html);
                  }
                });
         });
		}
	});



});

 function leftSwipe(){

   //translateX 初始的定位，就是最大定位
	var maxX = 0;
	//translateX 滑动到最右边就是最小定位
	var minX = $('.cheap-tit').width()-$('.tit-box').width();

	//自定义缓冲距离
	var distance = 50;
	//translateX的最大滑动距离
	var maxSwipe = maxX+distance;
	// translateX的最小滑动距离
	var minSwipe = minX-distance;
    /*第一步  1.菜单滑动起来*/
    var startX = 0;
    var moveX= 0;
    var distanceX = 0;
    var isMove  = false;

    var currX = 0;/*记录当前的定位 全局  相当于轮播图当中的index*/

    /*定义公用的方法*/
    var addTransition = function(){
        // $('.tit-box')[0].style.webkitTransition = "all .2s";
        // $('.tit-box')[0].style.transition = "all .2s";
        $('.tit-box').css('webkitTransition','all .2s');
        $('.tit-box').css('transition','all .2s');
        

        }
    var removeTransition = function(){
    	// $('.tit-box')[0].style.webkitTransition = "none";
     //    $('.tit-box')[0].style.transition = "none";
      $('.tit-box').css('webkitTransition','none');
         $('.tit-box').css('transition','none');
       
    }
    var setTranslateX = function(x){
    	$('.tit-box').css("webkitTransform","translateX("+x+"px)");
    	 $('.tit-box').css("transform","translateX("+x+"px)");
        
       
        // $('.tit-box')[0].style.webkitTransform = "translateX("+x+"px)";
        // $('.tit-box')[0].style.transform = "translateX("+x+"px)";
    }

    /*绑定事件*/
   $('.tit-box')[0].addEventListener('touchstart',function(e){

        startX = e.touches[0].clientX;

    });

    $('.tit-box')[0].addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX-startX;
      
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if((currX + distanceX) < maxSwipe &&　(currX+ distanceX) > minSwipe){
            setTranslateX(currX + distanceX);
        }
    });
    window.addEventListener('touchend',function(e){
  
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        if(( currX + distanceX)>maxX){
            currX = maxX;
            addTransition();
            setTranslateX(currX);
        }

        /*当往上滑的时候 小于 最小定位*/
        else if(( currX + distanceX)<minX){
            currX = minX;
            addTransition();
            setTranslateX(currX);
        }
        
        else{
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currX = currX + distanceX;
        }
       
        /*重置所有的参数  不重置currY */
        startX = 0;
        moveX =0;
        distanceX = 0;
        isMove = false;
    });


 }