$(function () {
    var status = getData("productid");
    //ajax请求数据函数
    $.ajax({
        type: 'get',
        url: url() + '/api/getdiscountproduct',
        data: {productid: status},
        dataType: 'json',
        //评论模块
        success: function (data) {
            var html = template('result', data);
            $('.domestic_main').html(html);
            //console.log(data);
            $('.tjdp').on('click', function () {
                if ($('#ctl00_ContentBody_txt_nr').val() === '') {
                    alert('没有输入内容');
                    return;
                }
                var li = document.createElement('li');
                var b = document.createElement('b');
                b.innerHTML = '删除';
                $('.list>ul').prepend(li);
                var span = document.createElement('span');
                li.appendChild(span);
                li.appendChild(b);
                span.innerHTML = $('#ctl00_ContentBody_txt_nr').val();
                $('#ctl00_ContentBody_txt_nr').val("");
                $('.list>ul li b').on('click', function () {
                    $(this).parent().remove();
                })
            });
        }
    });

    returnTop('#reTop');
})
