
 // 优惠卷页面
$(function(){
    //返回上一页
    $(".return").on("click", function () {
        window.history.back(-1);
    });
    // #contentBox 部分
    $.getJSON(
        // 后台地址
        //////////////////////////
        // 改 ip
        //////////////////////////
        "http://127.0.0.1:9090/api/getcoupon",
        function(data){
            // 遍历数据
            $.each(data.result, function(i,item){
                // 创建 a 标签
                // 添加 id  href 属性
                // 设置 a 样式
                var $a = $('<a>').attr({
                    id:item.couponId,
                    href:item.couponLink+'?couponid='+item.couponId
                }).css({
                    display:'inline-block',
                    paddingTop:'5px',
                    textAlign: 'center',
                    border: '1px solid #CCCCCC',
                    width:'30%',
                    marginRight: '5px',
                    marginTop: '5px'
                })

                // 创建 img 标签
                // 添加 src 属性
                // 设置 img 样式
                var $img =  $('<img>').attr({
                    src:item.couponImg
                }).css({
                    display:'inline-block',
                    width:'40px',
                    height:'40px',
                })
                // 将 $img 添加到 $a
                $img.appendTo( $a );
                // 创建 p 标签
                // 添加 html 内容为 item.couponTitle
                var $p = $('<p>').html(item.couponTitle);
                // 将 $p 添加到 $a
                $p.appendTo( $a );
                // 将 $a 添加到 #contentBox
                $a.appendTo( '#coupon' );
                
            });
        }
    )




})
