//截取当前网页路径中的某变量值的函数
function getData(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//返回顶部的函数，参数中是点击的按钮名
function returnTop(btn) {
    $(btn).on('click', function (e) {
        //获取当前屏幕被卷去的高度
        var top = $('body').scrollTop();
        //计算出每20毫秒的步进距离
        perTop = top / 25;
        //设置缓动定时器
        var interval = setInterval(function () {
            //判断若被卷去距离小于等于0时
            if (top <= 0) {
                //停止动画
                clearInterval(interval);
                //将页面置顶
                top = 0
            }
            //执行每次页面的上升
            $('body').scrollTop(top -= perTop);
        }, 20);
    })
}

//把总地址直接返回
function url(){
    //return 'http://127.0.0.1:9090';
    return 'http://mmb.ittun.com';
}