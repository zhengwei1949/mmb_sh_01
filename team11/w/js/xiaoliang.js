'use strick'
$(function(){
    setxiaoliang( $(".product-list"), $.getUrlParam("brandtitleid") );
    // 十大品牌排
    function setxiaoliang( dom, brandTitleId, callback ){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbrandproductlist',
            data: {
                "brandtitleid": brandTitleId,
                pagesize:4
            },
            "success": function( data ){
                var html = template('brandProduct', data);
                dom.html(html);
                // setbrandvolume($('.product-list'), $.getUrlParam("categoryId"));
            }
        })
    }
});

(function($) {
    $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);
