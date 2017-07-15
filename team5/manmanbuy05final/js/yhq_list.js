/**
 * Created by john on 2016/11/29.
 */
$(function(){
    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var a=get('couponid');
    //console.log(a);
    var title={
        0:'肯德基优惠券',
        1:'必胜客优惠券',
        2:'棒约翰优惠券',
        3:'哈根达斯优惠券'
    }
    $('.center_word p').text(title[a]);


    $.ajax({
        url:url.self+'/api/getcouponproduct',
        data:{couponid:a},
        dataType:'json',
        success:function(data){
            console.log(data);
           var html= template('tem',data);
            $('section').html(html);

            //点击图片切换
            $('.img').on('click',function(){
                //console.log();
                var a=$('body')[0].scrollTop;
                var b=$('body').css('height');
                //console.log(b);
                $('.zhezhao').css({'display':'block','top':a,'height':b});
                //console.log('11');
                var c=this.cloneNode(true);
                var id=this.id;
                //console.log(id);
                $('.currentImg').html(c);
                $('.toleft').on('click',function(){
                    id--;
                    if(id<0){id=0}
                    var lastnode=document.getElementById(id);
                    var last=lastnode.cloneNode(true);
                    //console.log(last);
                    $('.currentImg').html(last);
                });
                $('.toright').on('click',function(){
                    id++;
                    var nextnode=document.getElementById(id);
                    var next=nextnode.cloneNode(true);
                    //console.log(last);
                    $('.currentImg').html(next);
                });
                //console.log($('.currentImg'));
                $('.currentImg').on('click',function(){
                    //alert(11);
                    $('.zhezhao').css({'display':'none'});
                });

            });
        }
    });
    $(".up").on("click", function () {
        var timer =setInterval(function(){
            var leader = document.body.scrollTop;

            var target = 0;
            var step = (target-leader)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            leader=leader+step;
            if(leader==target){
                clearInterval(timer);
            }
            document.body.scrollTop = leader;
        },30)
        return false;
    })
});