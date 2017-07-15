/**
 * Created by john on 2016/11/29.
 */
$(function(){
    $.ajax({
            url:url.self+'/api/getcoupon',
            dataType:'json',
            success:function(data){
                //console.log(data);
                var html=template('tem',data);
                $('.content').html(html);
            }

        }
    );
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
