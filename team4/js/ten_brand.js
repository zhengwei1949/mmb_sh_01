/**
 * Created by ASUS on 2016/11/24.
 */
$(function(){
        // 获取url地址栏中的参数的函数
        function GetQueryString(name){
             var reg = new RegExp('(^|&)' + name +"=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if(r != null){
                 return unescape(r[2]);
             }
                 return null;
         }
        var num =  GetQueryString('brandTitleId');
        $.ajax({
            data:{brandtitleid:num},
            url:getUrl()+'getbrand',
            success:function(data){
                // console.log(data);
                var html = template('gs', data);
                $('.listing>ul').html(html);
                
            }
        });

    });