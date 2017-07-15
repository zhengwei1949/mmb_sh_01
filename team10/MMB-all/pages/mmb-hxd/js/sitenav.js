
 // 商城导航页面
$(function(){

    // #contentBox 部分
    $.getJSON(
        // 后台地址
        //////////////////////////
        // 改 ip
        //////////////////////////
        "http://127.0.0.1:9090/api/getsitenav",
        function(data){
            // 遍历数据
            $.each(data.result, function(i,item){
                // 创建 img 标签
                // 添加 src 属性, 指向 item.navImg
                // 设置 img 样式
                var $img = $('<img>').attr('src',item.navImg).css({
                    display :'inline-block',
                    width:'20px',
                    height:'20px',
                    background :'red',
                    verticalAlign: 'middle'
                });
                // 创建 a 标签
                // 添加 href 属性,指向 item.navHref
                // 设置 a 样式
                var $a = $("<a>").attr('href',item.navHref).css({
                    display :'inline-block',
                    padding : '5px',
                    background :'#F4F4F4',
                    border: '1px solid #BFBFBF',
                    margin:'5px',
                });
                // 将 $img 添加到 $a
                $img.appendTo($a);
                // 创建 span 标签
                // 添加 html 内容为 item.navTitle
                // 设置 span 样式
                var $span = $("<span>").html( item.navTitle ).css({
                    display :'inline-block',
                    marginLeft: '5px'
                });
                // 将 $span 添加到 $a
                $span.appendTo($a);
                // 将 $a 添加到 #contentBox
                $a.appendTo('#contentBox');

            });
        }
    );
    //返回上一页
    $(".return").on("click", function () {
        window.history.back(-1);
    })





})
