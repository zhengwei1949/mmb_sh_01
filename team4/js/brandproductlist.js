/**
 * Created by ASUS on 2016/11/25.
 */
$(function(){
   ad();
})
function ad(){  // 获取地址栏中传递的参数
    function GetQueryString(name){
        var reg = new RegExp('(^|&)' + name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return unescape(r[2]);
        }
        return null;
    }
    var num =  GetQueryString('brandTitleId');//参数
    // alert(num)
     $.ajax({
        url:getUrl()+'getbrandproductlist',
        data:{brandtitleid:num},//请求数据参数
        success:function(data){
            var html = template('goods_list',data);
            $('.goodslist').find('ul').html(html);
            //------------------------------------
            //console.log(html); var goods = template('goods',data);
            var flag = true;
            if(!flag){
             $('.scale').find('p').html('<a href="index.html">首页 ></a> 全部分类 > 评论');
            }else{
               $('.scale').find('p').html('<a href="index.html">首页 ></a>  <a href="brandTitle.html">全部分类 ></a>  ');
            }
            // 评论下拉框中的请求及效果
            $('.review').on('click',function(){
                var index = $(this)
                            .parent()
                            .parent()
                            .parent()
                            .attr('data-productId');
                     $(this)
                     .parent('div')
                     .parent('div')
                     .parent('li')
                     .siblings('li')
                     .slideToggle(100);
                var that = $(this);
                if(!flag){
                    $('.review_box').slideToggle(0);
                    $('this').parent().hide();
                     $('.btn').hide();
                }else{
                    $.ajax({
                        url:getUrl()+'getproductcom',
                        data:{productid:index},
                        success:function(data){
                            $('.review_box').slideToggle(0);
                            $('this').parent().hide();
                            var list = template('info',data);
                            that.parent().parent().parent().append(list);
                            flag = false;
                             $('.btn').show(100);
                             //开始
                            var timer = null;
                            document.addEventListener('touchmove',function(e){
                                clearInterval(timer);
                                var pageY = event.changedTouches[0].pageY;
                              timer =  setInterval(function () {
                                    var targetY = pageY - $('.btn')[0].offsetHeight / 2;
                                    var leaderY = $('.btn')[0].offsetTop;
                                    var stepY = (targetY - leaderY) / 2;
                                    stepY = stepY > 0 ? Math.floor(stepY) : Math.ceil(stepY);
                                    leaderY = leaderY + stepY;
                                     $('.btn').css('top',leaderY);
                                    if (leaderY === targetY) {
                                        clearInterval(timer);
                                    }
                                }, 1);
                            })//结束
                            $('.btn').on('click',function(){
                                 $(this).hide(100);
                                ad();
                            })
                        }
                    });
                }
                flag = !flag;
            })
        }

    })
}