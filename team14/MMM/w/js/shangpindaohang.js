/**
 * Created by Administrator on 2016/11/29.
 */
$(function(){
    $('nav').css({
        background:'#fff',
        padding:'0.133rem 0.4rem',
    });
    $.getJSON(
        'http://mmb.ittun.com/api/getsitenav',
        function(data){
            $.each(data.result,function(i,item){
                var a = $('<a>');
                a.css({
                    display:'inline-block',
                    border:'1px solid #BFBFBF',
                    background:'#F4F4F4',
                    marginRight:'0.067rem',
                    marginTop:'0.067rem',
                    padding:'0.133rem 0.267rem',
                }).attr({href:item.navHref}).appendTo($('.mmb-nav'));
                $('<img>').attr({src:item.navImg}).css('verticalAlign','top').appendTo(a);
                $('<span>').html(item.navTitle).css('paddingLeft','0.067rem').appendTo(a);
            })
        }
    )
})
