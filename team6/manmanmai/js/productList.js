$(function () {
    getTitle();

    /* 返回顶部 */
    $('#backToTop').click(function () {
        //console.log( document.body.scrollTop );
        document.body.scrollTop = 0;
    });


    /* 获取商品列表 */
    function getTitle() {
        //获取存储在缓存中的相关数据，以便根据对应的数据发送请求
        var categoryId = window.localStorage.getItem( 'categoryId' );
        categoryId = +categoryId;       //存储的键值均为String类型，+可改为数值类型，以符合API数据格式
        $.ajax({
            url:'http://'+net.url+':9090/api/getcategorybyid',
            type:'get',
            dataType:'json',
            data: { categoryid: categoryId},  //发送符合API格式的数据
            success:function( data ){
                data = data.result;
                //设置具体数据值并且绑定ID以便之后获取调用
                $('.currentCategory ').html( data[0].category ).attr('categoryId', categoryId );
                //成功之后,根据对应ID发送数据请求
                getProductList( categoryId );
            }
        });
    }


    function getProductList( categoryId, pageId ){
        //设置默认页码为第一页,符合实际情况
        var pageId = pageId || 1;
        $.ajax({
            url:'http://'+net.url+':9090/api/getproductlist',
            type:'get',
            dataType:'json',
            data: { categoryid: categoryId, pageid:pageId},     //发送符合API格式的数据
            success:function( data ){
                //根据返回数据内容计算页数
                var pageCount = Math.ceil(data.totalCount / data.pagesize);
                data = data.result;
                //根据数据循环拼接html内容,追加到指定元素中
                var html = '<ul>';
                for ( var i = 0; i < data.length; i++ ){
                    html += '<li class="item">' +
                            '<a href="./productDetalPage.html" class="goto" productId='+ data[i].productId +'></a>' +
                            '<div class="pic">' +
                            data[i].productImg +
                            '</div>' +
                            '<div class="info">' +
                            '<div class="title">' + data[i].productName + '</div>' +
                            '<div class="price"><em>'+ data[i].productPrice.slice(0,1)+'</em>'+(data[i].productPrice).slice(1,7)+'</div>' +
                            '<div class="other">' +
                            '<div class="mall">'+ data[i].productQuote +'</div>' +
                            '<div class="sales">' + data[i].productCom + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                }
                html += '</ul>';
                $('.product_list').html( html );
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
                /* 点击跳转详情页 */
                $('.item a').click(function () {
                    //存储当前列表所绑定的ID,以便再跳转的页面获取到,并通过该值发送请求,获取商品列表页面
                    var key = 'productId';
                    window.localStorage.setItem(key, $(this).attr('productId'));
                });
            }
        });
    }


    /* 上下一页 */
    $('.prevPage').click(function(){
        //逻辑判断,若为第一页则不发送请求
        var categoryId = $('.currentCategory').attr('categoryId');
        var pageId = $('#selectPage option:selected').val();
        if( $('#selectPage option:first-child').attr('selected') ){
            alert( '已经是第一页了！' );
        } else {
            getProductList( categoryId, --pageId );     // --: 先减再参与运算
        }
    });
    $('.nextPage').click(function(){
        var categoryId = $('.currentCategory').attr('categoryId');
        var pageId = $('#selectPage option:selected').val();
        if( $('#selectPage option:last-child').attr('selected') ){
            alert( '已经是最后一页了！' );
        } else {
            getProductList( categoryId, ++pageId );
        }
    });

    /* 选择栏跳转 */
    $("#selectPage").on('change',function (e) {
        //局部刷新页面,获取对应页面数据
        getProductList( $('.currentCategory ').attr('categoryId'), $(this).val() );
    });



});
