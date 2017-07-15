/**
 * Created by yangxu on 2016/11/29.
 */
//返回顶部
$(function () {
    var timer,leader,step;
    $("#toTop").on("click",function(){
        clearInterval(timer);
        timer = setInterval(function () {
            leader = window.pageYOffset;
            step = (0 - leader) / 5;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader += step;
            window.scrollTo(0, leader);
            if (leader === 0) {
                clearInterval(timer);
            }
        }, 15);
    });
});
