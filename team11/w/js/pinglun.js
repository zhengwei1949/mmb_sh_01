'use strick'
$(function(){
    setxiaoliang( $(".product-com"), $.getUrlParam("productid") );
    // 十大品牌排
    function setxiaoliang( dom, productid, callback ){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductcom',
            data: {
                "productid": productid,

            },
            "success": function( data ){
                var html = template('ProductCom', data);
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
