/**
 * Created by leiyutian on 2016/11/23.
 */
$(function(){

    $.ajax({
        get:'get',
        url:'http://127.0.0.1:9090/api/getbrandtitle',
        dataType:'json',
        success:function(data){

            var html = template('test',data);
            $('.product_list').get(0).innerHTML = html;
            $('.product_list').find('a').click(function(){

            })


        }
    })

})