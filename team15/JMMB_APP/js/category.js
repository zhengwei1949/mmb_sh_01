/**
 * Created by Jepson on 2016/11/24.
 */
(function () {
    /* 提出 URL 以备生成工具类 集中管理 */
    var URL = {
        getcategorytitle: routeURL.getcategorytitle,
        getcategory: routeURL.getcategory // 需要传参 titleid
    };

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    (function () {
        /* 渲染商品列表 并 添加功能 */
        renderMcategory();

    })();

    /* 渲染商品列表 并 添加列表切换效果 */
    function renderMcategory() {
        tools.getData( URL.getcategorytitle , {}, function( data ) {
            /* 使用 template 渲染页面 */
            $('.mcategory').html( template( 'tempMcategory', data ) );

            /* 给 mbrief 添加列表切换效果 */
            mbriefSelect();
        });

        /* 给 mbrief 添加列表切换效果 */
        function mbriefSelect() {
            $('.mbrief').on('click', '.tit', function() {
                // 缓存数据
                var self = this;
                var mData = self.mData || null;
                // 如果有数据，就是渲染过了，就直接展示出来不用请求了
                if ( mData ) {
                    showSelf( self );   // 展示自己，关掉其他
                } else {
                    // 没有数据，发送 ajax 请求, 渲染模板数据，切换展示
                    tools.getData( URL.getcategory, {titleid: $(this).attr('titleid')}, function( data ) {
                        self.mData = data;
                        // 渲染自己的 info
                        $( self ).siblings('.info').html( template( 'tempMcategoryInfo', data ) );
                        showSelf( self );
                    });
                }
                // 展示自己，关掉其他
                function showSelf( self ) {
                    $( self ).siblings('.info').slideToggle(200).parent().siblings('.mbrief-list-item').children('.info').slideUp(200);
                }
            });
        }
    }
})();


