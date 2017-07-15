
$(function(){
   $.getJSON('http://mmb.ittun.com/api/getinlanddiscount',function(data){
       var ul=document.querySelector('.product ul');
       $.each(data.result,function (i,v) {
           var li=$("<li></li>");
           $(li).addClass("product_list");
           $(ul).append(li);
           var a=$("<a></a>");
           $(a).attr('id',v.productId);
           $(a).attr('href',"domestic-discount-detail.html?productid="+v.productId);
           $(li).append(a);
           $(a).append(v.productImg);
           $(a).append("<h3 class='name'>"+v.productName+"</h3>");
           $(a).append("<p class='price'>"+v.productPrice+"</p>");
           $(a).append("<p>"+
                        "<span class='from'>"+v.productFrom+" &nbsp;&#124;</span>" +
                        "<span class='time'>"+v.productTime+"</span>" +
                        "</p>");


       })
   });
});
