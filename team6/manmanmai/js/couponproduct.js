$(function(){
	var num = window.localStorage.getItem('num');
	
	$.ajax({
		url:'http://'+net.url+':9090/api/getcouponproduct',
		type:'get',
		dataType:'json',
		data:{couponid:num},
		success:function(data) {
			console.log(data);
			var html = template('tpl',data);
			$('.couponproduct-coupon').append(html);
			var html1 = template('tpl1',data);
			$('.banner').append(html1);
			$('.couponproduct-coupon').tap(function(){

				//轮播图
			 	$('.coupon_win').css('display','block');
			 	$('.coupon_win_box').addClass('.bounceInDown');
          		var width = $('.imgBox').width();
          		var clone1 = ($('.banner li:first-child')).clone(true);
          		var clone2 = ($('.banner li:last-child')).clone(true);
          		$('.banner').append(clone1);
          		$('.banner').prepend(clone2);

          
          		var max = ($('.banner').children()).length-1;
          		console.log(max);


          		/*动画*/
          		var animateFuc = function(callback){
          		    $('.banner').animate({'transform':'translateX('+(-index*width)+'px)'},200,'ease',function(){
          		        /*动画结束*/
          		        if(index >= max){
          		            index = 1;
          		        }else if(index <= 0){
          		            index = max-1;
          		        }
          		        /*做定位*/
          		        $('.banner').css({'transform':'translateX('+(-index*width)+'px)'});
          		        callback && callback();
          		    });
          		}

          		/*轮播*/
          		var index = 1;
          		var timer = setInterval(function(){
          		    index ++ ;
          		    /*动画滚动*/
          		    animateFuc();
          		},3000);

          		$('.banner').on('swipeLeft',function(){
          		    clearInterval(timer);
          		    index ++ ;
          		    
          		    animateFuc(function(){
          		        clearInterval(timer);
          		        timer = setInterval(function(){
          		            index ++ ;
          		            /*动画滚动*/
          		            animateFuc();
          		        },3000);
          		    });
          		});
          		$('.banner').on('swipeRight',function(){
          		    clearInterval(timer);
          		    index --;
          		   
          		    animateFuc(function(){
          		        clearInterval(timer);
          		        timer = setInterval(function(){
          		            index ++ ;
          		            /*动画滚动*/
          		            animateFuc();
          		        },3000);
          		    });
          		});
          	

          		//点击箭头切换图片
          		


          		$('.leftArr').tap(function(){
          			
          			if(index==1) {
          				index=max-1;
          				$('.banner').css('transform','translateX('+(-index*width)+'px)');
          			}
          			index--;
          			
          		  animateFuc();
          		});
          		$('.rightArr').tap(function(){
          			 // clearInterval(timer);
          			if(index==max) {
          				index=1;
          				$('.banner').css('transform','translateX('+(-index*width)+'px)');
          			}
          			index++;
          			
          		    animateFuc();
          		  
          									
          		
          		});
          		$('.banner').tap(function(){
          			$('.coupon_win').css('display','none');
          		})

        });



       }
   });
});
