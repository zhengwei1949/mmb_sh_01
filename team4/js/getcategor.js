/**
 * Created by ASUS on 2016/11/25.
 */
$(function () {
    function GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    var num = GetQueryString('categoryId');
    $.ajax({
        data: {categoryid: num},
        url: getUrl() + 'getcategorybyid',
        success: function (data) {
            var html = template('menu', data);
            $('.menu').find('ul').append(html);
        }

    })
    var pageNum = 1;
    $.ajax({
        data: {
            categoryid: num,
            pageid: pageNum
        },
        url: getUrl() + 'getproductlist',
        success: function (data) {
            if(!data.totalCount){
                $('.bt').hide();
            };
            var goods = template('goods', data);
            $('.goods').children('ul').html(goods);
            var pagenumber = Math.ceil(data.totalCount / data.pagesize);
            var option = '';
            for (var i = 0; i < pagenumber; i++) {
                option += '<option value=' + (i + 1) + '/' + pagenumber + '> ' + (i + 1) + '/' + pagenumber + '</option>'

            }
            $('.option').html(option);

            //chenleiÌí¼Ó




            $("select").on("change", function () {
                pageNum = this.value.substr(0, 1);
                $.ajax({
                    data: {
                        categoryid: num,
                        pageid: pageNum
                    },
                    url: getUrl() + 'getproductlist',
                    success: function (data) {
                        var goods = template('goods', data);
                        $('.goods').children('ul').html(goods);
                    }
                })
            })
            //ÉÏÒ»Ò³°´Å¥
            $(".prev").on("click", function () {
                if (pageNum > 1) {
                    pageNum--;
                }
                console.log(pageNum + 'prev');
                var total = $("select")[0].value.substr(2, 3);
                $("select")[0].value = pageNum + "/" + total;
                $.ajax({
                    data: {
                        categoryid: num,
                        pageid: pageNum
                    },
                    url: getUrl() + 'getproductlist',
                    success: function (data) {
                        var goods = template('goods', data);
                        $('.goods').children('ul').html(goods);
                    }
                })
            })
            //ÏÂÒ»Ò³µÄ°´Å¥
            $(".next").on("click", function () {
                if (pageNum < pagenumber) {
                    pageNum++;
                }
                console.log(pageNum + '----next');
                var total = $("select")[0].value.substr(2, 3);
                $("select")[0].value = pageNum + "/" + total;
                $.ajax({
                    data: {
                        categoryid: num,
                        pageid: pageNum
                    },
                    url: getUrl() + 'getproductlist',
                    success: function (data) {
                        var goods = template('goods', data);
                        $('.goods').children('ul').html(goods);
                    }
                })
            })


            var flag = true;
            $('.review').on('click', function () {
                var index = $(this).parent().parent().parent().attr('data-productId');
                $(this).parent('div').parent('div').parent('li').siblings('li').slideToggle(0);
                var that = $(this)
                if (!flag) {
                    $('.review_box').slideToggle();
                    $('this').parent().hide();
                    $('.bt').show();
                } else {
                    $.ajax({
                        url: getUrl() + 'getproductcom',
                        data: {productid: index},
                        success: function (data) {
                            $('.review_box').slideToggle();
                            $('this').parent().hide();
                            var list = template('info', data);
                            that.parent().parent().parent().append(list);
                            $('.bt').hide();
                            flag = false;
                        }
                    });
                }
                flag = !flag;
            })
        }

    })
})
