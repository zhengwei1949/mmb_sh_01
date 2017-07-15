
$(function () {

    getTitle();
    getPro();

    /* 获取菜单名称 */
    function getTitle() {
        //获取存储在缓存中的相关数据，以便根据对应的数据发送请求,获取数据
        var categoryId = window.localStorage.getItem( 'categoryId' );
        categoryId = +categoryId;
        $.ajax({
            url:'http://'+net.url+':9090/api/getcategorybyid',
            type:'get',
            dataType:'json',
            data: { categoryid: categoryId},
            success:function( data ){
                data = data.result;
                //设置标题并绑定ID
                $('.category ').html( data[0].category + ' ' ).attr('categoryId', categoryId );
            }
        });
    }

    /* 获取商品信息 */
    function getPro() {
        var productId = window.localStorage.getItem('productId');
        productId = +productId;
        $.ajax({
            url:'http://'+net.url+':9090/api/getproduct',
            type:'get',
            dataType:'json',
            data: { productid: productId},
            success:function( data ){
                data = data.result;
                $(".currentCategory").html( (data[0].productName.split(' '))[0] );      //截取商品主要名称当做标题
                $(".product > .title").html( data[0].productName );                     //详细名称
                $(".pic").prepend( data[0].productImg );
                $(".shop").html( data[0].bjShop );
                getComment( data[0].productId );                                        //根据数据对应商品ID获取评论
            }
        });
    }


    function getComment( productId ) {
        $.ajax({
            url:'http://'+net.url+':9090/api/getproductcom',
            type:'get',
            dataType:'json',
            data: { productid: productId},
            success:function( data ){
                data = data.result;
                //动态生成html结构
                var commentList = '';
               for ( var i = 0; i < data.length; i++ ){
                   commentList += '<div class="commentlist">' +
                                  '<table width="100%">' +
                                  '<tbody>' +
                                  '<tr>' +
                                  '<td class="name" align="left">' + data[i].comName + '</td>' +
                                  '<td align="right" >'+ data[i].comTime +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td></td>'  +
                                  '<td align="right" >'+ data[i].comFrom +'</td>' +
                                  '</tr>'+
                                  '<tr>' +
                                  '<td colspan="2" class="comcont" >'+ data[i].comContent +'</td>' +
                                  '</tr>' +
                                  '</tbody>'+
                                  '</table>'+
                                  '</div>';
               }
               $("section").html( commentList );
            }
        });
    }

    /* 返回顶部 */
    $('#backToTop').click(function () {
        //console.log( document.body.scrollTop );
        document.body.scrollTop = 0;
    });

    /* 底部APP推广关闭动画 */
    $('body').css('padding-bottom', '50px');
    $('.app_promotion a.close').click(function () {
        $('.app_promotion').fadeOut(function () {
            $('body').css('padding-bottom', '0');
        });
    });
});
