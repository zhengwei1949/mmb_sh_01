$(function() {
    $(".container").css('minHeight', $(window).height() - $("footer").get(0).offsetHeight - $("header").height());

    var couponid = queryId(window.location.search).couponid;

    var titleArr = ["肯德基优惠券", "必胜客优惠券", "棒约翰优惠券", "哈根达斯优惠券"];

    $("header .title").text(titleArr[couponid]);



    $("body").on('click', '.product img', function(event) {
        $(".showPic").css({
            "height": $(window).height(),
            "width": $(window).width(),
            "backgroundColor": "rgba(0,0,0,.8)",
            "position": "absolute",
            "top": $("body").scrollTop()
        });
    });

    $("body").on('click','.product img',function(event) {
        $(".showPic").show();
    });
    

    $("body").on('click', '.showPic', function() {
        $(this).hide();
    })

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcouponproduct?couponid=" + couponid,
        async: true,
        dataType: 'json',
        success: function(data) {
            var html = template("couponproduct", data);
            $(".container").html(html);
            var imgStr = '<ul>';
            $.each(data.result, function(index, val) {
                imgStr += '<li><a href="#" >' +
                    val.couponProductImg +
                    '</a></li>';
            });
            imgStr += '</ul>';
            $("#slideBox .bd").append(imgStr);
            //          console.log(imgStr);

            //      轮播图特效设置     
            TouchSlide({
                slideCell: "#slideBox",
                //          titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                effect: "leftLoop",
                //          autoPage:true,//自动分页
                autoPlay: true //自动播放
            });


        }
    });

    function queryId(url) {
        var obj = {};
        var str = url.split('?')[1];
        str.split('&').forEach(function(v, i) {
            var arr = v.split('=');
            obj[arr[0]] = arr[1] ? arr[1] : '';
        })
        return obj;
    }

    //点击返回顶部按钮
    function backTop(time) {
        $('html,body').stop().animate({ 'scrollTop': 0 }, time);
    }

    $('.backTop').on('click', function() {
        backTop(300);
    });

    // 固定位置返回顶部按钮
    var $backToTop = $(".back-to-top");
    $backToTop.hide();

    $(window).on('scroll', function() {
        /* 返回顶部按钮将在用户向下滚动100像素后出现 */
        if ($(this).scrollTop() > 100) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });

    $backToTop.on('click', function(e) {
        backTop(500);
    });
})
