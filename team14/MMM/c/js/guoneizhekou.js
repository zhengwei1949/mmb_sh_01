

$(function() {
    var dat ;
    var n;
    var t;
    var num;
    var timer;
var w='192.168.13.52:9090'||'192.168.191.1:9090';
    $.ajax({
        url:'http://'+w+'/api/getinlanddiscount',
        data:{},
        dataType:'json',
        success:function(data){
            //console.log(data);

            if(data){
                dat = data;
            }
            num = 6;
            init(0,num);
            var n=$('#info').height();//返回当前网页高度
            var r=window.screen.height;//屏幕的高度
            window.onscroll = function () {
            var d=document.body.scrollTop;//卷上去的高度
                //console.log(r);
                //console.log(z);
                //console.log(d);
                //console.log(n);
            clearTimeout(timer);
            d=document.body.scrollTop+406;
                //console.log(d);
                //console.log(r);
                //console.log(n);
                //z=document.body.offsetHeight;
            if(d>=n-r){
               //alert('搜房网上范德萨发');
                timer=setTimeout(function(){
                    d=document.body.scrollTop;
                    num +=1;
                    init(0,num-5);
                    num=6;
                },2000);

             }
         };
            //if(document.body.scrollTop==557){
            //    return num+=4;
            //}

        }
    });

    function init(start,length){
        console.log(dat);
        dat.start = start || 0;
        dat.showLength = length;
        $(template('result1',dat)).appendTo($('#info'));
        n=$('#info').height();
    }



    //$(window).on(scrollTop,function(){
    //   console.log($('#flash').top());
    //});


    //var cc=$('#info').height();
    //console.log($('#info').height());
    //window.onscroll = function () {
    //    //console.log(document.body.scrollTop);
    //    console.log($('#info li').height());
    //};
});

