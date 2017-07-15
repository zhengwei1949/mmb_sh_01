/**
 * Created by baiyuhan on 2016/11/30.
 */
$(function(){
    $('.f_middle a:last-child').on('click', function(){
        var timer = setInterval(function(){
            var scrollT = $('body').scrollTop(),
                target = 0;
            var step = (scrollT - target) / 5;
            if(scrollT == 0){
                clearInterval(timer);
            }
            $('body').scrollTop(scrollT - step);
        }, 20);
    })
});