/**
 * Created by Administrator on 2016/11/28.
 */
window.onload = function(){
    getDate();
    getProduct();
}
//获取菜单栏数据
function getDate(){
    $.ajax({
        //url:'http://127.0.0.1:9090/api/getindexmenu',
        url:url.pc+'getindexmenu',
        //url:'http://192.168.13.80:9090/api/getindexmenu',
        //url:url.phone+'getindexmenu',
        data:{},
        dataType:'json',
        success:function(data){
            var cc_menu=document.getElementById('cc_menu');
            //template模板
            var html = template('template',data);
            //渲染到页面中
            cc_menu.innerHTML=html;

            getMenu();
        }
    });
}

//菜单栏动画效果
function getMenu() {
    var menu = $('.cc_menu>ul>li:gt(7)');
    menu.hide();
    var moreBtn = $('.cc_menu>ul>li:eq(7)');
    moreBtn.click(function () {
        //方法一
        //if(menu.is(':visible')){
        //    menu.hide();
        //}else{
        //    menu.show();
        //}
        //方法二：在sledeUp和sledeDown之间切换
        $(menu).slideToggle(300);


        var $moreBtn7 = $('.cc_menu>ul>li:eq(7)>a');
        if($moreBtn7){
            $moreBtn7[0].href='#';
        }
    });
}
//获取商品列表数据
function getProduct() {
    $.ajax({
        //url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        url:url.pc+'getmoneyctrl',
        //url: 'http://192.168.13.80:9090/api/getmoneyctrl',
        //url:url.phone+'getmoneyctrl',
        data: {},
        dataType: 'json',
        success: function (data) {
            var goods_list = document.getElementById('goods_list');
            //template模板
            var productList = template('productList', data);
            //渲染到页面中
            goods_list.innerHTML = productList;
            //console.log(data.result);
        }
    });
}



