/**
 * Created by liuxiu on 2016/11/25.
 */

var p='192.168.13.52:9090';
var a='192.168.191.1:9090';
var w='mmb.ittun.com';
$(function () {
    //��ȡ������������
    ajax("http://"+ a +"/api/getindexmenu", "get", "json", {}, function (data) {
        var navListdata = template('navList', data);
        $(".nav").html(navListdata);

        //��������������Ч��
        var ifOpen = false;
        var navTop = $(".nav").height();
        //console.log($('#7'));
        $("ul li:nth-child(8)").on("click", function () {
            if (!ifOpen) {
                $(".nav").height(navTop * 3 / 2);
                ifOpen = true;
            } else {
                $(".nav").height(navTop);
                ifOpen = false;
            }
        });

        $('.nav a').eq(0).attr('href','../dong/product-list.html');
        $('.nav a').eq(1).attr('href','../dong/shengqiankong.html');
        $('.nav a').eq(2).attr('href','../xu/discount.html');
        $('.nav a').eq(3).attr('href','../c/baicai.html');
        $('.nav a').eq(5).attr('href','./discount-page.html');
        $('.nav a').eq(8).attr('href','../c/coudan.html');
        $('.nav a').eq(10).attr('href','../w/shangpindaohang.html');
        $('.nav a').eq(11).attr('href','../w/pinpaidaquan.html');
    });







//�����ͷ���򶥲�
    $(".iconfonts").click(function () {
        $("html,body").animate({scrollTop: 0}, 500)
    });

//��ȡ��ֵ�ۿ��Ƽ�����
    ajax("http://mmb.ittun.com/api/getmoneyctrl", "get", "json", {}, function (data) {
        var productdata = template('product', data);
        $(".product_list").html(productdata);

    });

});


//��װajax����
function ajax(url, type, dataType, data, callback) {
    $.ajax({
        url: url,
        type: type,
        dataType: dataType,
        data: data,
        success: function (data) {
            callback && callback(data);
        }
    });
}
