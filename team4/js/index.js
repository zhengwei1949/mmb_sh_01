/**
 * Created by chenlei on 2016/11/22.
 */
$(function(){
    //获取菜单栏数据,nav栏
    ajax(getUrl()+"getindexmenu","get","json",{},function(data) {
        var navLisHtml = template('navLis', data);
        $(".nav").html(navLisHtml);
        //给图标添加旋转效果

        // 添加点击效果
        var ifOpen = false;
        var navH = $(".nav").height()*1.05;
        $("#7").on("click",function(){
            if(!ifOpen) {
                $(".nav").height(navH * 3 / 2);
                ifOpen = true;
            } else {
                $(".nav").height(navH);
                ifOpen = false;
            }
        });
    })

    //获取折扣推荐
    ajax(getUrl()+"getmoneyctrl","get","json",{},function(data) {
        var discountHtml = template('discount',data);
        $(".goods_list").html(discountHtml);
    })
})
//封装ajax请求
function ajax(url,type,dataType,data,callback) {
    $.ajax({
        url:url,
        type:type,
        dataType:dataType,
        data:data,
        success:function(data){
            callback&&callback(data);
        }
    })
}



