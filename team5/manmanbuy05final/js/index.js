/**
 * Created by lenovo on 2016/11/25.
 */
$(function () {

    $.ajax({
        type: 'get',
        url: url.self+'/api/getindexmenu',
        dataType: 'json',
        success: function (data) {
            var tag = '';
            for (var k in data.result) {
                var a = data.result[k];
                tag += '<li class="menu-item">' +
                    '<a href="' + a.titlehref + '">' +
                    a.img +
                    '<p>' + a.name + '</p>' +
                    '</a>' +
                    '</li>';

                $('.nav_cont').html(tag);
                //找到最后一排的导航，在动态请求时添加类名hide让他们隐藏
                $('.mmb_nav>.nav_cont> .menu-item:nth-last-child(-n+4)').addClass('hide');
                //点击第八个li标签中的a，让最后一排出现或隐藏
                $(".mmb_nav>.nav_cont>.menu-item:nth-child(8)>a").on('click', function () {
                    $('.mmb_nav>.nav_cont> .menu-item:nth-last-child(-n+4)').toggleClass('hide');
                });
            }
            //$('.menu-item')[0].href='category.html';
            //console.log($('.menu-item')[0]);
        }
    })


    $.ajax({
        type: 'get',
        url: url.self+'/api/getmoneyctrl',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var tag = '';
            for (var k in data.result) {
                var a = data.result[k];
                var pl=data.result[k].productComCount;
                var aa=pl.replace(/[^0-9]/ig,"");
                console.log(aa);
                tag += '<a class="product_content" href="discount_soy.html?productid='+a.productId+'">' +
                    '<div class="product_img">' +
                    '<div>' + a.productImgSm + '</div>' +
                    '</div>' +

                    '<div class="product_intro">' +
                    '<div class="product_name" >' +
                    '<span>' + a.productName + '</span>' +
                    '<span id="spec">' + a.productPinkage + '</span>' +
                    '</div>' +

                    '<p class="product_time">' +
                    '<span>' + a.productFrom + '</span>|' +
                    '<span>' + a.productTime + '</span>' +

                    '<span id="ping">' +'<i></i>'+aa + '</span>' +

                    '</p>' +
                    '</div>' +
                    '</a>';

                $('.product_box').html(tag);
            }
        }

    })

    $(".mmb_footer .w3").on('click', function () {
        var timer = setInterval(function () {
            var leader = document.body.scrollTop;
            var target = 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (leader === target) {
                clearInterval(timer);
            }
            document.body.scrollTop = leader;
        }, 20);
    })


})