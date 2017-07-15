/**
 * Created by leiyutian on 2016/11/23.
 */
$(function(){
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=')+1,url.length);
    $.ajax({
        get:'get',
        url:'http://127.0.0.1:9090/api/getbrand?brandtitleid='+loc,
        dataType:'json',
        success:function(data){
            var reg = data.result[0].brandName
            var str = reg.substring(reg.length-4);
            //console.log(str);
            $('.product_hot_tlt>span').text(str);
            $('.nav_index>.nav-list-3').find('span').text(str);

            $('.product_hot_info').append(template('gsbrand',data));

            $.ajax({
                get:'get',
                url:'http://127.0.0.1:9090/api/getbrandproductlist?brandtitleid='+loc,
                dataType:'json',
                success:function(data){
                    var html1 = template('gstv',data);
                    $('#gstvrank').get(0).innerHTML = html1;
                    var index = 0;
                    var dtimg = $('.product_rank').eq(0).attr('dt-img');
                    var ptname = $('.product_rank').eq(0).attr('pt-name');

                    $('.product_rank').click(function(){
                        index = $(this).attr('data-productid');
                        dtimg = $(this).attr('dt-img');
                        ptname = $(this).attr('pt-name');
                        $('.product_hot_score').remove('.product_score');
                        $.ajax({
                            get:'get',
                            url:'http://127.0.0.1:9090/api/getproductcom',
                            dataType:'json',
                            data:{productid:index},
                            success:function(data){
                                $('.product_hot_score').html(template('gsscore',data));
                                $('.product_hot_score>li>h4').text(ptname);
                                $('.product_hot_score>li>a').html(dtimg);
                            }
                        })
                    })
                    $.ajax({
                        get:'get',
                        url:'http://127.0.0.1:9090/api/getproductcom',
                        dataType:'json',
                        data:{productid:index},
                        success:function(data){

                            $('.product_hot_score').html(template('gsscore',data));
                            $('.product_hot_score>li>h4').text(ptname);
                            $('.product_hot_score>li>a').html(dtimg);
                        }
                    })
                }
            })

       }
    })
})