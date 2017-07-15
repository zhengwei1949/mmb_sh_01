/**
 * Created by Jepson on 2016/11/29.
 */
(function() {
    /* 提出 URL 以备生成工具类 或 提取接口 集中管理 */
    var URL = {
        // 获取国内折扣商品信息     传参：productid
        getdiscountproduct : routeURL.getdiscountproduct
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        // 使用公共函数类 tools的 query 方法
        // 解析 search 获取参数 对象  productid : x
        var obj = location.search ? tools.query( location.search ) : { productid : 0 };
        /* 通过 url 和 productid 渲染 三级导航栏 */
        renderProduct( URL.getdiscountproduct, obj );
    })();

    function renderProduct( url, obj ) {
        var productid = obj['productid'] || 0;
        tools.getData( url, { productid : productid }, function( data ) {
            if( !data ) return;
            // 设置三级导航名称
            $('.mdaohang .pro').html(data['result'][0]['productName']);
            // 渲染展示模板
            $('.mproductshow').html(template( 'tempMproduct', data ) );
        });
    }
}())