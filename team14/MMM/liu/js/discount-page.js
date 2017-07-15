/**
 * Created by liuxiu on 2016/11/25.
 */


$(function () {

//获取优惠券标题列表

    ajax("http://mmb.ittun.com/api/getcoupon", "get", "json", {}, function (data) {
        var coupondata = template('couponlist', data);
        $(".coupon").html(coupondata);
    });

});


//封装ajax请求
function ajax(url, type, dataType, data, callback) {
    $.ajax({
        url: url,
        type: type,
        dataType: dataType,
        data: data,
        success: function (data) {
            callback && callback(data);
        }
    });
}