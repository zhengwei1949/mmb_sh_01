/**
 * Created by Administrator on 2016/11/26.
 */
$(function(){
    // 获取 url 链接  截取最后一个字符
    var link = window.location.search.split('=')[1];
    // 声明变量 接收 数据
    var plName,plContent,plRq,pllz,dv2;

    $('.mmb-fenlei').css('fontSize','0.187rem')

    $.getJSON(
        'http://mmb.ittun.com/api/getbrandproductlist?brandtitleid=0',
        function(data){
            var arr = [];
            $.each(data.result,function(i,item){
                if( item.productId == link){

                    var div =  $('<div>')
                    div.appendTo($('.mmb-fenlei'));
                    div.css({
                        height:'2.05rem',
                    })
                    $('<a>').html(item.productImg).css('float','left').appendTo(div);
                    $('<span>').html(item.productName).css({
                        color:'#999',
                        width:'70%',
                        display:'inline-block',
                        marginLeft:'0.133rem',
                        lineHeight:'0.33rem',
                    }).appendTo(div);
                }
            })
        }
    )


    $.getJSON(
        'http://mmb.ittun.com/api/getproductcom',
        {'productid':link},
        function( data ){
            $.each(data.result,function(i,item){
                pllz = item.comFrom;
                plRq = item.comTime;
                plName = item.comName;
                plContent = item.comContent;

                dv2 = $('<div>').css({
                    border:'1px solid #E7E7E7',
                    background:'#F8F8F8',
                    padding:'0.133rem',
                }).appendTo($('.mmb-fenlei'));
                var p1 = $('<p>').css('marginBottom','0.067rem').html("afasf").appendTo(dv2);
                $('<span>').html(plName).appendTo(p1);
                $('<span>').css({
                    display:'inline-block',
                    marginLeft:'0.433rem',
                }).html(pllz).appendTo(p1);

                $('<span>').css({
                    float:'right',
                }).html(plRq).appendTo(p1);
                $('<p>').html(plContent).appendTo(dv2);

            });
        }
    )
})