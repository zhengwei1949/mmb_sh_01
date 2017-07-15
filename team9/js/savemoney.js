/**
 * Created by cc on 2016/11/28.
 */
//window.onload=function(){}

$(function(){
    //传参0，默认第一页数据
    getProduct(0);
    setClick();
});
function getProduct(number){
    //注意：number=0是第1页页面数据
    $.ajax({
        //url:'http://127.0.0.1:9090/api/getmoneyctrl',
        url:url.pc+'getmoneyctrl',
        //url:'http://19.168.13.80:9090/api/getmoneyctrl',
        //url:url.phone+'getmoneyctrl',
        data:{pageid:number},
        dataType:'json',
        success:function(data){
            //商品列表
            //template模板
            var productList = template('productList',data);
            var goods_list = document.getElementById('goods_list');
            //数据渲染到页面中去
            goods_list.innerHTML = productList;
            //调用点击翻页按钮函数
            //getBtn();

            //底部翻页按钮
            //动态创建拼接字符串option
            var option = "";
            for(var i = 1; i <= data.pagesize; i++) {
                //<option value="">1/10</option>
                option += "<option value="+i+'>'+i+"/"+data.pagesize+'</option>';
            }
            //将动态创建的option追加到select中，并渲染到页面中去
            var select = document.getElementById('turnPage');
            select.innerHTML = option;

            //将字符串转换为数字
            //ajax传参number是字符串
            select.value = -(-number) + 1 ;//对应option
            //select.value就是option的value
            //注意获取的select.value值是一个string
            //console.log(typeof pageCurrent);
        }
    });
}

function setClick(){
    //获取当前页
    //var pageCur = $('#turnPage').val();

    //下拉框
    $('#turnPage').on('change',function(){
        var pageCur = $('#turnPage').val();
        //获取当前页面数据
        getProduct(pageCur-1);
    });

    //点击上一页按钮
    $('.previous').on('click',function(){
        var pageCur = $('#turnPage').val();

        if(pageCur!=1){
            //获取上一页页面数据
            getProduct(pageCur-2);
        }
    });

    //点击下一页按钮
    $('.next').on('click',function(){
        var pageCur = $('#turnPage').val();
        if( pageCur != 14 ){
            //获取下一页页面数据
            getProduct(pageCur);
        }
    });
}







