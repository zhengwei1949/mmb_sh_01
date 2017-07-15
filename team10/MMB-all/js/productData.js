/**
 * Created by yangxu on 2016/11/25.
 */

$(function () {
    //页面刷新的时候先去本地存储里面获取数据
//        var oldCommentData=JSON.parse(window.localStorage.getItem("comments"));
//        console.log(oldCommentData);
//        var oldCommentHTML=template("newComments",oldCommentData);
//        console.log(oldCommentHTML);
    /*console.log(JSON.parse(window.localStorage.getItem("comments")));
     if(JSON.parse(window.localStorage.getItem("comments"))){
     var oldCommentData=JSON.parse(window.localStorage.getItem("comments"));
     console.log(oldCommentData);
     var oldCommentHTML=template("newComments",oldCommentData);
     }*/

    //ajax请求渲染页面
    //从地址栏获取数据
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var urlStr = decodeURI(window.location.search.substr(1));
        var r = reg.exec(urlStr);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var productId = getUrlParam("productId");
    //针对不同的产品分别保存下面的的评论内容
    var keyName="comments"+productId;
    $.ajax({
        url: "http://127.0.0.1:9090/api/getmoneyctrlproduct",
        type: "get",
        data: {productid: productId},
        dataType: "Json",
        success: function (data) {
            var html = template("productData", data);
            $(".main_content").html(html);
            var productCity = template("productCity", data);
            $(".store").html(productCity);
            $(".store").find("li").addClass("clearfix");
            //实现评论区域功能
            $("#ctl00_ContentBody_Button1").on("click", function () {
                var myDate=new Date();
                //获取输入框内容后，清空输入框
                var newComments=$("#ctl00_ContentBody_txt_nr").val();
                $("#ctl00_ContentBody_txt_nr").val("");
                //当前时间
                var curTime=myDate.toLocaleDateString()+" "+(myDate.getHours()<10?("0"+myDate.getHours()):myDate.getHours())+":"+(myDate.getMinutes()<10?("0"+myDate.getMinutes()):myDate.getMinutes())+":"+(myDate.getSeconds()<10?("0"+myDate.getSeconds()):myDate.getSeconds());
                //模拟用户数据
                var commentData={
                    "result":[{
                        "userName":"GG买饭的",
                        "commentValue":newComments,
                        "commentTime":curTime,
                        "img":" <img src='images/aa.jpg'>"
                    }]
                };
                //添加新的评论
                var commentHTML=template("newComments",commentData);
                $(".ui-border-b").parents("ul").append(commentHTML);
                //将新的评论的数据保存起来
                commentStorage.result.push(commentData.result[0]);
                /*console.log(commentStorage);
                 console.log(JSON.stringify(commentStorage));*/

                window.localStorage.setItem(keyName,JSON.stringify(commentStorage));
            });
            //页面刷新的时候再去本地存储里面获取数据
            var commentStorage;
            if(JSON.parse(window.localStorage.getItem(keyName))){
                //已经评论过了先把以前的评论加载到页面上
                var oldCommentData=JSON.parse(window.localStorage.getItem(keyName));
                commentStorage=oldCommentData;
                var oldCommentHTML=template("newComments",oldCommentData);
                $(".ui-border-b").parents("ul").append(oldCommentHTML);
            }else{
                //第一次添加评论
                commentStorage={"result":[]};
            }
            //点击出现库存状态
            var count = 1;
            $("#storeBtn").on("click", function () {
                $(".store").toggleClass("active");
                if (count % 2 === 1) {
                    this.innerHTML = "当前库存状态";
                } else {
                    this.innerHTML = "点击产看库存";
                }
                count++;
                setTranslateY(0);
            });
            var links = $("#disstorck").find("a");
            for (var i = 0; i < links.length; i++) {
                links[i].onclick = null;
            }
            //当在查看库存状态时，页面禁止滑动
            $(window).on("touchstart", function (e) {
                /*if($("#disstorck li a").indexOf(e.target)!=-1){
                 console.log(1);
                 }*/
                /*console.log($("#disstorck li a"));
                 console.log(e.target);*/
                //console.log(" ".indexOf.apply($("#disstorck li a")[0], $(e.target)));
                if ((" ".indexOf.apply($("#disstorck li a")[0], $(e.target)) != -1) || (" ".indexOf.apply($("#disstorck li span")[0], $(e.target)) != -1) || (" ".indexOf.apply($("#disstorck li strong")[0], $(e.target)) != -1)) {
                    $("body").on("touchmove", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                } else {
                    $("body").off("touchmove");

                }
            });
            //实现查看库存
            //定义变量，获取数据
            var parentBox=document.querySelector(".store");
            var childBox=parentBox.querySelector("#disstorck");
            var parentHeight;
            var childHeight=childBox.offsetHeight;
            var maxY=0;
            var minY;
            var maxSwipe=maxY+100;
            var minSwipe;
            //设置参数
            var startY = 0;
            var moveY = 0;
            var distanceY = 0;
            var currY = 0;
            //实现页面滑动
            //公用的方法
            var addTransition = function(){
                childBox.style.webkitTransition = "all .2s";
                childBox.style.transition = "all .2s";
            }
            var removeTransition = function(){
                childBox.style.webkitTransition = "none";
                childBox.style.transition = "none";
            }
            var setTranslateY = function(y){
                childBox.style.webkitTransform = "translateY("+y+"px)";
                childBox.style.transform = "translateY("+y+"px)";
            }
            //绑定事件
            childBox.addEventListener('touchstart',function(e){
                startY = e.touches[0].clientY;
                //只有当库存框出来后，才能获取到正确的库存框的高度值
                parentHeight=parentBox.offsetHeight;
                minY=parentHeight-childHeight;
            });
            childBox.addEventListener('touchmove',function(e){
                moveY = e.touches[0].clientY;
                distanceY = moveY-startY;
                minSwipe=minY-100
//                    console.log(distanceY);
                /*清除过度*/
                removeTransition();
                /*设置定位*/

                if((currY + distanceY) < maxSwipe &&　(currY + distanceY) > minSwipe){
                    setTranslateY(currY + distanceY);
                }
            });
            window.addEventListener('touchend',function(){
                if(( currY + distanceY)>maxY){
                    currY = maxY;
                    addTransition();
                    setTranslateY(currY);
                }
                else if(( currY + distanceY)<minY){
                    currY = minY;
                    addTransition();
                    setTranslateY(currY);
                }
                else{
                    currY = currY + distanceY;
                }
                startY = 0;
                moveY =0;
                distanceY = 0;
            });
        }
    });
});
//返回
$(function(){
    $(".top_header a:nth-child(1)").on("click",function(){
        window.history.back(-1);
    })
});
