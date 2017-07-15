/**
 * Created by lenovo on 2016/11/28.
 * author:caoye
 */

/*-----面向对象式的封装！创建一个cy对象，cy.getInfo实现 --获取ajax请求并执行一系列的方法-----*/
$(function () {
    var cy={
        getInfo: function (obj,callback) {
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:9090/api/getmoneyctrl',
                dataType: 'json',
                data:obj,
                success: function (data) {
                    callback(data);
                }
            })
        }
    }
    cy.getInfo({}, function (data) {
        //创建模版对象，并渲染到页面上
        var tag = template("savemoney", data);
        $('.product_box').html(tag);
        //获取到相关数据，计算出页数，不把页数写死
        var optionNum=Math.floor(data.totalCount/data.pagesize);
        //这是str拼接的方法
        var tag="";
        for(var i=0;i<optionNum;i++){
            tag+="<option value='"+(i+1)+"'>"+(i+1)+"/14</option>";
        }
        $(".selectPage").append(tag);

        $(".selectPage").on("change", function () {
            var value=$(this).val();
            cy.getInfo({pageid:value}, function (data) {
                var tag = template("savemoney", data);
                $('.product_box').html(tag);
            })
        })
        $(".prev-page").click(function () {
            var value=$('.selectPage').val();
            if(value>1){
                value=value-1;
                $('.selectPage')[0].value=value;
                cy.getInfo({pageid:value}, function (data) {
                    var tag = template("savemoney", data);
                    $('.product_box').html(tag);
                })
            }
        })
        $(".next-page").click(function () {
            var value=$('.selectPage').val();
            if(value<14){
                value=+value+1;
                $('.selectPage')[0].value=value;
                cy.getInfo({pageid:value}, function (data) {
                    var tag = template("savemoney", data);
                    $('.product_box').html(tag);
                })
            }
        })
    })
})