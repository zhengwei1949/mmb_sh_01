/**
 * Created by Administrator on 2016/11/22.
 */
$(function () {
    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var status = get("productId");
    console.log(status);
    $.ajax({
        dataType: "json",
        data: {"productid": status},
        type: "get",
        url: url() + "/api/getmoneyctrlproduct",
        success: function (data) {
            var html = template("sqk_template1", data);
            var sqk_main = document.querySelector(".sqk_main");
            sqk_main.innerHTML = html;
            //设置底部虚线
            $("#disstorck").find("li:odd").css("border-bottom", "2px dotted #C0C0C0");

            /*-----------评论------------*/
            $(".btn").on("click", function () {
                //输入文本并且添加到下面去;
                var $txt = $("#assess").val();
                var $li = document.createElement("li");
                $("#sqk_mes").prepend($li);

                $($li).html($txt).parent().parent().parent().find("#assess").val("");
                //添加删除按钮；
                var $input = document.createElement("input");
                $($input).attr({"value": "删除", "type": "button"});
                $($li).append($input);
                //点击删除按钮去除当前li标签；
                $($input).on("click", function () {
                    $(this).parent().remove();
                });
                //还原数字总数；
                $("#word_num").html("10");
            });
            $("#assess").on("keyup", function (event) {
                var $num = 10 - $("#assess").val().length;
                $("#word_num").html($num);
                if ($("#assess").val().length > 10) {
                    if (event.keyCode != 8) {
                        return false
                    }
                    return
                }
            });
        }
    });

    returnTop('#reTop');
});


//模板引擎做的
//ajax("http://mmb.ittun.com/api/getmoneyctrlproduct",function(data){
//    console.log(data);
//    var html=template("sqk_template1",data);
//    var sqk_main=document.querySelector(".sqk_main");
//    sqk_main.innerHTML=html;
//});

//字符串拼接
//$.ajax({
//        type:"get",
//        data:{},
//        dataType:"json",
//        //url:"http://127.0.0.1:9090/api/getmoneyctrl",
//        url:"http://mmb.ittun.com/api/getmoneyctrl",
//        success:function(data){
//            console.log(data);
//            var temp = '<p class="sqk-title">'+data.result[0].productName+'</p>' +
//                       '<p class="sqk_mes">' +
//                       '<span class="sqk_mes">'+data.result[0].productFrom+'</span>' +
//                       '<span class="spk_proTime">'+data.result[0].productTime+'</span>' +
//                       '<span class="spk_mmb">'+data.result[0].productTips+'</span>' +
//                       '</p>' +
//                       '<div class="sqk_explain">' +
//                       '<img src="../images/savr4.jpg" alt=""/>' +
//                       '<p class="explain_word">'+data.result[0].productInfo+'</p>' +
//                       '</div>' +
//                       '<div class="sqk_Ad">' +
//                       '<p class="sqk_adWord">'+data.result[0].productInfo1+'</p>' +
//                       '<img src="../images/savr4.jpg" alt=""/>' +
//                       '</div>';
//            var sqk_main = document.querySelector(".sqk_main");
//                sqk_main.innerHTML = temp;
//        },
//        error: function () {
//            alert("服务端错误");
//        }
//    });