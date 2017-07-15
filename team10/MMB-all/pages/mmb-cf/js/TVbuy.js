/**
 * Created by 永恒 on 2016/11/30.
 */

(function (){
    var pageid = 1,pageCount= 0,index = 1;
    //  设置按钮的禁用和取消禁用
    function setAttr() {
        if(pageid==1) {
            $("#btnUp").attr("disabled","disabled").css({background:"#f1f1f1"});
            $("#btnDown").removeAttr("disabled","disabled").css({background:"#f1f1f1"})
        }else if(pageid==3) {
            $("#btnDown").attr("disabled","disabled").css({background:"#f1f1f1"});
            $("#btnUp").removeAttr("disabled","disabled").css({background:"#f1f1f1"})
        }else{
            $("#btnUp").removeAttr("disabled","disabled").css({background:"#f1f1f1"})
            $("#btnDown").removeAttr("disabled","disabled").css({background:"#f1f1f1"})
        }
    };
    $(function () {
        get(pageid);
        function upBtn () {
            $("#btnUp").click(function () {
                if(pageid == 1) {
                    return;
                }
                pageid--;
                console.log(pageid)
                setAttr();
                get(pageid);
                // 实现中间页面的跳转设置
                for (var i = 0; i < $("#option").find("option").length; i++) {
                    $("#option").find("option")[i].selected=false;
                    if ($("#option").find("option")[i].index === pageid -  1) {
                        $("#option").find("option")[i].selected = true;
                    }
                };
            });
        }
        upBtn ()
        //下一页按钮
        function downBtn () {
            $("#btnDown").click(function () {
                pageid++;

                setAttr();
                get(pageid);
                //实现中间页面跳转框跟随
                for (var i = 0; i < $("#option").find("option").length; i++) {
                    $("#option").find("option")[i].selected=false;
                    if ($("#option").find("option")[i].index === pageid -1) {
                        $("#option").find("option")[i].selected = true;
                    }
                };
                console.log(pageid);
            });
        };
        downBtn ()
        //监听select变化  触发事件
        $("#option").change(function () {
            for (var i = 0; i < $("#option").find("option").length; i++) {
                if ($("#option").find("option")[i].selected === true) {
                    pageid = $("#option").find("option")[i].index + 1;
                }
            }
            get(pageid);
            setAttr();
        });
    });
    //ajax 数据加载
    function get(pageid) {
        var data = {categoryid:0,pageid:pageid}
        $.ajax({
            dataType:"json",
            url:"http://127.0.0.1:9090/api/getproductlist",
            type:"GET",
            data:data,
            success:function (data) {
                var html = template("test", data);
                $(".abc").html(html);
            }
        })
    };
    //底部页面选择框区域渲染
    function pages(pageid) {
        var data = {categoryid:0,pageid:pageid}
        $.ajax({
            dataType: "json",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: data,
            type: "get",
            success: function (data) {
                // 根据数据计算一共有多少页并向下取整
                var  pageCount = Math.floor(data.totalCount / data.pagesize);
                console.log(pageCount)
                var seletHtml = '';
                for (var i = 0; i < pageCount; i++) {
                    var a = i + 1;
                    // 对要渲染option 进行字符串拼接渲染
                    seletHtml += '<option index="' + a + '" value="' + a + '/' + pageCount + '">' + a + '/' + pageCount + '</option>';
                }
                $("#option").html(seletHtml);

            }
        });
    };
    pages(pageid);
})()
