/**
 * Created by Jepson on 2016/11/25.
 */
(function () {
    /* 提出 URL 以备生成工具类 集中管理 */
    var URL = {
        // 根据分类的id获取分类的名称 ?categoryid = ..
        getcategorybyid: routeURL.getcategorybyid,
        // 需要传参 categoryid 商品分类 id 和 pageid 页数(不传默认第一页)
        getproductlist: routeURL.getproductlist
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        // 使用公共函数类 tools的 query 方法
        // 解析 search 获取参数 对象  categoryid=x pageid=y
        var obj = location.search ? tools.query( location.search ) : { categoryid : 0 };
        /* 通过 url 和 categoryid 渲染 三级导航栏 */
        renderMdaohang( URL.getcategorybyid, obj );
        /* 渲染商品列表 并 添加切页功能 */
        renderMproductlist( URL.getproductlist, obj );
    })();

    /* 通过 url 和 categoryid 渲染 三级导航栏 */
    function renderMdaohang( url, obj ) {
        var categoryid = obj['categoryid'] || 0;
        // 获取标题栏数据渲染
        tools.getData( url, { categoryid: categoryid }, function( data ) {
            if( !data ) return;
            $('.mdaohang').html(template('tempMdaohang', data ));
        });
    }

    /* 渲染商品列表 并 添加切页功能 */
    function renderMproductlist( url, obj ) {
        // 规范请求数据格式，pageid 默认 为 1, 当前第几页
        var categoryid = Number(obj['categoryid'] || 1);
        var pageid = Number(obj['pageid'] || 1);
        // 渲染页面
        render();
        /* 通过 分类id page id 渲染页面并添加分页功能 */
        function render() {
            tools.getData( url, obj, function( data ) {
                if( !data ) return;
                /* 加上 分类 id，在商品中加上，跳转页面用 */
                data.categoryid = obj['categoryid'];
                /* 渲染页面 */
                $('.productlist').html(template('tempMproductlist',data));
                /* 添加分页功能 */
                tools.fenye({
                    pageNum : Math.ceil( data['totalCount'] / data['pagesize'] ),   // 总计几页
                    extraStr: '&categoryid=' + obj['categoryid']   // 额外传参
                });
            });
        }
    }
})();


