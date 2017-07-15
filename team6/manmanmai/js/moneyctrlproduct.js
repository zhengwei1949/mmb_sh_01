$(function () {
    getProduct();
    
    function getProduct() {
        //获取存储在缓存中的相关数据，以便根据对应的数据发送请求
        var productid = window.localStorage.getItem( 'productid' );
        productid = +productid;       //存储的键值均为String类型，+可改为数值类型，以符合API数据格式
        $.ajax({
            url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
            type:'get',
            dataType:'json',
            data: { productid: productid},  //发送符合API格式的数据
            success:function( data ){
               
                var productHTML = template( "temp1", data);
                $(".productinfo").html( productHTML );

                var commentHTML = template( "temp2", data);
                $("#procomment").html( commentHTML );
            }
        });
    }

    /* 返回顶部 */
    $('#backToTop').click(function () {
        //console.log( document.body.scrollTop );
        document.body.scrollTop = 0;
    });
});
