/*
 * @Author: liyang
 * @Date:   2016-11-27 20:52:00
 * @Last Modified by:   liyang
 * @Last Modified time: 2016-11-28 16:58:00
 */


/* 创建一个工具函数 tool  用于管理通用方法和数据 */

(function (window, undefined) {

    function tool() {
        return new tool.fn.init();
    }

    tool.fn = tool.prototype = {
        constructor: tool,
        init: function(){

        }

    };

    /* 函数及原型混入继承 */
    tool.extend = tool.fn.extend = function ( obj ) {
        for ( var k in obj ) {
            this[ k ] = obj[ k ];
        }
    };

    /*地址截取*/
    tool.extend({

        /* api接口库 */
        apiHub: {
            'getindexmenu': '/api/getindexmenu',
            'getmoneyctrl': '/api/getmoneyctrl',
            'getcategorytitle': '/api/getcategorytitle',
            'getcategory': '/api/getcategory',
            'getcategorybyid': '/api/getcategorybyid',
            'getproductlist': '/api/getproductlist',
            'getproduct': '/api/getproduct',
            'getproductcom': '/api/getproductcom',
            'getmoneyctrlproduct': '/api/getmoneyctrlproduct',
            'getinlanddiscount': '/api/getinlanddiscount',
            'getdiscountproduct': '/api/getdiscountproduct',
            'getbaicaijiatitle': '/api/getbaicaijiatitle',
            'getbaicaijiaproduct': '/api/getbaicaijiaproduct',
            'getcoupon': '/api/getcoupon',
            'getcouponproduct': '/api/getcouponproduct',
            'getgsshop': '/api/getgsshop',
            'getgsshoparea': '/api/getgsshoparea',
            'getgsproduct': '/api/getgsproduct',
            'getsitenav': '/api/getsitenav',
            'getbrandtitle': '/api/getbrandtitle',
            'getbrand': '/api/getbrand',
            'getbrandproductlist': '/api/getbrandproductlist'
        },

        /* 请求协议与域名 */
        baseURL: '127.0.0.1',

        /* 请求地址端口号 */
        basePort: '9090',

        /* 截取地址参数 getParam */
        getParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
                r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

        /* ---- renderHTML 渲染函数 ----
         *   参数说明
         *   source: 模板字符串
         *   info: 请求回来的数据
         *   selector: 渲染数据的选择器
         * */
        renderHTML: function(source, info, selector){
            var render = template.compile(source),
                html = render(info);
            $(selector).html(html)
        }

    });

    /* 构造函数原型混入 */
    tool.fn.extend({

    });

    tool.fn.init.prototype = tool.fn;

    window.tool = tool;
})(window);
