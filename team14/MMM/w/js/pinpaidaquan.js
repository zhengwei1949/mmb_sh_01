/**
 * Created by Administrator on 2016/11/24.
 */

$(function(){
    // 获取数据
    $.getJSON(
        "http://127.0.0.1:9090/api/getbrandtitle",
        function(data){
            $.each(data.result,function(i,item){
                // 获取内容
                var content = item.brandTitle;
                // 创建1个li
                var $li = $("<li>");
                // 创建1个 a ，把内容穿进去
                var $a = $('<a>').html(content).attr({
                    // 添加 href 属性
                    href:'pinpaidaquanliebiao.html?brandtitleid='+item.brandTitleId,
                }).css({
                    display:'inline-block',
                    width:'100%',
                    height:'100%',
                    lineHeight:'0.3rem',
                    padding: '0.133rem',
                    borderTop:'1px solid #CCC',
                    paddingLeft:'0.2rem',
                    backgroundColor:'#EDEDED',
                    fontSize:'0.187rem',
                })
                // 把a追加到li里面
                $a.appendTo($li);
                // 把li追加到页面的ul里面
                $li.appendTo($('#mmb-flul'))
                // 最右边的向下的小箭头
                var $span = $('<span>').html('>').css({
                    float:'right',
                    width:'0.3rem',
                    height:'0.3rem',
                    transform:'rotate(90deg)',
                    marginRight:'0.267rem',
                    textAlign:'center',
                    lineHeight:'0.3rem',
                    fontSize:'0.293rem',
                })
                // 把它追加到a里面
                $span.appendTo($a);
            })
        }
    )
})