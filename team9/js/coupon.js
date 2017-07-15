/**
 * Created by admin on 2016/11/28.
 */


$(function(){
    $.getJSON('http://127.0.0.1:9090/api/getcoupon',null,function(data){
        console.log(data);
        var html=template('tpl_discount',data);
        $('.discountBox').html(html);
    });
});