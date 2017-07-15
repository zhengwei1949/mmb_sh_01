/**
 * Created by chenlei on 2016/11/23.
 */
$(function(){
    /* nav导航栏数据 */
    ajax(getUrl()+"getbaicaijiatitle","get","json",{},loading($(".nav")),function(data){
        var navHtml = template("navLists",data);
        $(".nav").html("");
        $(".nav").html(navHtml);
        $(".nav").find("a").eq(0).addClass("active");
        //给a标签添加点击
        $(".nav").find("a").each(function(i,v){
            this.index = i;
            ulHtmlAjax(0);
            $(v).on("click",function(){
                $(this).addClass("active").parent("li").siblings("li").children("a").removeClass("active");
                /* 主要商品的请求 */
                ulHtmlAjax(this.index);
            })
        })

        //添加nav栏滑动事件
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;
        var isMove = false;
        var navLeft = $(".navUl")[0].offsetLeft;
        var navMaxWidth = $(".navUl").width() - $(".nav").width();
        var minDis = $(".nav").width() / 5;
        var maxDis = -navMaxWidth - $(".nav").width() / 5;
        $(".navUl")[0].addEventListener("touchstart",function(e){
            startX = e.touches[0].clientX;
        });
        $(".navUl")[0].addEventListener("touchmove",function(e){
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            navLeft += distanceX;
            if(navLeft < minDis && navLeft > maxDis) {
                $(".navUl").css("left",navLeft+distanceX);
            }
            isMove = true;
        });
        $(".navUl")[0].addEventListener("touchend",function(e){
            // 判断
            if(navLeft >= 0) navLeft = 0;
            if(navLeft <= -navMaxWidth) navLeft = -navMaxWidth;
            $(".navUl").css("left",navLeft);
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;
        });

    })
})

// 封装ajax请求
function ajax(url,type,dataType,data,beforeFn,callback) {
    $.ajax({
        url:url,
        type:type,
        dataType:dataType,
        data:data,
        beforeSend: beforeFn,
        success:function(data){
            callback&&callback(data);
        }
    })
}
function loading(container){
    container.html("<i class='iconfont2 icon-iconfontjiazai2 fs40'></i>");
}
//封装生成数据的ajax请求，一边一打开页面就生成数据

function ulHtmlAjax(i){
    ajax(getUrl()+"getbaicaijiaproduct","get","json",{titleid:i},loading( $(".main")),function(data) {
        var goodsHtml = template("goodLists",data);
        $(".main").html("");
        $(".main").html(goodsHtml);
        $(".main").css("marginTop",$(".top_fixed").height());
    })
}
