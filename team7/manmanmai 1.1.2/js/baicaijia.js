/**
* @Author: leon
* @Date:   2016-11-21 20:52:00 
* @Last Modified by:   leon
* @Last Modified time: 2016-11-25 16:58:00 
*/

/* ---- 白菜价页面 ---- */
$(function () {

    /* --- 页面加载时首先渲染tab栏 ---*/
    $.getJSON(
        'http://'+ tool.baseURL +':'+ tool.basePort +tool.apiHub['getbaicaijiatitle'],
        function (data) {
        var widthLi = 0,
            source = '{{if result}}'
            + '      <ul class="clearfix">'
            + '      {{each result as value}}'
            + '       <li><a href="javascript:;" id="{{value.titleId}}">{{value.title}}</a></li>'
            + '      {{/each}}'
            + '      </ul>'
            + '      {{/if}}';

        tool.renderHTML(source, data, ".nav-cabbage");

        /* --- js动态设置ul的宽度 --- */
        $('.nav-cabbage ul li').each(function(k, v){
            widthLi += v.offsetWidth;
        });

        $('.nav-cabbage ul').width(widthLi + 20 + 'px');

        /* --- 第一个tab设置默认选中样式 --- */
        $(".nav-cabbage ul li:first-child a").toggleClass('active');

        /* --- 商品列表首先渲染第一个tab栏对应的数据 --- */
        getjson(0);

        /* --- tab 注册点击事件，切换tab栏时发送请求 --- */
        $('.nav-cabbage ul li a').on("click", function () {
            $('.nav-cabbage ul li a').removeClass('active');
            $(this).toggleClass('active');
            /* --- 点击完成后请求商品列表数据 --- */
            getjson(this.id);
        });

        /*执行tab栏动画函数*/
        swipeNav();

        /* 给回到顶部注册点击事件 */
        $('.backTop').on('click', function(){

        })
    });


    /* --- getjson 商品列表请求函数 ---
    *  参数说明
    *  num:  当前点击tab的id值
    *  */
    function getjson(num) {
        $.getJSON(
            'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbaicaijiaproduct'],
            {titleid: num},
            function (data) {
            var source = '<ul>'
                + '{{if result}}'
                + '  {{each result as value}}'
                + '  <li>'
                + '  <div class="product-wrapper clearfix">'
                + '  <a href="#" id="{{#value.productId}}" class="imgBox">{{#value.productImg}}</a>'
                + '  <div class="productText">'
                + '  <h5>{{#value.productName}}'
                + '  </h5>'
                + '  <p>{{=value.productPrice}}</p>'
                + '  <div class="progress-bar clearfix">{{=value.productCouponRemain}}'
                + '  </div>'
                + '  <div class="getCount clearfix">{{=value.productCoupon}}'
                + '  {{=value.productHref}}'
                + '  </div>'
                + '  </div>'
                + '  </li>'
                + '  {{/each}}'
                + '{{/if}}'
                + '</ul>';
            tool.renderHTML(source, data, '.product-list');
        })
    }



    /* ---- tab栏滑动函数 ----*/
    function swipeNav(){
        /* nav标签 */
        var $parBox = $('#swipe');
        /* ul标签 */
        var $chiBox = $parBox.find('ul');
        var $parWidth = $parBox.width();
        var $chiWidth = $chiBox.width();

        /* translateX 初始定位 其实就是最大定位 0 */
        var maxX = 0,
            minX = $parWidth - $chiWidth,
            distance = 20,
            maxSwipe = maxX + distance,
            minSwipe = minX - distance,

            /* 设置ul滑动 初始化样式*/
            startX = 0,
            moveX = 0,
            distanceX = 0,
            isMove = false,

            /* 设置 记录当前定位的参数值 */
            currX = 0;

            /* 定义动画公用函数 */

            /* addTransition */
        function addTransition(){
            $chiBox.css({
                'webkitTransition': "all .2s",
                'transition': "all .2s"
            })
        }

            /* removeTransition */
        function removeTransition(){
            $chiBox.css({
                'webkitTransition': "none",
                'transition': "none"
            })
        }

            /* setTranslateX */
        function setTranslateX(x){
            $chiBox.css({
                'webkitTransform': "translateX("+x+"px)",
                'transform': "translateX("+x+"px)"
            })
        }

        /* 给ul绑定事件 */
        $chiBox.on('touchstart', function(e){
            startX = e.touches[0].clientX;

        });
        $chiBox.on('touchmove', function(e){
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            //清除过渡
            removeTransition();
            if((currX + distanceX) < maxSwipe && (currX + distanceX)>minSwipe){
                setTranslateX(currX + distanceX);
            }
        });

        $chiBox.on('touchend', function(e){
            // 下滑动作 不能大于最大定位值
            if((currX + distanceX) > maxX){
                currX = maxX;
                addTransition();
                setTranslateX(currX);
            }

            // 上滑动作  不能小于最小定位
            else if((currX + distanceX) < minX){
                currX = minX;
                addTransition();
                setTranslateX(currX);
            }

            // 滑动没有到最左或者最右
            else {
                currX = currX + distanceX;
            }

            // 滑动结束后 重置初始参数
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = 0;
        });
    }
});




