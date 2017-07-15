/**
 * Created by Administrator on 2016/11/22.
 */
$(function(){
    //var one=$('.left_product .one_img');
    //var two=$('.left_product .two_title');
    //var three=$('.left_product .three_price');
    //var four=$('.left_product .four');
    $(window).on("load",function(){
    $.ajax({
        type:"get",
        url:url.self+'/api/getinlanddiscount',
        //url:'http://mmb.ittun.com/api/getinlanddiscount',

        dataType:"json",

    success:function(data){
            console.log(data);
            //console.log(data.result[0]);
        var tag = '';
        for(var k in data.result){
            var a=data.result[k];
            console.log(a)


            tag+= ' <div class="left_product">'+
                    //即将要跳转的下一个页面的html,用一个变量名去接收另一个页面的数据值
                '<a href="discountTwo.html?productid='+data.result[k].productId+'"><img class="one_img"'+a.productImg+'</a>'
                +'<p class="two_title"> '+a.productName+'</p>'
                +'<p class=" three_price">'+a.productPrice+'</p>'
                +'<p class="four">'+a.productFrom+'</p>'
                +'</div>';

        }
        $('.up_all_product').html(tag);
        }
    })
})


    $(".up").on("click", function () {
        var timer =setInterval(function(){
            var leader = document.body.scrollTop;
            var target = 0;
            var step = (target-leader)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            leader=leader+step;
            if(leader==target){
                clearInterval(timer);
            }
            document.body.scrollTop = leader;
        },30)
        return false;
    })



})