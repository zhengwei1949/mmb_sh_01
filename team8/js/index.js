/**
 * Created by admin on 2016/11/22.
 */
(function () {

    //渲染页面函数
    renderHTML();
    /* renderHtml 渲染页面主函数 */
    function renderHTML() {
        renderMenu(URL.getMenu);
        renderDiscount(URL.getDiscount);

        /*渲染菜单栏*/
        function renderMenu(url) {
            /*获得数据渲染到HTML中*/
            tools.getData(url, {},function (data) {
                var html = template("classifyTmp", data);
                $(".classify").html(html);
                moreMenu();
            });
            /*设置更多按钮点击加载下一行数据，默认隐藏*/
            function moreMenu() {
                var more = $(".area-item:eq(7)");
                $(".classify").find('a:gt(7)').hide();
                more.on("click", function () {
                    $(".classify").find('a:gt(7)').slideToggle(200);
                });
            }
        }
        /*渲染超值折扣推荐*/
        function renderDiscount(url) {
            tools.getData(url, {},function (data) {
                var html = template("productTmp", data);
                $(".productBox").html(html);
            });
        }
    }
})();



/*回顶部*/
/*function pageScroll() {
 window.scrollBy(0,-10);
 scrolldelay = setTimeout('pageScroll()',100);
 if(document.documentElement.scrollTop==0) clearTimeout(scrolldelay);
 }*/
/*<a href="pageScroll();">注册</a>*/
