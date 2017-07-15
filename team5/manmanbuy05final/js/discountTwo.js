/**
 * Created by Administrator on 2016/11/22.
 */
$(function(){

    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //接收到上一个页面的键的名字
   var a= get('productid');
        $.ajax({
            type:"get",
            url:url.self+'/api/getdiscountproduct',
            dataType:"json",
            data:{productid:a},
            success:function(data) {
                console.log(data);
                var tag = '';
                var tag1 = '';
                for (var k in data.result) {
                    tag += '<div class="product_introduce">'
                        + '<h3>' + data.result[k].productName + '</h3>'
                        + '<p class="product_price">' + data.result[k].productPrice + '</p>'
                        + '<div class="product_subtitle">' + data.result[k].productFrom + '+' + data.result[k].productTime + '+' + data.result[k].productTips + '</div>'
                        + '<p class="product_info">' + data.result[k].productInfo + '</p>'
                        + '<img class="product_pic" ' + data.result[k].productImg + ''
                        + '</div>'

                    $('.product_all_info').html(tag);
                }
                //发表评论框数据请求区域
                for (var k in data.result) {
                    tag1 +=
                        '<div class="product_comment">' + data.result[k].productComment + '</div>'

                }
                $('.product_comment_all').html(tag1);


                //给页面加入可以动态评论效果
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
        })
    //渲染页面城市有无货数据
    $.ajax({
        url:url.self+'/api/getmoneyctrl?productid=1',
        type:'get',
        dataType:'json',
        //data:{productid:1},

        success:function(data){
            var tag2="";
            console.log(data);
            html='<div class="product_comment">'
                    '+data.result[productCity]+'
               + '</div>'
        }




    })



    })



