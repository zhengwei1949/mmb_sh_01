/**
 * Created by Jepson on 2016/11/26.
 */

(function() {
    /* 提出 URL 以备生成工具类 或 提取接口 集中管理 */
    var URL = {
        // 获取折扣商品的列表信息   传参：pageid 不传默认返回第一页数据
        getmoneyctrl : routeURL.getmoneyctrl
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        // 解析 search 获取参数 对象  pageid=x
        var obj = location.search ? tools.query( location.search ) : { pageid : 0 };
        /* 渲染 */
        renderMproduct( URL.getmoneyctrl, obj );
    })();

    function renderMproduct( url, obj ) {
        var pageid = parseInt( obj['pageid'] || 0 ) ;
        tools.getData( url, { pageid: pageid }, function( data ) {
            if ( data ) {
                /* 渲染页面 */
                $('.mpro-list').html( template( 'tempMproduct', data ) );
                /* 添加分页功能 （自定义模板） , 传参 页数  start 0 传参 从 0 开始 */
                tools.fenye( { pageNum : Math.ceil( data['totalCount'] / data['pagesize'] ), start : 0 } );
            }
        });
    }
})();
