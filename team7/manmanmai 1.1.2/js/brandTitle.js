/**
 * @Author: syy
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   syy
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function(){


    //热门品牌排行
    readyGo(
        'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbrandtitle'],
        null,
        function(data){
        var t=template('hot',data);
        $('.b_list').html(t);

        //当点击各品牌跳转该品牌的十大排名
        $('.b_list .b_sort').click(function(){
            $('.b_list').html();
            var v=$(this).index();
            readyGo(
                'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbrand'],
                {brandtitleid:data["result"][v]["brandTitleId"]},
                function(data){
                    var t=template('top10',data);
                    $('.b_list').html(t);
                    $('.b_list .s_list').click(function(){
                        $('.b_list').html();
                        var v=$(this).index();

                        //该品牌销量排行，默认页面展示4条
                        readyGo(
                            'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbrandproductlist'],
                            {brandtitleid:data["result"][v]["brandTitleId"],pagesize:4},
                            function(data){
                                var t=template('rank',data);
                                $('.b_list').html(t);

                                //当点击当前销量内容，其他内容隐藏，对应的评论显示
                                $('.b_list .r_sort').click(function(){
                                    var index= $(this)[0].dataset["productid"];
                                    //给评论页面渲染
                                    var that=$(this);
                                    $.each(data["result"],function(i,v){
                                        readyGo(
                                            'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getproductcom'],
                                            {productid:v["productId"]},
                                            function(data){
                                                var product=v["productId"]+'';
                                                var t=template('comment',data);
                                                if(index===product){
                                                    that.append(t);
                                                }
                                            }
                                        )
                                    });
                                    $(this).find('.fr div').hide();
                                    $(this).siblings().hide();
                                })
                            }
                        );
                    })
                }
            );
        })
    });
    /* 高兴函数 */
    function readyGo(url,datacode,callback) {
        $.getJSON(url,datacode, function (data) {
            callback(data);
        });
    }
});