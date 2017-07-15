/**
 * Created by Administrator on 2016/11/26.
 */
$(function () {
    //这是点击返回顶部的js的缓动动画
    $("aside,#fan").click(function () {
        $("html,body").animate({scrollTop: 0}, 500)
    });
    $(".nav_b,#fan").click(function () {
        $("html,body").animate({scrollTop: 0}, 500)
    });
    $(".nav_b,#fan1").click(function () {
        $("html,body").animate({scrollTop: 0}, 500)
    });
    //这是当导航下拉时,点击屏幕其他位置时候也自动收缩起来
    $("main").click(function () {
        $('#info,#info1').hide();
    })

    var flag = true;

    //a,b是为了将各个请求返回的id提取出来转化转化成全局变量方便下面的调用,也起到默认值的作用
    var a = 0;
    var b = 0;
    var c = null;
    //导航栏第一次请求
    $.ajax({
        url: 'http://mmb.ittun.com/api/getgsshop',
        data: {},
        dataType: 'json',
        success: function (data) {
            c = data.result[ 0 ].shopId;
            $('#info').html(template('result1', data));
            //这里为了让导航下拉默认选中第一个
            $('#info li:first-child').find('s').addClass("active");
            $('.nav_m ul li:nth-of-type(1)').click(function () {

                $('#info1').hide();
                $('#info').show();
                $('#info>li').each(function (k, v) {
                    //console.log(k+"----"+v);
                    v.onclick = function () {
                        a = data.result[ this.id ].shopId;
                        //这里为了选中的高亮，其它的移除属性
                        $('#info>li').find('s').removeClass("active");
                        $(this).find('s').addClass("active");
                        $('.nav_m ul li:nth-of-type(1)').html($(this).html() + '<i></i>');
                        $('#info').hide();


                        $.ajax({
                            url: "http://mmb.ittun.com/api/getgsproduct",
                            data: {shopid: a, areaid: b},
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                $('#info2').html(template('result3', data));

                            }
                        })


                    }
                })

            })
        }

    });

    //导航栏第二次请求
    $.ajax({
        url: 'http://mmb.ittun.com/api/getgsshoparea',
        data: {},
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            $('#info1').html(template('result2', data));
            $('#info1 li:first-child').find('s').addClass("active");
            $('.nav_m ul li:nth-of-type(2)').click(function () {


                $('#info').hide();
                $('#info1').show();
                $('#info1>li').each(function (k, v) {
                    //console.log(k+"----"+v);
                    v.onclick = function () {
                        b = data.result[ this.id ].areaId;

                        $('#info1>li').find('s').removeClass("active");
                        $(this).find('s').addClass("active");

                        //这里为了点击导航栏下拉，选中一个替换原有导航栏的名字
                        $('.nav_m ul li:nth-of-type(2)').html($(this).text().slice(0, 2) + "<i></i>");
                        $('#info1').hide();

                        $.ajax({
                            url: "http://mmb.ittun.com/api/getgsproduct",
                            /*这里根据API文档的要求传入两个值;因为默认值两个都有了值，
                             *所以可以在下次的时候只改变一个属性实现跳转了*/
                            data: {shopid: a, areaid: b},
                            dataType: "json",
                            success: function (data) {
                                console.log(data);

                                $('#info2').html(template('result3', data));
                            }
                        })

                    }
                })

            })
        }

    });
    //发送两个请求返回的参数，并返回行的参数进行渲染
    $.ajax({
        url: "http://mmb.ittun.com/api/getgsproduct",
        /*这里根据API文档的要求传入两个值;因为默认值两个都有了值，
         *所以可以在下次的时候只改变一个属性实现跳转了*/
        data: {shopid: a, areaid: b},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#info2').html(template('result3', data));

        }
    });


})

