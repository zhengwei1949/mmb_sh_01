/**
 * Created by Chen on 2016/11/25.
 */
$(function () {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbrandtitle',
        scriptCharset: 'utf-8',
        success: function (data) {
            var html = template('pro', data);
            $('.main').html(html);
            console.log(data);
        }
    })
});