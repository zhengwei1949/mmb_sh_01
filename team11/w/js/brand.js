'use strick'
$(function(){
  setbrandList( $(".brand-list"), $.getUrlParam("brandTitleId") );

 $("#xiaol").get(0).href = "xiaoliang.html?brandtitleid="+$.getUrlParam("brandTitleId");
  // 十大品牌排
  function setbrandList( dom, brandTitleId, callback ){
    $.ajax({
      url: 'http://mmb.ittun.com/api/getbrand',
      //url: 'http://mmb.ittun.com/api/getbrand',
      data: {
          "brandtitleid": brandTitleId
      },
      "success": function( data ){
        var html = template('brandList', data);
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
