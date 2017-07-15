/**
 * Created by admin on 2016/11/28.
 */

$(function(){
    var url=location.search;
    //console.log(url);
    var str=url.split('=');
    //console.log(str[1]);
    $.getJSON('http://127.0.0.1:9090/api/getcouponproduct?couponid='+str[1],function(data){
        console.log(data);
        var html=template('tpl_couponproduct',data);
        $('.discountBox').html(html);

    });
});
