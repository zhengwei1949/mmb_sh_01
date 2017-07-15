/**
 * Created by Administrator on 2016/11/22.
 */
$(function () {
    var titleName = getData('name');
    $('header h4').text(titleName);
    function ajax(url, data, callback) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            data: data,
            success: function (data) {
                callback && callback(data)
            },
            error: function () {
                alert("服务器端错误");
            }
        });
    };

    function pageNum() {
        ajax(url() + "/api/getmoneyctrl", {"pageid": i}, function (data) {
            var html = template("sqk_template", data);
            $(".sqk_main").html(html);
        });
    };
    function change(num) {
        $('#sqk_sel option:eq(' + num + ')').attr('selected', 'selected').siblings().removeAttr('selected');
        $('#sqk_sel').change();
    }

    //首次动态加载页面；
    ajax(url() + "/api/getmoneyctrl", {}, function (data) {
        var html = template("sqk_template", data);
        $(".sqk_main").html(html)
        var $pageNum = Math.floor($(data.totalCount)[0] / $(data.pagesize)[0]);
        for (var i = 0; i < $pageNum; i++) {
            var option = document.createElement("option"),
                sqk_sel = document.getElementById("sqk_sel");
            option.innerHTML = (i + 1) + "/" + $pageNum;
            option.setAttribute("value", i);
            sqk_sel.appendChild(option);
        }
    });
    //点击上一页出现对应页面；
    $(".previous").on("click", function () {
        var i = parseInt($('#sqk_sel').val());
        change((i -= 1));
        console.log(i);
    });
    //点击下一页出现对应页面；
    $(".next").on("click", function () {
        var i = parseInt($('#sqk_sel').val());
        change((i += 1))
    });
    //手动改变加载页面；
    $('#sqk_sel').on("change", function () {
        var pageid = parseInt($('#sqk_sel').val()) + 1;
        ajax(url() + "/api/getmoneyctrl", {"pageid": pageid}, function (data) {
            var html = template("sqk_template", data);
            $(".sqk_main").html(html);
        });
    });

    returnTop('#reTop');
});


