/**
 * Created by Administrator on 2016/11/27.
 */
$(function () {

    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var a=get('productid');
    $.ajax({
        type: 'get',
        //url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        url: url.self+'/api/getmoneyctrlproduct',

        data:{productid:a},
        dataType: "json",
        success: function (data) {
            console.log(data);
            var value = data.result[0];
            var tag = template('template1',value);
            $('#soy_intro').html(tag);
            var tag2=template('template2',value);
            $('#soy_comment').html(tag2);

            //pinglun hezi gao
            var boxs=document.getElementsByClassName('ui-border-b');
            var imgs=document.getElementsByClassName('userimg');
            var names=document.getElementsByClassName('name');
            var contents=document.getElementsByClassName('content');
            console.log(boxs);
            console.log(imgs);
            console.log(names);
            console.log(contents);
            for(var i=0;i<boxs.length;i++){
                var contheight=contents[i].offsetHeight;
                //console.log(contheight);
                var nameheigt=names[i].offsetHeight;
                var heightright=contheight+nameheigt+30;
                //console.log(heightright);
                var heightleft=imgs[i].offsetHeight;
                //console.log(heightleft);
                var boxheight=heightleft>heightright?heightleft:heightright;
                console.log(boxheight);
                boxs[i].style.height=boxheight+'px';
            }



            //页面动态评论效果

            $("#ctl00_ContentBody_Button1").on('click',function(){
                if ($(".form").val()===''){
                    return;
                }
                var ul=document.getElementsByTagName('ul')[0];
                var li=document.createElement("li");
                var lis=ul.appendChild(li);
                if(lis.length===0){
                    ul.appendChild(li);
                }else{
                    ul.insertBefore(li,lis[0]);
                }
                var span=document.createElement("span");
                li.appendChild(span);
                var a=$("#ctl00_ContentBody_txt_nr").val();
                //console.log(span.innerText);
                span.innerHTML=a;
                $("#ctl00_ContentBody_txt_nr").val(" ");

            })
        }
        //error: function () {
        //    alert(2);
        //}

        //给页面加入可以动态评论效果

    })

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
})