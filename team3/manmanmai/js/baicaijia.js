$(function() {

    //总页数查询，添加第一页数据，并添加select的option
    var titleid;
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        // data: { titleid: titleid },
        dataType: 'json',
        success: function(data) {
            var ul = template('titleRender', data);
            $(".bcj-nav").html(ul);
            $(".bcj-nav ul").css('width', Math.ceil(window.innerWidth / 6 * data.result.length));
            $(".bcj-nav ul li").css('width', window.innerWidth / 6);
            $(".bcj-nav ul li").each(function(index, el) {
                this.index = index;
            });

            //先渲染首页
            productRender(0);

            // 点击按钮请求数据
            $(".bcj-nav li").click(function() {
                var titleid = this.index;
                productRender(titleid);
            });

        }
    })


    function productRender(titleid) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct?titleid=' + titleid,
            // data: { titleid: titleid },
            dataType: 'json',
            success: function(data) {
                var ul = template('productRender', data);
                // $(".bcj-content").find("ul").remove();
                $(".bcj-content").html(ul);
                titleSwip();
            }
        })
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

    function titleSwip() {

        //获取元素
        var wrapperWidth = $(".bcj-nav").width();
        var boxWidth = $(".bcj-nav ul").width();

        // 计算滑动区间
        var maxX = 0,
            minX = wrapperWidth - boxWidth;

        // 自己定义缓冲的距离
        var distance = 40;

        /*translateX 最大滑动定位*/
        var maxSwipe = maxX + distance;
        /*translateX 最小滑动定位*/
        var minSwipe = minX - distance;

        var startPos = 0,
            endPos = 0,

            // 纪录当前X坐标
            currX = 0;

        /*定义公用的方法*/
        var addTransition = function() {
            $(".bcj-nav ul")[0].style.webkitTransition = "all .2s";
            $(".bcj-nav ul")[0].style.transition = "all .2s";
        };
        var removeTransition = function() {
            $(".bcj-nav ul")[0].style.webkitTransition = "none";
            $(".bcj-nav ul")[0].style.transition = "none";
        };
        var setTranslateX = function(x) {
            $(".bcj-nav ul")[0].style.webkitTransform = "translateX(" + x + "px)";
            $(".bcj-nav ul")[0].style.transform = "translateX(" + x + "px)";
        };

        $(".bcj-nav ul")[0].addEventListener('touchstart', function(e) {
            var touch = e.targetTouches[0];
            startPos = {
                x: touch.pageX,
            };
        }, false);

        $(".bcj-nav ul")[0].addEventListener('touchmove', function(e) {
            if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            var touch = e.targetTouches[0];
            endPos = {
                x: touch.pageX - startPos.x,
            };
            removeTransition();
            event.preventDefault();
            setTranslateX(currX + endPos.x);

        });

        window.addEventListener('touchend', function(e) {
            /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
            /*当往下滑的时候 大于 最大定位*/
            if ((currX + endPos.x) > maxX) {
                currX = maxX;
                addTransition();
                setTranslateX(currX);
            }

            // 当往上滑的时候 小于 最小定位
            else if ((currX + endPos.x) < minX) {
                currX = minX;
                addTransition();
                setTranslateX(currX);
            } else {
                /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
                currX = currX + endPos.x;
            }

            /*重置所有的参数  不重置currY */
            startPos = 0;
            endPos = 0;
        });
    }
});
