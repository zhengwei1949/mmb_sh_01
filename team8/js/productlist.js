/**
 * Created by admin on 2016/11/26.
 */
(function () {

    renderHTML();
    function renderHTML() {

        /*获取导航栏数据渲染页面*/
        renderNav();
        function renderNav() {
            /*获取当前页面的data值*/
            /*需要解析当前页面获取的URL数据，获取后返回对象*/
            var categoryid = tools.query(location.search).categoryid;
            tools.getData(URL.getproNav, {categoryid: categoryid}, function (data) {
                var html = template("proNav", data);
                $('.pronavLinks').append(html);
                renderProShow();
            });
        }

        /*声明一个全局的作用域的pageid*/
        var pageId = 1;  /*当前页数*/
        var allpage;      /*总共页数*/
        var categoryid;
        /*获取内容展示区域数据渲染页面*/
        function renderProShow() {
            /*获取当前页面的data值*/
            categoryid = tools.query(location.search).categoryid;
            //如果有data就不执行tools.getData
            tools.getData(URL.getproList, {categoryid: categoryid}, function (data) {
                //保存data数据
                var html = template("proListShow", data);
                $('.proListShow').html(html);
                allpage = Math.ceil(data.totalCount / data.pagesize);
                if ($('.pageSelect').html() == '') {
                    for (var i = 1; i <= allpage; i++) {
                        $('<option value=' + i + '>' + i + '</option>').appendTo($('.pageSelect'));
                    }
                }
            });
        }
        /*设置底部数据select加载页面显示*/
        pageClick();
        function pageClick() {
            $(".pageSelect").change(function () {
                pageId = $(this).val();
                renderProShow();
                function renderProShow() {
                    /*获取当前页面的data值*/
                    categoryid = tools.query(location.search).categoryid;
                    //如果有data就不执行tools.getData
                    tools.getData(URL.getproList, {categoryid: categoryid, pageid: pageId}, function (data) {
                        //保存data数据
                        var html = template("proListShow", data);
                        $('.proListShow').html(html);
                    });
                }
            });
        }

        /*设置底部上一页下一页加载数据*/
        pageUpDown();
        pageId = 1;
        function pageUpDown() {
            /*上一页*/
            $('.pageUp').on('click', function () {
                if(pageId>1){
                    pageId--;
                }
                $(this).parent().find(".pageSelect").val(pageId);
                $(".pageSelect").trigger("change");

            });
            /*上一页*/
            $('.pageDown').on('click', function () {
                if(pageId<allpage){
                    pageId++;
                }
                $(this).parent().find(".pageSelect").val(pageId);
                $(".pageSelect").trigger("change");
            });
        }
    }
})();