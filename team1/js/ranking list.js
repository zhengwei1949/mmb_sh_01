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
    txt = txt.slice(0,length-4);
    $('.title').html(txt + '哪个牌子好');
    console.log(txt);
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbrand',
        data: {brandtitleid:id },
        success: function (data) {
            var html = template('pro', data);
            $('.son_main').html(html);
            console.log(data);
        }
    })
});
