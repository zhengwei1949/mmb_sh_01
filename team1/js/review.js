/**
 * Created by Chen on 2016/11/27.
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
    var id = GetQueryString('productid');
    var txt = GetQueryString('productName');
    var img =  GetQueryString('productImg');
    console.log(txt);
    console.log(img);
    $('.title1').html(img);
    $('img').after('<p>'+txt+'</p>');

    $.ajax({
        url:'http://mmb.ittun.com/api/getproductcom',
        data:{productid:id},
        success:function (data) {
         var html = template('pro', data);
         $('.son_main').html(html);
            console.log(data);
        }
    })
});