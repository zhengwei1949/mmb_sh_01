/**
 * Created by King on 2016/11/23.
 */
// $(function () {
//     $.ajax({
//         url: 'http://127.0.0.1:9090/api/getindexmenu',
//         data: {},
//         type: 'get',
//         dataType: 'json',
//         success: function (data) {
//             var html = template('item', data);
//             $('.mainnav').html(html);
//             $('.mainnav .list li:nth-last-child(-n+4)').addClass('hide');
//             $('.mainnav .list li:nth-child(8)').on('click',function () {
//                 $('.mainnav .list li:nth-last-child(-n+4)').toggleClass('hide');
//             })
//         }
//     });
// })

$(function () {
    $('.mainnav .list li:nth-last-child(-n+4)').addClass('hide');
    $('.mainnav .list li:nth-child(8)').on('click',function () {
        $('.mainnav .list li:nth-last-child(-n+4)').toggleClass('hide');
    })

    $.ajax({
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var html = template('goods', data);
            $('.shopping').html(html);
        }
    })
})
$(function () {
    $('.top').on('click',function () {
        document.body.scrollTop=0;
    })
})
