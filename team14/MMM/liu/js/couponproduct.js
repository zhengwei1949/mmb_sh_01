/**
 * Created by liuxiu on 2016/11/25.
 */


$(function () {
    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var id = get('couponid');
    console.log(id);

    $.ajax({
        url: "http://mmb.ittun.com/api/getcouponproduct",
        data: {couponid: id},
        success: function (data) {
            console.log(data);
            var discountdata = template('discount-all', data);
            $(".discount_list").html(discountdata);
            a();
        }
    });


    // 优惠券弹出框
    function a() {
        $('.list_left').click(function () {
            $('.lay').css({display: "block"});
            $(this).find('img').appendTo('.lay ul li');
        });
    }


    //点击箭头滑向顶部
    $(".iconfonts").click(function () {
        $("html,body").animate({scrollTop: 0}, 500)
    });

    
});




