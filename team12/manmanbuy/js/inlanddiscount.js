$(function () {
    //ajax请求数据函数
    $.ajax({
        type: 'get',
        url: url() + '/api/getinlanddiscount',
        data: {},
        dataType: 'json',
        success: function (data) {
            var html = template('result', data);
            $('.domestic_main').html(html);
            console.log(data);
        }
    });

    returnTop('#reTop');
})
