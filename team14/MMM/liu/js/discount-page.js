/**
 * Created by liuxiu on 2016/11/25.
 */


$(function () {

//��ȡ�Ż�ȯ�����б�

    ajax("http://mmb.ittun.com/api/getcoupon", "get", "json", {}, function (data) {
        var coupondata = template('couponlist', data);
        $(".coupon").html(coupondata);
    });

});


//��װajax����
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