/**
 * Created by Administrator on 2016/11/24.
 */

$(function () {
    $.ajax({
        url:getUrl()+'getcoupon',
        success: function (data) {
            var html = template('count-title',data);
            $('.count-title').html(html);
        }
    })
})