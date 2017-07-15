/**
 * Created by admin on 2016/11/23.
 */
(function () {

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    /*渲染导航栏点击事件获取数据*/
    (function () {
        renderHtml();
    })();

    function renderHtml() {
        /*渲染页面title标题函数*/
        renderTitle(URL.getTitle, {});

        /*渲染标题title*/
        function renderTitle(url, data) {
            tools.getData(url, data, function (data) {
                var html = template("briefTitle", data);
                $(".listNav").html(html);
                //在title数据请求到后再渲染内部数据
                renderTable();
            });
        }

        /*渲染内部数据*/
        function renderTable() {
            $(".listTitle").each(function () {
                $(this).on("click",function () {
                    var self = this;  //保存当前对象
                    var mData = self.mdata || null;  // 设置缓存数据
                    $(self).find('i').toggleClass("icon-xiangshang2 icon-xiangxia2");
                    if(!mData){
                        console.log("请求数据");
                        tools.getData(URL.getTable,{titleid:$(self).attr("title")},function (data) {
                            self.mdata = data;  //缓存数据保存在当前LI中
                            var html = template("briefTable", data);
                            $(self).next("ul").html(html).slideDown(500);
                        });
                    }
                    else{
                        $(self).next("ul").slideToggle(200);
                    }
                });
            });
        }
    }

})();








/*布局二*/
/*
window.onload = function () {
    getTitle();

}

function getTitle() {
    $.ajax({
        url: "http://192.168.13.29:9090/api/getcategorytitle",
        type: "get",
        data: {},
        dataType: "json",
        success: function (data) {
            var titleData = data;
            var html = template("briefTitle", titleData);
            $(".listNav").html(html);
            category();
        }
    });
}


function category() {
    $(".listTitle").each(function () {
        $(this).on("click", function () {
            var self = this;
            var mdata = self.mdata || null; // 缓存数据
            if ( !mdata ) {
                console.log('请求数据');
                $.ajax({
                    type: "get",
                    url: "http://192.168.13.29:9090/api/getcategory",
                    data: {titleid: $(self).attr('title')},
                    dataType: "json",
                    success: function (data) {
                        self.mdata = data; // 缓存数据
                        var html = template("briefTable", data);
                        $(self).next("ul").html(html).slideDown(200);
                    }
                });
            } else {
                // 已存在数据，已渲染，直接toggle
                $(self).next("ul").slideToggle(200);
            }

        });
    });
}*/
