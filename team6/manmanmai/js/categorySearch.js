
/* 脚本实现 */
$(function () {

    getTitle();


    /* 展开/收起分类列表 */
    $('.cat_t').each(function ( i, v ) {
        $(v).click(function () {
            $(this).siblings('.cat_t').find('a').css( 'background', 'url(./images/arrow1.gif ) right center no-repeat' );
            if( $(this).next('table').css("display") == 'none' ){
                $(this).siblings('table').css('display', 'none');
                $(this).next('table').css("display", 'table' );
                $(this).find('a').css( 'background', 'url(./images/arrow2.gif ) right center no-repeat' );
            } else {
                $(this).next('table').css("display", 'none' );
                $(this).find('a').css( 'background', 'url(./images/arrow1.gif ) right center no-repeat' );
            }
        });
    });

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

    /* 异步获取分类标题 */
    function getTitle() {
        $.ajax({
            url:'http://'+net.url+':9090/api/getcategorytitle',
            type:'get',
            dataType:'json',
            success:function( data ){
                data = data.result;
                $(".cat_t a").each(function ( i, v ){
                    //设置分类标题
                    v.innerHTML = data[i].title;
                    //同时绑定分类ID，以便之后获取列表和页面跳转获取
                    v.parentNode.titleId = data[i].titleId;
                });
                //加载完成,获取分类列表
                getCateList();
            }
        });
    }

    /* 获取分类列表 */
    function getCateList (){
        //获取所有标题ID，加入数组
        var titleId = [];
        $(".cat_t").each(function ( i, v ){
            titleId.push( v.titleId );
        });
        //循环获取,通过titleId
        for ( var i = 0; i < titleId.length; i++ ){
            $.ajax({
                url:'http://'+net.url+':9090/api/getcategory',
                type:'get',
                dataType:'json',
                data: {titleid:titleId[i]},
                success:function( data ){
                    data = data.result;
                    for ( var i = 0; i < data.length; i++ ){
                        //通过eq指定对应的a标签，然后设置文字以及分类ID
                        $('.cat_list').eq( data[i].titleId ).find( 'a' ).each(function ( i, v) {
                            v.innerHTML = data[i].category;
                            v.categoryId = data[i].categoryId;
                        });
                    }
                }
            });
        }


    }

    /* 分类列表点击跳转页面 */
    $('.cat_list a').click(function () {
        var key = 'categoryId';
        //console.log( this.categoryId );
        //利用缓存实现页面间数据的传递,从而实现数据请求
        window.localStorage.setItem(key, this.categoryId);
    });
});