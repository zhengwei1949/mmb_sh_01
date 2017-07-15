/**
 * Created by 紫樱姐 on 2016/11/28.
 */
$(function () {
    returnTop('#reTop');
    $.ajax({
        type: 'get',
        url: url() + '/api/getbrandtitle',
        dataType: 'json',
        success: function (info) {
            var html = template('brandTitle', info);//第二个参数需要对象
            $('.mm_brandBox').append(html);
            /*---------------------------------------1----------------------------------------*/
            $('.mm_brandBox li').on('click', function () {
                var id = $(this).find('a').attr('id');
                //字符串截取
                var content = $(this).find('a').html();
                var txt = content.substring(0, content.length - 4);
                //$('.mm_hot').html(txt + "哪个牌子好");
                //渲染到标题栏
                //$('.sort p').html('首页>全部分类>' + txt + "哪个牌子好");
                $.ajax({
                    type: 'get',
                    data: {brandtitleid: id},
                    url: url() + '/api/getbrand',
                    dataType: 'json',//
                    success: function (info) {
                        var html = template('brandTitleId', info);//模板
                        $('.mm_brandBox').empty();//清空内容
                        $('.mm_brandBox').append(html);//渲染
                        var color = ['#F10E0E', '#FF9314', '#8ADF5B'];
                        $.each($(".mm_brandBox li b"), function (k, v) {
                            v.style.background = color[k];
                        });
                        /*-------------------------------------2---------------------------------------*/
                        $('.mm_brandBox li').on('click', function () {
                            var id = $(this).attr('id');//获取id
                            $('.mm_hot').html(txt + '产品销量排行');
                            $.ajax({
                                type: 'get',
                                data: {brandtitleid: id, pagesize: 4},
                                url: url() + '/api/getbrandproductlist',
                                dataType: 'json',
                                success: function (info) {
                                    var html = template('brandproductlist', info);
                                    $('.mm_brand').empty();//清空内容
                                    $('.mm_brand').append(html);
                                    $('.sort-last').text(txt + "哪个牌子好");
                                    /*-------------------------------------------------3---------------------------------------*/
                                    $('.mm_brand .mm_goodsbox').find('p:nth-child(3)').on('click', function (info) {
                                        $(this).parent().parent().siblings().remove();
                                        $('.mm_hot').html(txt + '最新评价');
                                        var id = $('.mm_brand .mm_goodsbox').attr('id');//获取id
                                        $.ajax({
                                            url: url() + '/api/getproductcom',
                                            data: {productid: id},
                                            dataType: 'json',
                                            success: function (info) {
                                                $('.mm_goodsbox').css('border', 0);
                                                var html = template('productid', info);
                                                $('.mm_goodstxt p:gt(0)').remove();
                                                $('.mm_brand ').append(html);
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    });
})
