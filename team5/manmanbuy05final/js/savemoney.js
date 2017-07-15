/**
 * Created by lenovo on 2016/11/26.
 * author:zhanganqi
 *
 */

//注意select标签的value属性---与option之间的关系
$(function () {
    $.ajax({
        type: 'get',
        url: url.self+'/api/getmoneyctrl',
        dataType: 'json',
        data:{ },
        success: function (data) {
            console.log(data);
            //创建模版对象，并渲染到页面上
            var tag = template("savemoney", data);
            $('.product_box').html(tag);
            //获取到相关数据，计算出页数，不把页数写死，以后后台数据变了可以直接使用
            var optionNum=Math.floor(data.totalCount/data.pagesize);
            /*
             //循环创建并追加页数数量的option标签
            for(var i=0;i<optionNum;i++){
                var option=document.createElement("option");
                $(option).html(i+1+"/14");
                $(option).attr("value",i+1);
                $(".selectPage").append(option);
            }
            */
            //这是str拼接的方法
            var tag="";
            for(var i=0;i<optionNum;i++){
                tag+="<option value='"+(i+1)+"'>"+(i+1)+"/14</option>";
            }
            $(".selectPage").append(tag);
//当下拉框里数据改变时代表页面发生变化，要看它改变到那一页就请求那一页上面的数据并渲染到页面上去
            $(".selectPage").on("change", function () {
                var value=$(this).val();
                getInfo(value);
            })
//点击上一页，获取到下拉框里的页数，并获取该页相应的数据，并渲染到页面上去
            $(".prev-page").click(function () {
                var value=$('.selectPage').val();
                if(value>1){
                    value=value-1;
                    $('.selectPage')[0].value=value;
                    getInfo(value);
                }
            })
//点击下一页，获取到下拉框里的页数，并获取该页相应的数据，并渲染到页面上去
            $(".next-page").click(function () {
                var value=$('.selectPage').val();
                if(value<14){  //当页数到了14页时再点击也不会在改变也不会再请求数据
                    value=+value+1;
                    $('.selectPage')[0].value=value;
                    getInfo(value);
                }
            })
        }
    })
    //请求具体的商品信息数据并渲染到页面上
    function getInfo(value){
        $.ajax({
            type: 'get',
            url: url.self+'/api/getmoneyctrl',
            dataType: 'json',
            data:{pageid:value},
            success: function (data) {
                //console.log(data);
                var tag = template("savemoney", data);
                $('.product_box').html(tag);
            }
        })
    }
//点击回到顶部
    $(".mmb_footer .w3").on('click', function () {
        var timer = setInterval(function () {
            var leader = document.body.scrollTop;
            var target = 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (leader === target) {
                clearInterval(timer);
            }
            document.body.scrollTop = leader;
        }, 20);
    })
})
