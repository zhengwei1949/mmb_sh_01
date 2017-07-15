/**
 * Created by Jepson on 2016/11/24.
 */
(function () {
    /* 提出 URL 以备生成工具类 集中管理 */
    var URL = {
        getindexmenu : routeURL.getindexmenu,
        getmoneyctrl : routeURL.getmoneyctrl
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        /* 渲染导航栏并添加功能 */
        renderMnav( URL.getindexmenu );
        /* 渲染超值折扣 */
        renderMproduct( URL.getmoneyctrl );
    })();

    /* 渲染导航栏并添加功能 */
    function renderMnav( url ) {
        tools.getData( url, {}, function( data ) {
            if ( !data ) return;
            /* 使用 template 渲染页面 */
            $('.mnav').html( template( 'tempMnav', data ) );
            showMore(); // 添加展示更多的功能
        });

        /* 功能:展示更多 */
        function showMore() {
            $('.mnav li').eq(7).on('click',function() {
                $('.mnav-list').toggleClass('contains');
                return false;
            });
        }
    }

    /* 渲染超值折扣 */
    function renderMproduct( url ) {
        tools.getData( url, {}, function( data ) {
            if ( !data ) return;
            /* 使用 template 渲染页面 */
            $('.mpercent > .mpro-list').html( template( 'tempMproduct', data ) );
        });
    }
})();
