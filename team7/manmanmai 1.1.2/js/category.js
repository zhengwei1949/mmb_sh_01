/**
 * @Author: syy
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   syy
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function(){
    //标题内容
    $.getJSON('http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getcategorytitle'],function(data){
        var t=template('title',data);
        $('.b_list').html(t);

        //获取下拉内容
        $.each(data,function(i,val){
            $.each(val,function(i,v){
                $.getJSON('http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getcategory'],
                    {titleid:v["titleId"]},
                    function(data){
                        var c=template('content',data);
                        $('.l_sort').eq(v["titleId"]).append(c);
                    })
                }
            )
        });

        /*点击标题，内容下拉或隐藏*/
        $('.l_title').click(function(){
            $(this).parent().siblings().find($('ul')).slideUp(200);
            $(this).parent().find($('ul')).slideToggle(200);
        });
    });
});
