/**
 * Created by Administrator on 2016/11/25.
 */
$(function(){
    // 获取 url 链接  截取最后一个字符
    var link = window.location.search.split('=')[1];
    // 获取数据
    $.getJSON(
        'http://mmb.ittun.com/api/getbrandproductlist',
        {"brandtitleid":link},
        function(data){
            if( data.result.length == 0){
                $('<li>').html('暂无数据，请移步其他品牌').css({
                    textAlign:'center',
                    lineHeight:'3rem',
                    color:'#777',
                }).appendTo($('#mmb-flul'))
            }
            $.each(data.result,function(i,item){
                // 声明一些变量接收
                var li, a;
                li = $('<li>').css({
                    borderTop:'1px solid #E7E7E7',
                    height:'2.05rem',
                    fontSize:'0.213rem',
                });
                // 创建a 做容器
                a = $('<a>').css({
                    display:'block',
                    padding:'0.133rem',
                    width:'100%',
                    height:'100%',
                    padding:'0.133rem',
                    position:'relative',
                }).attr({ href:'pinpaidaquanpinglun.html?productId='+item.productId,}).html(item.productImg);
                // 创建p 放 item.productName  标题
                $("<p>").html(item.productName).css({
                    height:'30%',
                }).appendTo(a);
                $('<strong>').html(item.productPrice).css({
                    display:'inline-block',
                    color:'#EA3900',
                    height:'30%',
                    lineHeight:'0.5rem',
                }).appendTo(a);
                // 创建p 放评论
                $("<p>").html('<span>'+ item.productQuote +'</span> '
                    + '<span>'+ item.productCom +'</span>').css({
                    color:'#A1A1A1',
                    height:'30%',
                    fontSize:'0.18rem'
                }).appendTo(a);
                // 创建i 放五星评论
                $("<i>").css({
                    float:'right',
                    width:'1.175rem',
                    height:'0.2rem',
                    background: 'url("images/wuxingpinglun.png")',
                    marginBottom:'0px',
                    top:'50%',
                    right:'0.133rem',
                    position:'absolute',
                }).appendTo(a);
                a.appendTo(li);
                li.appendTo($('#mmb-flul'));

                // 第一个li的上边框去掉
                $('.mmb-fenlei ul li:nth-child(1)').css({
                    borderTop:'0',
                })
                $('.mmb-fenlei img:nth-child(1)').css({
                    float:'left',
                    marginRight:'0.133rem',
                })
            });
        }
    )
    $.getJSON(
        "http://mmb.ittun.com/api/getbrandtitle",
        function(data){
            var arr = [];
            $.each(data.result,function(i,item) {
                var r = item.brandTitle.split('十')[0]+'哪个品牌好';
                arr.push( r );
            })
            $('.mmb-paihang').html(arr[link]);
        }
    )
})