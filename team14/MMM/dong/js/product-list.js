window.onload = function() {
//域名
// var w = '192.168.13.200:9090';
// 192.168.13.200
var w = 'mmb.ittun.com';
var page_num = 3;
// 默认商品列表
var send_api = function(n,n2,callback){
	$.ajax({
		url:"http://"+  w +"/api/getproductlist",
		data:{categoryid:n,pageid :n2},
		success: function (data ) {
			var html = template('product',data);
			$('.main').html(html);
			if(callback){
				callback(data);
			}
		}
	})
};
var flag = 1;
send_api(0,flag,function(data){
	page_num = Math.ceil(data.totalCount / data.pagesize);
	var options = '';
	for(var i = 0; i < page_num; i++) {
		options += '<option value='+ ( i+1 ) +'> '+ ( i+1 ) +' / '+ page_num +' </option>'
	}
	$('.selected').html( options );
	//默认页面点击详情
	$('.main li').each(function(i,v){
		v.onclick = function(){
			//显示隐藏详情
			$('.detail_bg').toggleClass('toggle');
			$('.main_bg').addClass('toggle');
			var li_id = this.id;
			$.ajax({
				url:"http://"+  w +"/api/getproduct",
				data:{productid :li_id },
				success:function(data) {
					$('.detail_pic div').html(data.result[0].productImg);
					$('.detail_price').html(data.result[0].bjShop);
					$('.detail_price p').html(data.result[0].productName);
				}
			});
			$.ajax({
				url:"http://"+  w +"/api/getproductcom",
				data:{productid :li_id },
				success:function( data) {
					$('.eval').html(template('eval_demo',data))
				}
			})
		}

	})
});
// 上一页
$('.input_left').on('click',function(){
	flag <= 1 ? flag = page_num + 1:'';
	send_api( 0, --flag );
	$('body').animate({scrollTop:0},200);
	$('.selected').val(flag);
});
// 下一页
$('.input_right').on('click',function(){
	flag >= page_num ? flag = 0:'';
	send_api( 0, ++flag );
	$('body').animate({scrollTop:0},200);
	$('.selected').val(flag);
});
//下拉选页
$('.selected').change(function(){
	flag = $(this).val();
	send_api(0,flag);
	$('body').animate({scrollTop:0},200);
});

// 点击分类搜索
$('.nav input').click(function(){
	//清除之前上下頁事件
	$('.input_left').off('click');
	$('.input_right').off('click');

	
	
	// 显示隐藏分类
	$('.nav_list').toggleClass('toggle');
	//获取分类标题栏
	$.ajax({
		url:"http://"+ w +"/api/getcategorytitle",
		data:{},
		success: function (data ) {
			$('.nav_list').html(template('nav_list_mod',data));
			$(".hd").each(function(k,v){
				v.onclick = function(){
					var hd_id = this.id;
					var hd_next = $(this).next();
					//分类向导
					$('.nav_two').html(data.result[hd_id].title);
					//渲染下拉框
					hd_next.toggleClass('toggle');
					$.ajax({
						url:"http://"+ w +"/api/getcategory",
						data:{titleid:hd_id},
						success:function(data) {

							hd_next.html(template('nav_list_mod_code',data));
							
							//遍历关键字
							hd_next.find('a').each(function(k,v){
								var categoryId = data.result[k].categoryId;
								v.onclick = function(){
									//改变关键字向导
									$('.nav_three').html(data.result[k].category);
									//
									if(!($('.detail_bg').hasClass('toggle'))){
										$('.detail_bg').addClass('toggle');
									}
									$('.main_bg').removeClass('toggle');
									// 点击关键字渲染
									flag=1;
									$('.nav_list').toggleClass('toggle');
									send_api(categoryId,1,function(data){
										page_num = Math.ceil(data.totalCount / data.pagesize);
										var options = '';
										for(var i = 0; i < page_num; i++) {
											options += '<option value='+ (i+1) +'> '+ (i+1) +' / '+ page_num +' </option>'
										}
										$('.selected').html( options );
										// 上一页
										$('.input_left').on('click',function(){
											flag <= 1?flag = page_num + 1:'';
											send_api(categoryId,--flag);
											$('body').animate({scrollTop:0},200);
											$('.selected').val(flag);
										});
										// 下一页
										$('.input_right').on('click',function(){
											flag >= page_num?flag = 0:'';
											send_api(categoryId,++flag);
											$('body').animate({scrollTop:0},200);
											$('.selected').val(flag);
										});
										//下拉选页
										$('.selected').change(function(){
											flag = $(this).val();
											send_api(categoryId,flag);
											$('body').animate({scrollTop:0},200);
										});
										//点击获取商品详情
										//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
										//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
										$('.main li').each(function(i,v){
											v.onclick = function(){
												//显示隐藏详情
												$('.detail_bg').toggleClass('toggle');
												$('.main_bg').addClass('toggle');
												var li_id = this.id;
												$.ajax({
													url:"http://"+  w +"/api/getproduct",
													data:{productid :li_id },
													success:function(data) {
														$('.detail_pic div').html(data.result[0].productImg);
														$('.detail_price').html(data.result[0].bjShop);
														$('.detail_price p').html(data.result[0].productName);
													}
												});
												$.ajax({
													url:"http://"+  w +"/api/getproductcom",
													data:{productid :li_id },
													success:function( data) {
														$('.eval').html(template('eval_demo',data))
													}
												})
											}

										})

									});
								}
							})
						}
					})

				}
			})
		}
	})
})
};