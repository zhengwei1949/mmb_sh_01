/**
 * Created by yangxu on 2016/11/23.
 */
$(function () {
    //菜单部分数据请求
    var menu = document.querySelector(".menu ul");
    $.ajax({
        url: "http://127.0.0.1:9090/api/getindexmenu",
        data: {},
        type: "get",
        dataType: "json",
        success: function (data) {
            var li, link, span;
            var index=0;
            for (var i = 0; i < data.result.length; i++) {
                li = document.createElement("li");
                $(menu).append(li);
                link = document.createElement("a");
                link.href = data.result[i].titlehref;
                $(link).html(data.result[i].img);
                $(li).append(link);
                span = document.createElement("span");
                span.innerHTML = data.result[i].name;
                $(link).append(span);
                //菜单部分点击加载更多
                if(index===7){
                    $(link).on("click", function () {
                        $(menu).toggleClass("active");
                    });
                }
                index++;
            }
        }
    });
});
$(function () {
    //页面内容部分数据请求
    $.ajax({
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        data: {},
        type: "get",
        dataType: "json",
        success: function (data) {
            var comCout,tag;
            var html="";
            for (var i = 0; i < data.result.length; i++) {
                comCout=/\d+/.exec(data.result[i].productComCount);
                tag = '<li class="clearfix">' +
                    '<a href="" class="image fl">' +
                    data.result[i].productImg2 +
                    '</a>' +
                    '<div class="fl pro_info">' +
                    '<a href="#" class="pro_name">' +
                    '' + data.result[i].productName + '<span class="price">' + data.result[i].productPinkage + '</span>' +
                    '</a>' +
                    '<div class="pro_time">' +
                    '<p>' + data.result[i].productFrom + ' | ' + data.result[i].productTime + '</p>'+
                    '<div class="pro_comment">' +
                    '<span class="iconfont icon-liuyan"></span>' +
                    '<span class="quantity">'+comCout+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                html+=tag;

            }
            $(".products").html(html);
        }
    });
});
$(function(){
    $(".brand").on("click",function(){
        location.href="brandTitle.html";
    })
});

