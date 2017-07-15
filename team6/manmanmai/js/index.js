$(function () {

    setNav();
    setComPro();


    function setNav() {
        $.ajax({
            url:'http://'+net.url+':9090/api/getindexmenu',
            type:'get',
            dataType:'json',
            success:function( data ){
                data = data.result;
                //动态生成导航栏结构
                var menulist ='';
                //由于页面结构不严谨,故不能一次循环结束,为节约时间,直接使用三次循环,而未调整HTML页面结构
                for ( var i = 0; i < 4; i++){
                    menulist += '<div class="item">' +
                        '<a href="'+ data[i].titlehref +'">' +
                        '<div class="pic">' +
                        data[i].img +
                        '</div>' +
                        '<div class="name">'+ data[i].name +'</div>' +
                        '</a>' +
                        '</div>';
                }
                $(".row:nth-child(1)").html( menulist );
                menulist = '';
                for ( var i = 4; i < 8; i++){
                    menulist += '<div class="item">' +
                        '<a href="'+ data[i].titlehref +'">' +
                        '<div class="pic">' +
                        data[i].img +
                        '</div>' +
                        '<div class="name">'+ data[i].name +'</div>' +
                        '</a>' +
                        '</div>';
                }
                $(".row:nth-child(2)").html( menulist );
                menulist = '';
                for ( var i = 8; i < 12; i++){
                    menulist += '<div class="item">' +
                        '<a href="'+ data[i].titlehref +'">' +
                        '<div class="pic">' +
                        data[i].img +
                        '</div>' +
                        '<div class="name">'+ data[i].name +'</div>' +
                        '</a>' +
                        '</div>';
                }
                $(".row:nth-child(3)").html( menulist );

                //点击更多展示第三列导航内容
                $(".row:last-child").addClass('show');
                $(".row:nth-child(2) .item:nth-child(4) > a").click(function () {
                    $(".row:last-child").toggleClass('show');
                });
            }
        });

    }

    function setComPro() {
        $.ajax({
            url:'http://'+net.url+':9090/api/getmoneyctrl',
            type:'get',
            dataType:'json',
            success:function( data ){
                data = data.result;
                var comList = '';
                for (var i = 0; i < data.length; i++){
                    comList += '<li class="productItem clearfix">' +
                                '<a href="moneyctrlproduct.html">'+
                                '<div class="pic">'+
                                 data[i].productImgSm +
                                '</div>'+
                                '<div class="info">'+
                                '<div class="title">'+
                                 data[i].productName +
                                '<span>'+ data[i].productPinkage +'</span>'+
                                '</div>'+
                                '<div class="other">'+
                                '<span class="mall">'+ data[i].productFrom +' | '+ data[i].productTime +'</span> '+
                                '<span class="comment"> '+
                                '<i class="icon-comment"></i> '+
                                 data[i].productComCount +
                                 '</span>'+
                                 '</div>'+
                                 '</div>'+
                                 '</a>'+
                                 '</li>';
                }
                $(".productList > ul").html( comList );
            }
        });
    }
    /* 返回顶部 */
    $('#backToTop').click(function () {
        //console.log( document.body.scrollTop );
        document.body.scrollTop = 0;
    });


});
