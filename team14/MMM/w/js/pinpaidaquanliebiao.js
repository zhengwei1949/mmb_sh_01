/**
 * Created by Administrator on 2016/11/25.
 */

$(function(){
    // 获取 url 链接  截取最后一个字符
    var link = window.location.search.split('=')[1];
    // 获取数据
    $.getJSON(
        'http://mmb.ittun.com/api/getbrand',
        {"brandtitleid":link},
        function(data){
            $.each(data.result,function(i,item){
                // 获取名字 和 售出 各类标签
                var li,p,span,a;
                // 创建li
                li = $("<li>");
                a = $('<a>').css({
                    display:'block',
                    padding:'0.133rem',
                    borderTop:'1px solid #E7E7E7',
                }).attr({href:'pinpaidaquanxiaoliang.html?brandtitleid='+item.brandTitleId});
                // 创建p 放 brandName  放到li 里面
                p = $('<p>').html(item.brandName).css({
                    marginBottom:'0.067rem',
                    paddingLeft:'0.4rem',
                });

                // 创建 span  放  brandInfo  放到 li 里面
                span = $('<span>').html(item.brandInfo).css({
                    color:'#999',
                    paddingLeft:'0.4rem',
                });

                // 创建 i 放 >
                $('<i>').html(">").appendTo(a).css({
                    display:'inline-block',
                    padding:'0.2rem',
                    textAlign:'center',
                    lineHeight:'0.2rem',
                    float:'right',
                    fontSize:'0.293rem',
                })

                // 创建 s 放 方块
                $('<em>').html( i + 1 ).appendTo(a).css({
                    display:'line-block',
                    width:'0.267rem',
                    height:'0.267rem',
                    textAlign:'center',
                    lineHeight:'0.26rem',
                    float:'left',
                    color:'white',
                    background:'#C9C9C9',
                })
                p.appendTo(a);
                span.appendTo(a);
                a.appendTo(li);
                li.appendTo($('#mmb-flul'))
                $('.mmb-fenlei ul li:nth-child(1)').css({
                    borderTop:'0',
                })
                $('.mmb-fenlei em').eq(0).css('background','red');
                $('.mmb-fenlei em').eq(1).css('background','#FF9314');
                $('.mmb-fenlei em').eq(2).css('background','#8ADF5B');
            })
        }
    )

    $.getJSON(
        "http://mmb.ittun.com/api/getbrandtitle",
        function(data){
            var arr = [];
            $.each(data.result,function(i,item) {
                var r = item.brandTitle.split('十')[0]+'销量排行';
                arr.push( r );
            })
            $('.mmb-paihang').html(arr[link]);
        }
    )
})