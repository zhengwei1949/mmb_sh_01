
// 优惠卷列表 页面
$(function(){
	//返回上一页
	$(".return").on("click", function () {
		window.history.back(-1);
	});
	// 定义一个 函数
	$.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
                    name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
        return unescape(r[2]);
        return null;
    }

    // 调用函数 获取 地址栏 ? 后面的数据
	var link = $.getUrlParam('couponid');

	// 获取 最后一个字符
	var num = link.slice(-1);
	// 网页标题
	$('title').html(['肯德基优惠卷','必胜客优惠卷','棒约翰优惠卷','哈根达斯优惠卷'][num]);
	// 顶部标题
	$('.title').html(['肯德基优惠卷','必胜客优惠卷','棒约翰优惠卷','哈根达斯优惠卷'][num]);
	

	var t;
	var $page2=$("<div>").attr({
		id:'page2'
	}).on({click:function(){
		
		t++;
		if (t%2==1) {
			$page2.css({
						display:'none',
					})
		}
	}});
  	
  	var imgBox = $("<div>").attr({
									id:'imgBox'
								})			
	// #coupon 部分	
	$.getJSON(
		// 后台地址
		//////////////////////////
		// 改 ip
		//////////////////////////
		"http://127.0.0.1:9090/api/getcouponproduct",
		//传入参数
		{ "couponid":link},
		function(data){
			// 遍历数据
  			$.each(data.result, function(i,item){

  				// 获取 img 数据
  				var img = item.couponProductImg
  				//将 img 放入 $div 中,并设置样式
				var $div = $("<div>")
							.html( img )
							.css({
								padding:'10px',
								width:'100%',
								borderBottom:'1px solid #E7E7E7',
								position: 'relative'
							})
							.on({click:function(){
								imgBox.html('');
								t =0;
								$page2.html('').css({
									display:'block',
									background:'rgba(0, 0, 0, 0.5)',
									position: 'fixed',
									top:'0',
									left:'0',
									width:'100%',
									height:'100%',
									zIndex:'99',
								})

								imgBox.html( img )
										.css({
											display:'inline-block',
											position: 'absolute',
											top:'30%',
											left:'20%',
											width:'60%',
											zIndex:'299',
										}).on({
											click:function(e){
												e.stopPropagation();
											}
										});
								var k;	
								var btn1 = $('<button>').html('<').css({
									display: 'block',
    								width: '30px',
    								height: '50px',
    								lineHeight: '45px',
    								background: 'rgba(0, 0, 0, 0.6)',
    								color: 'white',
    								fontSize: '30px',
    								position: 'absolute',
    								top: '50%',
    								left: '30px',
    								marginTop: '-30px',
    								textAlign: 'center',
    								borderRadius: '5px',
								}).on({
									click:function(e){
										k=-1;
										i+=k;
										e.stopPropagation();
										if (i >= 0) {
											imgBox.html(data.result[i].couponProductImg)
										}
									}
								});
								var btn2 = $('<button>').html('>').css({
									display: 'block',
    								width: '30px',
    								height: '50px',
    								lineHeight: '45px',
    								background: 'rgba(0, 0, 0, 0.6)',
    								color: 'white',
    								fontSize: '30px',
    								position: 'absolute',
    								top: '50%',
    								right: '30px',
    								marginTop: '-30px',
    								textAlign: 'center',
    								borderRadius: '5px',
								}).on({
									click:function(e){
										k=1;
										i+=k;
										e.stopPropagation();
										if (i < data.result.length) {
											imgBox.html(data.result[i].couponProductImg)
										}
									}

								});

								btn1.appendTo($page2);
								btn2.appendTo($page2);

								imgBox.appendTo($page2);
								
							}})
				// 将 $div 追加到 #coupon
				$div.appendTo("#coupon");

				// 设置 img 样式
				$("#coupon img").css({
					display:'inline-block',
					width:'4rem',
					height:'4rem',
					verticalAlign: 'top'
				})
				// 创建 p 标签 , 设置内容
				var $p = $('<p>').html(item.couponProductName)
				// 创建 span 标签 , 设置内容
				var $span =  $("<span>")
								.html(item.couponProductPrice)
								.css({
									fontWeight: '900'
								});
				// 创建 div 标签 , 设置内容
				var $div3 = $("<div>")
								.html(item.couponProductTime)
								.css({
									color:'#EE7700'
								});

				// 创建 div 标签 , 设置样式
				var $div2 = $("<div>").css({
					display:'inline-block',
					width:'70%',
					marginLeft: '5px'
				});

				// 将$p $span $div3 追加到 $div2
				$p.appendTo( $div2 );
				$span.appendTo( $div2 );
				$div3.appendTo( $div2 );

				

				// 将$div2 追加到 $div
				$div2.appendTo( $div );

				var $span2 = $("<span>").attr({class:'iconfont'})
								.html('&#xe64f;')
								.css({
									display:'inline-block',
									position: 'absolute',
									top:'50%',
									right:'0',
									fontSize:'20px',
									marginTop: '-10px'
								});

				$span2.appendTo( $div );


				// 追加 到 页面
				
				$page2.appendTo( document.body );

				
    			
    			
    			
  			});
		}
	);



})