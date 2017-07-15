$(function () {

    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        data: {},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $('#info').html(template('result', data));
            leftSwipe();

            $.ajax({
                url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
                data: {titleid: data.result[ 0 ].titleId},
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    $('#info1').html(template('result1', data));

                    //当数据加载完成 得到数据后在调用执行下面的代码
                    leftSwipe();
                }
            });
            $('.nav-tabs li').on('click', function () {
                $.ajax({
                    url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
                    data: {titleid: this.id},
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        $('#info1').html(template('result1', data));

                    }
                })
            })
        }

    });
});
$(function () {

    var bb = null;
    var flag = true;
    window.onscroll = function () {

        bb = $("body").scrollTop() * 0.0001
        $("aside")[ 0 ].style.backgroundColor = "rgba(128, 128, 128," + bb + ")";
        $("#jian")[ 0 ].style.color = "rgba(255, 255, 255, " + bb + ")";

        if (flag) {
            $("aside,#fan").click(function () {
                $("html,body").animate({scrollTop: 0}, 500);
                bb = 0;
            });
            flag = false;
        }
    }

})
/*....................导航栏滑动以及点击的样式  star........................*/
function leftSwipe() {
    var parentBox = document.querySelector('.product');
    var childBox = parentBox.querySelector('ul');
    var parentWidth = parentBox.offsetWidth;
    var childWidth = 5;

    var lis = childBox.querySelectorAll('li');

    for ( var i = 0; i < lis.length; i++ ) {
        //获取每个li标签的宽度
        liwidth = lis[ i ].offsetWidth;
        // console.log(liwidth);
        // 设置索引
        lis[ i ].index = i;
        //把获取到的每个li标签相加起来得到ul的宽度
        childWidth += liwidth;
    }
    childBox.style.width = childWidth + "px";
    // console.log(childWidth);
    /*translateX 初始的定位 其实就是最大定位 0*/
    var maxX = 0;
    /*translateX 滑动到最右面的定位 其实就是最小定位 父容器高度-子容器高度*/
    var minX = parentWidth - childWidth;
    /*自己定义缓冲的距离*/
    var distance = 100;
    /*translateX 最大滑动定位*/
    var maxSwipe = maxX + 100;
    /*translateX 最小滑动定位*/
    var minSwipe = minX - 100;
    /*第一步  1.菜单滑动起来*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    var currX = 0;
    /*记录当前的定位 全局  相当于轮播图当中的index*/
    /*定义公用的方法*/
    var addTransition = function () {
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    }
    var removeTransition = function () {
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }
    var setTranslateX = function (x) {
        childBox.style.webkitTransform = "translateX(" + x + "px)";
        childBox.style.transform = "translateX(" + x + "px)";
    }
    /*绑定事件*/
    childBox.addEventListener('touchstart', function (e) {
        startX = e.touches[ 0 ].clientX;
    });

    childBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[ 0 ].clientX;
        distanceX = moveX - startX;
        // 可打印滑动的距离显示  console.log(distanceX);
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if ((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe) {
            setTranslateX(currX + distanceX);
        }
    });
    window.addEventListener('touchend', function (e) {
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        if (( currX + distanceX) > maxX) {
            currX = maxX;
            addTransition();
            setTranslateX(currX);
        }

        /*当往上滑的时候 小于 最小定位*/
        else if (( currX + distanceX) < minX) {
            currX = minX;
            addTransition();
            setTranslateX(currX);
        }

        else {
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currX = currX + distanceX;
        }

        /*重置所有的参数  不重置currY */
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = 0;
    });
    /*绑定tap*/
    /*所有的li*/

    itcast.tap(childBox, function (e) {
        /*找到事件触发源 然后找到点击的那个li元素*/
        var li = e.target.parentNode;
        // console.log(e.target.parentNode);
        /*4.点击菜单的时候  改变当前的样式*/
        for ( var i = 0; i < lis.length; i++ ) {
            //每次点击的时候，先清除点击之前的其他标签上的样式
            lis[ i ].className = '';
        }
        //点击哪个标签就在哪个标签上加上样式
        li.className = "active";
        /*
         * 5.点击菜单的时候  定位到当前的那个菜单到最顶部
         * 如果不满足定位区间就不做定位
         * */
        // console.log(li.index);
        /*需要知道  将要定位的位子*/
        var translateX = -li.index * liwidth;
        /*通过索引来计算*/
        // console.log(translateX);


        /*判断当前的定位要大于  定位区间的  最小定位*/
        if (translateX > minX) {
            currX = translateX;
            addTransition();
            setTranslateX(currX);
        }
        else {
            currX = translateX;
            addTransition();
            setTranslateX(currX);
        }
    });
}
/*
 li标签的宽度如果想美观的话 可以设死随最宽的li的宽度，否则不设定li的宽度
 */
/*....................导航栏滑动以及点击的样式  end.........................*/