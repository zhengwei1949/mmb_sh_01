/**
 * Created by Administrator on 2016/11/25.
 */

setCouponList($('.coupon-product'),+$.getUrlParam('couponId'));
$('.container img').on('click', function () {$('.container').css('display','none');})
function setCouponList(dom,couponid){
    var arr = ['肯德基优惠券','必胜客优惠券','棒约翰优惠券','哈根达斯优惠券'];
    $('#header h3').html(arr[couponid]);
    $('title').html(arr[couponid]);
    $('.curr').html(arr[couponid]);
    $.ajax({
        url:getUrl()+'getcouponproduct',
        data:{'couponid':couponid},
        success: function (data) {
            var html = template('coupon-product',data);
            dom.html(html);
            $('.coupon-product img').on('click', function () {
                $('.container').css('display','block');
                $('.container img').attr('src',$(this).attr('src'));
            })
        }
    })
}