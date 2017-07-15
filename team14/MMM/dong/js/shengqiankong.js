window.onload = function () {
			//返回上一页
			$('.header a').eq(0).click(function(){
				history.go(-1);
			})



			var w = "mmb.ittun.com";
			var send = function(n){

				$.ajax({
					url:"http://"+ w +"/api/getmoneyctrl",
					data:{pageid:n},
					success: function (data ) {
						var html = template('product',data);
						$('.main').html(html);
					}
				})};
			var flag = 0; 
			send(flag);

			$('.input_left').on('click',function(){
				flag <= 0?flag = 15:'';
				send(--flag);
				$('body').animate({scrollTop:0},200);
				$('.selected').val(flag);
			});
			$('.input_right').on('click',function(){
				flag >= 14?flag = -1:'';
				send(++flag);
				$('body').animate({scrollTop:0},200);
				$('.selected').val(flag);
			});

			$('.selected').change(function(){
				flag = $(this).val();
				send(flag);
				$('body').animate({scrollTop:0},200);
			})
		}