/**
 * Created by Administrator on 2016/11/22.
 */
$(function(){


    $.ajax({
        type:'get',
        url:url.self+'/api/getsitenav',//数据，无需传参
        dataType:'json',
        success:function(data) {
            console.log(data);
                var tag='';
            //遍历页面上需要渲染的数据
                for(var k in data.result){
                    tag+='<div class="pic_icon" class="clearfix">'
                        +'<a href="'+data.result[k].navHref +'" id="'+data.result[k].navId+'">'
                        +'<img src="'+data.result[k].navImg+'" alt=""/>'
                        +'<span>'+data.result[k].navTitle+'</span>'
                        +'</a>'
                        +'</div>'
                }
            $('.web_url').html(tag);
            //$('.web_url').append(tag);

              }
        })
    })