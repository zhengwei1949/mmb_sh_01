/**
 * Created by Chen on 2016/11/26.
 */
$(function () {
        function GetQueryString(name){
            var reg = new RegExp('(^|&)' + name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null){
                return decodeURI(r[2]);
            }
            return null;
        }
        var id = GetQueryString('brandTitleId');
        var txt = GetQueryString('brandTitle');
        var num = txt.length - 2;
        txt = txt.substr(2,num);
        $('.title').html(txt + '销量排行');

   $.ajax({
       url:'http://mmb.ittun.com/api/getbrandproductlist',
       data:{brandtitleid:id},
       success:function (data) {
           var html = template('pro', data);
           $('.son_main').html(html);
           console.log(data);
       }
   })
});