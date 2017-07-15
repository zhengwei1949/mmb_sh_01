/**
 * Created by Jepson on 2016/11/26.
 */

(function() {
    /* 提出 URL 以备生成工具类 或 提取接口 集中管理 */
    var URL = {
        // 根据分类的id获取分类的名称 ?categoryid = ..
        getcategorybyid: routeURL.getcategorybyid,
        // 根据 productid 获取商品详情
        getproduct: routeURL.getproduct,
        // 根据 productid 获取商品评论
        getproductcom: routeURL.getproductcom
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        // 使用公共函数类 tools的 query 方法 解析成 对象
        if ( !location.search ) return;
        var obj = location.search ? tools.query( location.search ) : { productid : 0 , categoryid : 0 };
        /* 通过 url 和 categoryid 渲染 三级导航栏 */
        renderMdaohang( URL.getcategorybyid, obj );
        /* 渲染 product 产品 */
        renderMproduct( URL.getproduct, obj );
        /* 渲染 mpingjia 产品评论 */
        renderMpingjia( URL.getproductcom, obj );
    })();

    /* 通过 url 和 categoryid 渲染 三级导航栏 */
    function renderMdaohang( url, obj ) {
        var categoryid = obj['categoryid']; // 产品分类 id
        if ( categoryid == undefined ) return;
        // 获取标题栏数据渲染 分类导航
        tools.getData( url, { categoryid: categoryid }, function( data ) {
            if( !data ) return;
            $('.mdaohang .cate').html(data['result'][0]['category'] + ' > ').attr('href', "productlist.html?categoryid="+categoryid );
        });
    }

    /* 渲染 product 产品 */
    function renderMproduct( url, obj ) {
        var productid = obj['productid']; // 产品ID
        if( productid == undefined ) return;
        tools.getData( url, { productid: productid }, function( data ) {
            if ( !data ) return;
            // 设置导航标题
            $('.mdaohang .pro').text(data['result'][0]['productName'].trim().split(' ')[0]);
            // 渲染商品信息
            $('.mprodetail').html( template( 'tempMprodetail', data ) );
            // 渲染比价购买
            $('.bjnote').html( data['result'][0]['bjShop'] );
        });
    }

    /* 渲染 productcom 产品评价 */
    function renderMpingjia( url, obj ) {
        var productid = obj['productid']; // 产品ID
        if( productid == undefined ) return;
        tools.getData( url, { productid: productid }, function( data ) {
            if ( !data ) return;
            $('.mpingjia').html( template( 'tempMpingjia', data ) );
        });
    }
})();
