
$(function(){

    $.ajax({
        data:{categoryid:num},
        url:'http://mmb.ittun.com/api/getproductlist',
        success:function(data){
            var goods = template('goods',data);
            $('.goods').children('ul').html(goods);
            var flag = true;
            $('.review').on('click',function(){
                var index = $(this).parent().parent().parent().attr('data-productId');
                $(this).parent('div').parent('div').parent('li').siblings('li').slideToggle(0);
                var that = $(this)
                if(!flag){
                    $('.review_box').slideToggle();
                    $('this').parent().hide();
                    $('.bt').show();
                }else{
                    $.ajax({
                        url:'http://mmb.ittun.com/api/getproductcom',
                        data:{productid:index},
                        success:function(data){
                            $('.review_box').slideToggle();
                            // $('this').parent().hide();
                            // var list = template('info',data);
                            // that.parent().parent().parent().append(list);
                            $('.bt').hide();
                            flag = false;
                        }
                    });
                }
                flag = !flag;
            });
        }

    });
});
