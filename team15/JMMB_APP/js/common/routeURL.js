/**
 * Created by Jepson on 2016/11/26.
 */

/* 接口地址管理 routeURL 封装 */
(function( window ) {
    function routeURL() {}

    routeURL.fn = routeURL.prototype = {
        constructor: routeURL,
        author: 'Jepson'
    };

    /* 可扩展功能 */
    routeURL.extend = routeURL.fn.extend = function( obj ) {
        for ( var k in obj ) {
            // 一般还会进行一个判断 if obj.hasOwnProperty( k )
            // 这里只是简单的 工具类，先简单来写
            this[ k ] = obj[ k ];
        }
    };

    /* 提出 URL 以备 提取接口 可以集中管理 */
    routeURL.extend( {
        baseUrl : 'http://127.0.0.1:9090'
    });

    /* 首页接口地址管理 */
    routeURL.extend( {
        // 获取首页上面菜单栏数据
        getindexmenu : routeURL.baseUrl +'/api/getindexmenu',
    });

    /* 比价搜索接口地址管理 */
    routeURL.extend( {
        // 获取分类标题
        getcategorytitle: routeURL.baseUrl +'/api/getcategorytitle',

        // 获取标题对应的分类列表          传参 titleid
        getcategory: routeURL.baseUrl +'/api/getcategory', // 需要传参 titleid

        // 获取分类的名称              传参 categoryid = ..
        getcategorybyid: routeURL.baseUrl +'/api/getcategorybyid',

        // 获取商品详情           传参 productid
        getproduct:routeURL.baseUrl +'/api/getproduct',

        // 获取商品评论           传参 productid
        getproductcom: routeURL.baseUrl +'/api/getproductcom',

        // 获取该分类的商品列表       传参 categoryid 和 pageid (不传默认第一页)
        getproductlist: routeURL.baseUrl +'/api/getproductlist'
    });


    /* 省钱控接口地址管理 */
    routeURL.extend( {
        // 获取折扣商品的列表信息   传参：pageid 不传默认返回第一页数据
        getmoneyctrl : routeURL.baseUrl +'/api/getmoneyctrl',

        // 获取省钱控商品信息     传参：productid
        getmoneyctrlproduct : routeURL.baseUrl + '/api/getmoneyctrlproduct'
    });

    /* 国内折扣接口地址管理 */
    routeURL.extend( {
        // 不传参，默认返回 20 条数据
        getinlanddiscount : routeURL.baseUrl + '/api/getinlanddiscount',
        // 获取国内折扣商品信息     传参：productid
        getdiscountproduct: routeURL.baseUrl + '/api/getdiscountproduct'
    });


    /* 品牌大全接口地址管理 */
    routeURL.extend( {
        // 所有品牌大全列表  不传参
        getbrandtitle : routeURL.baseUrl + '/api/getbrandtitle',
        // 根据品牌的标题id获取该品牌标题下的十大品牌列表
        getbrand:  routeURL.baseUrl + 'getbrand'
    });

    window.routeURL = routeURL; /* 向外暴露 routeURL */
})( window );

