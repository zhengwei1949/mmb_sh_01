
// 分类页面

// 两个 ip 要改

$(function(){

	//返回上一页
	$(".return").on("click", function () {
		window.history.back(-1);
	});
	//加载页面
	$.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
                    name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
        return unescape(r[2]);
        return null;
    }

	// #contentBox 部分
	$('#contentBox').css({
		border: '1px solid #CCCCCC',
		borderBottom:'none'
	})

	var t=0;
	$.getJSON(
		// 后台地址
		//////////////////////////
		// 改 ip
		//////////////////////////
		"http://127.0.0.1:9090/api/getcategorytitle",
		function(data){
			// 遍历数据
  			$.each(data.result, function(i,item){
  				
                var $divBox = $("<div>");
                var $div2 = $("<div>");
                // 创建 div 标签
                // 添加 html 内容为 item.title
                // 设置 div 样式
				var $div = $("<div>").html( item.title).attr({
					id:item.titleId
				}).css({
					padding: '5px 15px',
					fontSize: '16px',
					fontWeight: '900',
					borderBottom: '1px solid #CCCCCC',
					background:'#EDEDED'
					// 绑定 点击事件
				}).on({click:function(){
					// 清空 $div2 内容
					$div2.html('');

					t++;
					// 判断点击次数  单数次 时请求 数据
					if (t%2==1){
						$.getJSON(
							// 后台地址
							//////////////////////////
							// 改 ip
							//////////////////////////
							"http://127.0.0.1:9090/api/getcategory?titleid="+this.id,
							function(data){
								$.each(data.result, function(i,item){
									var $a = $("<a>").html(item.category).attr({
										href:'pleaceholder:;'
									}).css({
										display:'inline-block',
										width:'33%',
										padding:'3px 0',
										textAlign: 'center',
										borderBottom:'1px solid #CCCCCC',
										borderRight:'1px solid #CCCCCC'
									});
									// 将 $a 添加到 $div2
									$a.appendTo($div2);
								})
							}
						);
					}

					
				}})
				
				// 将 $div2 添加到 $div
				$div2.appendTo($div);
				
				
				// 创建 span 标签
                // 添加 html 内容为 ﹀
                // 设置 span 样式
				var $span = $('<span>').attr({
					class:'iconfont'
				}).html('&#xe64c;').css({
					float: 'right'
				});
				// 将 $span 添加到 $div
				$span.appendTo($div);
				// 将 $div 添加到 $divBox
				$div.appendTo($divBox);
				// 将 $div2 添加到 $divBox
				$div2.appendTo($divBox);

				// 将 $divBox 添加到 #contentBox
    			$divBox.appendTo("#contentBox");


















    			
  			});
		}
	);







})