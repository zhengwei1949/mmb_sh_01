$(function () {
    var status = getData("couponid");
    var coupontitle = getData('coupontitle');
    $('header h4').text(coupontitle + '优惠券')
    $('.c-title').text(coupontitle + '优惠券');
    //ajax请求数据函数
    $.ajax({
        type: 'get',
        url: url() + '/api/getcouponproduct',
        data: {couponid: status},
        dataType: 'json',
        //轮播图模块
        success: function (data) {
            var html = template('result', data);
            $('.content').html(html);

            //$('.main2_img ul li').last().clone().prependTo('.main2_img ul');
            //$('.main2_img ul li').eq(1).clone().appendTo('.main2_img ul');
            $('.main>div').each(function () {
                $(this).on('click', function () {
                    $('.main2').show();
                    var width = $('.main2_img ul li')[1].offsetWidth;
                    $('.main2_img ul')[0].style.left = -($(this).index() / 2) * width + 'px';
                    var b = -($(this).index() / 2) * width;
                    var i = 0;
                    $('.main2_right')[0].onclick = function () {
                        //if(i<$('.main>div')[0].index()/2)
                        i++;
                        if (i >= $('.main2_img ul li').length - 1) {
                            i = 0;
                            $('.main2_img ul')[0].style.left = i;
                            return;
                        }
                        $('.main2_img ul')[0].style.left = -i * width + b + 'px';
                    }
                    $('.main2_left')[0].onclick = function () {
                        i--;
                        if (i < 0) {
                            i = $('.main2_img ul li').length-2;
                            $('.main2_img ul')[0].style.left = -i * width + b + 'px';
                        }
                        $('.main2_img ul')[0].style.left = -i * width + b + 'px';
                    }
                    //$('.main2_img ul')[0].
                })
            })
            $('.main2_del').on('click', function () {
                $('.main2')[0].style.display = 'none';
            })
        }
    })

    returnTop('#reTop');
});