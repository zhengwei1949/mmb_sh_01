window.onload = function () {

    //导航栏&&商品栏
    cab_nav_shop();
    //swipe插件(滑动)调用
    Swipe();
};

//导航栏&&商品栏S
function cab_nav_shop() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        // url: 'http://localhost:9090/api/getbaicaijiatitle',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            var cab_nav_html = template('cab_nav_art', data);
            $('.cab_nav_box').html(cab_nav_html);
            ajaxShop(0);
            $('.cab_nav_box li').click(function () {
                var titleid=this.getAttribute('titleid');
                ajaxShop(titleid) ;
            });
        }
    });
}

//用ajax方法获取商品栏信息方法封装
function ajaxShop(titleid) {
    $.ajax({
        // url: 'http://localhost:9090/api/getbaicaijiaproduct',
        url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
        // url: 'http://192.168.13.81:9090/api/getbaicaijiaproduct',
        type: 'get',
        dataType: 'json',
        data: {titleid: titleid},
        success: function (data) {
            var cab_shop_html = template('cab_shop_art', data);
            $('.cab_shop').html(cab_shop_html);
        }
    });
}
//导航栏&&商品栏E

//swipe插件(滑动)调用
function Swipe() {
    /*通过封装的swipe插件来实现*/
    itcast.iScroll({
        swipeDom: document.querySelector('.cab_nav'), /*父容器对象*/
        swipeType: 'x', /*滑动的方向*/
        swipeDistance: 80/*缓冲的距离*/
    });
}
