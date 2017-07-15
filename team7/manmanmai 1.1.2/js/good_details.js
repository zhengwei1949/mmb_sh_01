/**
 * @Author: zq
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   zq
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function(){

    /*1.点击任意商品商品详情页*/
    var c = tool.getParam('productid');
        $.ajax({
            url:'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getproduct'],
            type:'get',
            data:{productid:c},
            dataType:'json',
            async:'true',
            success:function(data){
                var tag='';
                for(var k in data.result){
                    tag+='<p class="detail_text">'+data.result[k].productName+'</p>'
                        +'<div class="picture">'
                        +'<a href="#">'+data.result[k].productImg+'</a>'
                        +'<a href="#" class="a_right">收藏</a>'
                        +'</div>'
                        +'<div>'+data.result[k].bjShop+'</div>'
                        +'<div class="true_price">*实际价格以个网点</div>'
                }
                $('.detail').html(tag);
            },
            fail:function(error){
                alert('请求的数据不存在');
            }
        });

    /*2.商品评论*/
    $.ajax({
        url:'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getproductcom'],
        type:'get',
        data:{productid:c},
        dataType:'json',
        async:'true',
        success:function(data){
          var tag='';
            for(var k in data.result){
                tag+= '<div class="c_box">'+
                    '<div class="clearfix">'
                    +'<span style="float: left">'+data.result[k].comName+'</span>'
                    +'<span style="float: right">'+data.result[k].comTime+'</span>'
                    +'</div>'
                    +'<b>'+data.result[k].comFrom+'</b>'
                    +'<p>'+data.result[k].comContent+'</p>'
                    +'</div>'
            }
            $('.information').html(tag);
        },
        fail:function(error){
            alert('请求的数据不存在');
        }
    })
});
