/**
 * Created by mac on 2016/11/25.
 */
$(function () {
    var num=window.location.search.slice(-1);
    num=+num;
    console.log(num);
    $.getJSON('http://mmb.ittun.com/api/getdiscountproduct?productid='+num,function (data){
        $.each(data.result,function (i,v) {
            var info=$("<div></div>");
            $(info).addClass("info-all");
            $(".product_detail").append(info);
            $(info).append('<h3 class="tittle">'+v.productName+'</h3>');
            $(info).append('<p class="price">'+v.productPrice+'</p>');
            $(info).append('<p><span class="from">'+v.productFrom+'</span> <span class="time">'+v.productTips+'</span><span class="tips">'+v.productTips+'</span></p>');
            $(info).append('<div class="empty"></div>');
            $(info).append('<div class="info">'+v.productInfo+'</div>');
            //物品图片
            $(info).append(v.productImg);
            $(info).append('<input type="button" value="前往购买" id="buy"> </input>');
            //二维码图片
            $(info).append(' <img src="../images/mmbweixin2.png" alt="" class="erweima">');
            //评论区
            $('.product_detail').append('<div class="comment">'+v.productComment+'</div>');

        })

    });

})
 