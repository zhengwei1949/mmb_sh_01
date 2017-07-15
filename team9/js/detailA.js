/**
 * Created by admin on 2016/11/22.
 */

$(function(){

    //处理location地址
    var url=location.search;//http://localhost:63342/MMB/page/detailA.html?productid=0
    console.log(url);

    var num=url.split('=');
    //console.log(num+','+(typeof  num));
    console.log( num);


    $.getJSON('http://127.0.0.1:9090/api/getdiscountproduct?productid='+num[1],function(data){
        console.log(data);
        //给模板对象传入数据
        var  html=template('tpl',data);
        //渲染页面
        $('.MMB_main').html(html);

        //最新评论
        //申明变量
        var text=$('textarea'),
            btn=$(':submit'),
            list=$('.list'),
            ul=$('.list ul');

        //业务逻辑

        /**
         * 1. 如果传入空 return
         * 2. 动态生成li 把文本域中的内容 提交给li  然后清空文本域
         * 3. 插入到最前面
         */

        btn.on('click',function(){
            if(!text.val()){
                return;
            }
            //插入最前面
            ul.prepend('<li><span>'+text.val()+'</span></li>');
            //清空文本域内部内容
            text.val("");





        });












    });

});

