$(function () {
    $.getJSON(url() + '/api/getsitenav', function (info) {
        var html = template('sitenav', info);
        //渲染页面
        $('.mm_sitenav').append(html);
    });

    returnTop('#reTop');
})
