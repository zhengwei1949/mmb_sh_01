/**
 * Created by Jepson on 2016/11/29.
 */
(function() {
    /* 提出 URL 以备生成工具类 或 提取接口 集中管理 */
    var URL = {
        // 获取国内折扣商品信息     传参：productid
        getinlanddiscount : routeURL.getinlanddiscount
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        renderMprolist( URL.getinlanddiscount );
    })();

    function renderMprolist( url ) {
        tools.getData( url, {}, function( data ) {
            // 渲染展示模板
            $('.mproduct').html(template( 'tempMprolist', data ) );
        });
    }
}());