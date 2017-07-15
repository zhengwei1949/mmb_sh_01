/**
 * Created by Administrator on 2016/11/27.
 */

$(function(){
    // 声明变量
    var div, a,dv,alink,titleId,ai;
    // 获取 url 链接 后面的
    var link = window.location.search.split('=')[1];
    $.getJSON(
        'http://mmb.ittun.com/api/getcategorytitle',
        function(data){
            $.each(data.result,function(i,item){
                alink = item.titleid;
               div =  $('<div>').css({
                    height:'0.533rem',
                    lineHeight:'0.533rem',
                    borderBottom:'1px solid #ccc',
                    background:'#EDEDED',
                    paddingLeft:'0.2rem',
                }).attr({calss:'box'}).appendTo($('.mmb-fenlei'));
                a = $('<a>').html(item.title).css({
                    display:'block',
                    width:'100%',
                    height:'100%',
                }).click(function(){
                    var a = 'bijiaoleisousuo.html?titleid=' + item.titleId;
                    titleId =  item.titleId;
                    var a1 = window.location.search.split('=')[1];
                    if( a1 == titleId)
                    {
                        location.href= 'bijiaoleisousuo.html';
                    }else
                    {
                        location.href="bijiaoleisousuo.html?titleid=" +titleId;
                    }
                    console.log($('.xiongdi'));
                }).appendTo(div);
                $('<span>').html('>').css({
                    float:'right',
                    width:'0.3rem',
                    height:'0.3rem',
                    transform:'rotate(90deg)',
                    marginRight:'0.267rem',
                    textAlign:'center',
                    lineHeight:'0.3rem',
                    fontSize:'0.3rem',
                    marginTop:'0.1rem',
                }).appendTo(a);
            });
            $('.mmb-fenlei div:nth-last-child(1)').css('borderBottom','0');
            $('.mmb-fenlei div:nth-child(1)').css('borderTop','1px solid #ccc');
        })

    $.getJSON(
        'http://mmb.ittun.com/api/getcategory',
        {'titleid':link},
        function(data){
            dv = $('<div>').attr({class:'xiongdi'});
            $.each(data.result,function(i,item){
                ai =$('<a>').html(item.category).css({
                    display:'inline-block',
                    background:'#F9F9F9',
                    height:'0.533rem',
                    lineHeight:'0.533rem',
                    textAlign:'center',
                    width:'33.3%',
                    borderBottom:'1px solid #ccc',
                    borderRight:'1px solid #ccc',
                }).attr({href:'http://mmb.ittun.com/api/getproductlist?categoryid='+item.categoryId}).appendTo(dv);
            })
            $('.mmb-fenlei').find('div').eq(link).after(dv);
        }
    )
    $('.mmb-fenlei').css('fontSize','0.187rem')
})