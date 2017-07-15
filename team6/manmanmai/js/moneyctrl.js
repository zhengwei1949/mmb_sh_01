
$(function () {
    getProduct();


    function getProduct( pageId ) {
        pageId  = pageId || 1;
        $.ajax({
            url:'http://127.0.0.1:9090/api/getmoneyctrl',
            type:'get',
            dataType:'json',
            data: { pageid: pageId},  //发送符合API格式的数据
            success:function( data ){
                //根据返回数据内容计算页数
                var pageCount = Math.ceil(data.totalCount / data.pagesize);


                var productHTML = template( "temp1", data);
                $(".productList ul").html( productHTML );
                data = data.result;
                $(".productItem > a").each(function (i,v) {
                    $(this).prop('productid',data[i].productId );
                });

                //动态生成页码列表
                var pagelist;
                for (var i = 0; i < pageCount; i++) {
                    if (pageId == i+1) {
                        pagelist += '<option value="' + Number(i+1) + '" selected>' + Number(i+1) + '/' + Number(pageCount) + '</option>';
                    } else {
                        pagelist += '<option value="' + Number(i+1) + '">' + Number(i+1) + '/' + Number(pageCount) + '</option>';
                    }
                }
                $("#selectPage").html( pagelist );
                $('.productItem > a').click(function () {
                    //存储当前列表所绑定的ID,以便再跳转的页面获取到,并通过该值发送请求,获取商品列表页面
                    var key = 'productid';
                    window.localStorage.setItem(key, $(this).prop('productid'));
                });
            }
        });
    }


    /* 上下一页 */
    $('.prevPage').click(function(){
        //逻辑判断,若为第一页则不发送请求
        var pageId = $('#selectPage option:selected').val();
        if( $('#selectPage option:first-child').attr('selected') ){
            alert( '已经是第一页了！' );
        } else {
            getProduct(  --pageId );     // --: 先减再参与运算
        }
    });
    $('.nextPage').click(function(){
        var pageId = $('#selectPage option:selected').val();
        if( $('#selectPage option:last-child').attr('selected') ){
            alert( '已经是最后一页了！' );
        } else {
            getProduct(  ++pageId );
        }
    });

    /* 选择栏跳转 */
    $("#selectPage").on('change',function (e) {
        //局部刷新页面,获取对应页面数据
        getProduct(  $(this).val() );
    });

    /* 返回顶部 */
    $('#backToTop').click(function () {
        //console.log( document.body.scrollTop );
        document.body.scrollTop = 0;
    });
});
