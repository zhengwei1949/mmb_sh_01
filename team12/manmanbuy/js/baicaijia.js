$(function(){
    getTab();
    returnTop('#reTop');
})

function getTab(){
    $.ajax({
        url: url() + '/api/getbaicaijiatitle',
        data:{},
        dataType:'jsonp',
        success:function(data){
            //模板渲染到页面
            var html = template('tab',data);
            $('#tab1').html(html);
            swipe();

           var firstId =  data.result[0].titleId; 

            getMain(firstId);
            //点击的时候
            $("#tab1 > ul > li").click(function(){
                $(this)
                    .addClass('currt')
                    .siblings('li')
                    .removeClass('currt');
                var id = this.getAttribute('titleid');
                getMain(id);
            })
        }
    })
}

//主体部分数据的获取
function getMain(id){
    $.ajax({
        url:url() + '/api/getbaicaijiaproduct',
        data:{'titleid':id},
        dataType:'jsonp',
        success:function(data){
            var html = template('mainBox',data);
            $('#mainBox1').html(html);
        }
    })
}

//实现tab水平栏滑动效果
function swipe(){
    /*通过封装的swipe插件来实现*/
    swipeEffect.iScroll({
        swipeDom:document.querySelector('#tab1'),/*父容器对象*/
        swipeType:'x',/*滑动的方向*/
        swipeDistance:25/*缓冲的距离*/
    });
}