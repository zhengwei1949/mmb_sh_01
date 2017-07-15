/**
 * Created by Administrator on 2016/11/26.
 *  @Author: caoye
 */

$(function () {
    //回到顶部
    mmb.goBack();

    //请求到默认的全部栏商品的数据
    getPro({titleid :0});

    //进入页面立马发送ajax请求到 tab数据
    $.ajax({
        url:url.self+'/api/getbaicaijiatitle',
        dataType:"jsonp",
        success: function (data) {
            //创建模版对象并渲染到页面
            var html=template("tab-moban",data);
            $("#tab-ul").html(html);
            topSwipe();
        }
    })

    //函数功能：请求到 全部商品的数据
    function getPro(obj){
        //进入页面立马发送ajax请求到 全部商品的数据
        $.ajax({
            url:url.self+'/api/getbaicaijiaproduct',
            data:obj,
            dataType:"jsonp",
            success: function (data) {
                //console.log(data);
                //获取模版对象
                var html=template("pro-moban",data);
                //渲染到页面中的id为#pro-order的dom对象中
                $("#pro-order").html(html);
                //当图片不能显示时，显示alt内容--待完成
                $("img").attr({"alt":"很抱歉，该图片无法正常显示"});
            }
        })
    }

    /*函数功能:实现tab栏滑动+点击移位+发送ajax请求数据并动态加载等功能*/
    function topSwipe(){
        //jq和原生js混合来编程的--比较混乱
        /*获取父容器*/
        var parentBox = document.querySelector('.tab');
        var childBox = parentBox.querySelector('#tab-ul');
        var parentHeight = parentBox.offsetWidth;
        var childHeight = childBox.offsetWidth;

        /*translateY 初始的定位 其实就是最大定位 0*/
        var maxY = 0;
        /*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
        var minY = parentHeight-childHeight;
        /*自己定义缓冲的距离*/
        var distance = 50;
        /*translateY 最大滑动定位*/
        var maxSwipe = maxY + distance;
        /*translateY 最小滑动定位*/
        var minSwipe = minY - distance;

        /*第一步  1.菜单滑动起来*/
        var startY = 0;
        var moveY = 0;
        var distanceY = 0;
        var isMove  = false;

        var currY = 0;/*记录当前的定位 全局  相当于轮播图当中的index*/

        /*定义公用的方法*/
        var addTransition = function(){
            childBox.style.webkitTransition = "all .2s";
            childBox.style.transition = "all .2s";
        }
        var removeTransition = function(){
            childBox.style.webkitTransition = "none";
            childBox.style.transition = "none";
        }
        var setTranslateY = function(y){
            childBox.style.webkitTransform = "translateX("+y+"px)";
            childBox.style.transform = "translateX("+y+"px)";
        }

        /*绑定事件*/
        childBox.addEventListener('touchstart',function(e){
            startY = e.touches[0].clientX;
        });
        childBox.addEventListener('touchmove',function(e){
            moveY = e.touches[0].clientX;
            distanceY = moveY-startY;
            //console.log(distanceY);
            /*清除过度*/
            removeTransition();
            /*设置定位*/
            /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
            /*当前要做定位的位子需要在滑动区间内*/
            if((currY + distanceY) < maxSwipe &&　(currY + distanceY) > minSwipe){
                setTranslateY(currY + distanceY);
            }

        });
        window.addEventListener('touchend',function(e){
            /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
            /*当往下滑的时候 大于 最大定位*/
            if(( currY + distanceY)>maxY){
                currY = maxY;
                addTransition();
                setTranslateY(currY);
            }
            /*当往上滑的时候 小于 最小定位*/
            else if(( currY + distanceY)<minY){
                currY = minY;
                addTransition();
                setTranslateY(currY);
            }
            else{
                /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
                currY = currY + distanceY;
            }

            /*重置所有的参数  不重置currY */
            startY = 0;
            moveY =0;
            distanceY = 0;
            isMove = 0;
        });

        /*绑定tap*/
        /*所有的li*/
        var lis = childBox.querySelectorAll('#tab-ul li');

        //给 全部那一栏 添加类名
        $("#tab-ul li:first-child ").addClass("current");
        //记录点击之前的titleId，默认的为0
        var tmpTitleId= 0;
        //给每一个li绑定点击事件
        $("#tab-ul li").click(function () {
            var titleId=$(this).attr("titleId");
            //如果之前的titleId和现在点击的相同，则不会发送请求
            if(tmpTitleId!=titleId){
                getPro({titleid :titleId});
                tmpTitleId=titleId;
            }
            //点击排他
            $("#tab-ul li").each(function () {
                $(this).removeClass("current");
            })
            $(this).addClass("current");
            /*需要知道  将要定位的位子*/
            var translateY =-this.offsetLeft;
            /*通过索引来计算,50是一个li的长度*/
            /*判断当前的定位要大于  定位区间的  最小定位*/
            if(translateY > minY){
                currY = translateY;
                addTransition();
                setTranslateY(currY);
            }
            else{
                currY = minY;
                addTransition();
                setTranslateY(currY);
            }
        })


    }
})

