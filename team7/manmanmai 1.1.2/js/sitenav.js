/**
 * @Author: syy
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   syy
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function(){
    $.getJSON('http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getsitenav'],
        function(data){
            var arr=[];
            $.each(data,function(k,v){
                arr.push.apply(arr,v);
            });
            var t='';
            $.each(arr,function(k,v){
                t+= '<a href="'+v["navHref"]+'">'+ '<span class="mr_5"><img src='+v["navImg"]+'></span>'+ '<span>'+v["navTitle"]+'</span>'+
                    '</a> ' ;
            });
            $('section').html(t);
        }
    )
});