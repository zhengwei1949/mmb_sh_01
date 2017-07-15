/**
 * Created by 宋法全 on 2016/11/29.
 */


$(function(){

    /* 判断是从首页进来的还是从折扣商品列表进来的 */
    /*  如果有参数传入 直接渲染该商品详情页面*/
    if(tool.getParam('productid')){
        toProductDetail(tool.getParam('productid'));
    }
    /* 如果无参数传入 渲染国内折扣商品列表*/
    else {
        $.ajax({
            url :'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getinlanddiscount'],
            type:'get',
            dataType:'json',
            success:function(data){
                var tag = data.result;
                var html = '' ;
                $.each(tag,function(i,k){
                    html +=
                        '<li id='+k.productId +'>'+
                        '<span class="productImg">'+k.productImg+'</span>'+
                        '<span class="productName">'+k.productName+ '</span>'+
                        '<span class="productPrice">'+ k.productPrice+'</span>'+
                        '<p class="productFrom">'+ k.productFrom+' | '+ k.productTime+'</p>'+
                        '</li>';
                });
                $('.product-detail ul').html(html);

                /* 给商品注册点击事件 */
                $('.discount li').on('click',function(){
                    toProductDetail(this.id);
                })
            }
        });
    }



    /* 渲染详情页面 */
    function toProductDetail(num){
        var html = '';
        $.ajax({
            url :'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getdiscountproduct'],
            type:'get',
            dataType:'json',
            data:{productid: num},
            success: function(data){
                var tag = data.result ;
                console.log(data);
                html=
                    '<section class="top-detail">'+
                    '<h2 class="productName">'+tag[0].productName+'</h2>'+
                    '<p class="productFrom"><a href="#">'+tag[0].productFrom+tag[0].productTime+tag[0].productTips+'</a></p>'+
                    '<p class="productInfo">'+tag[0].productInfo+'</p>'+
                    '<div class="lgimg">'+tag[0].productImg+'</div>'+
                    '</section>'+
                    '<section class="buy">'+
                    '<a href="http://item.m.jd.com/product/3133857.html">前往购买</a>'+
                    '</section>'+
                    ' <img src="images/mmbweixin2.png" class="mmbweixin2"/>'+
                    ' <section class="comments">'+tag[0].productComment+
                    '<button value="发表评论" class="push-comments"></button>'+
                    ' </section>';
                $('.product-detail').html(html);
            }
        })
    }
});


