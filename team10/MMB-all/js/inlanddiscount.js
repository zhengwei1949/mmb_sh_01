/**
 * Created by yangxu on 2016/11/24.
 */
$(function(){
    $.ajax({
        url:"http://127.0.0.1:9090/api/getinlanddiscount",
        type:"get",
        data:{},
        dataType:"Json",
        success: function (data) {
            //截取字符串
            var str,tag;
            for(var i=0;i<data.result.length;i++){
                //名称部分
                if(data.result[i].productName.length>20){
                    str=data.result[i].productName.slice(0,22)+"...";
                }else if(data.result[i].productName.length<12){
                    str=data.result[i].productName+".....................";
                }else{
                    str=data.result[i].productName
                }
                data.result[i].productName=str;
                //价格部分
                /*if(data.result[i].productPrice.length>8){
                 str=data.result[i].productPrice.slice(0,8)+"...";
                 }else{
                 str=data.result[i].productPrice
                 }
                 data.result[i].productPrice=str;*/
            }
            //渲染页面
            var num= 6,html="",step= 4, y0= 0,start=6;
            //首先加载部分数据
            for(var i=0;i<num;i++){
                tag='<li>'+
                    '<a href="#">'+
                    data.result[i].productImg+
                    '</a>'+
                    '<a href="#">'+
                    data.result[i].productName+
                    '</a>'+
                    '<p>'+data.result[i].productPrice+'</p>'+
                    '<p>' + data.result[i].productFrom + ' | ' + data.result[i].productTime + '</p>'+
                    '</li>';
                html+=tag;
            }

            //var html=template("content",data);
            $(".pro_content ul").html(html);
            //页面滑动时动态添加其余数据
            window.onscroll=function(){
                var y1=window.pageYOffset;
                var distance=y1-y0;
                var height=document.querySelector("body").offsetHeight;
                //console.log(distance);
                //每当页面向下滚动500且数据还没加载完时执行加载数据
                if(distance>2*height/3&&start<data.result.length){
                    y0=y1;
                    //每次加载4条数据
                    for(var i=start;i<num+step;i++){
                        tag='<li>'+
                            '<a href="#">'+
                            data.result[i].productImg+
                            '</a>'+
                            '<a href="#">'+
                            data.result[i].productName+
                            '</a>'+
                            '<p>'+data.result[i].productPrice+'</p>'+
                            '<p>' + data.result[i].productFrom + ' | ' + data.result[i].productTime + '</p>'+
                            '</li>';
                        html+=tag;
                    }
                    start+=step;
                    num+=step;
                    //当数据快加载完时，手动设置最后一次参数
                    if(num+step>20){
                        num=16;
                    }
                    /* console.log(start);
                     console.log(num);*/
                    $(".pro_content ul").html(html);
                }
            };
        }
    })
});
//返回首页
$(function(){
    $(".top_header a:nth-child(1)").on("click",function(){
        window.history.back(-1);
    })
});
