/**
 * @Author: syy
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   syy
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function(){


    //����Ʒ������
    readyGo(
        'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbrandtitle'],
        null,
        function(data){
        var t=template('hot',data);
        $('.b_list').html(t);

        //�������Ʒ����ת��Ʒ�Ƶ�ʮ������
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

                        //��Ʒ���������У�Ĭ��ҳ��չʾ4��
                        readyGo(
                            'http://'+ tool.baseURL +':'+ tool.basePort + tool.apiHub['getbrandproductlist'],
                            {brandtitleid:data["result"][v]["brandTitleId"],pagesize:4},
                            function(data){
                                var t=template('rank',data);
                                $('.b_list').html(t);

                                //�������ǰ�������ݣ������������أ���Ӧ��������ʾ
                                $('.b_list .r_sort').click(function(){
                                    var index= $(this)[0].dataset["productid"];
                                    //������ҳ����Ⱦ
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
    /* ���˺��� */
    function readyGo(url,datacode,callback) {
        $.getJSON(url,datacode, function (data) {
            callback(data);
        });
    }
});