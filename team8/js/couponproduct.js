window.onload=function () {
    getlist($("#quan"));
};

function getlist(dom) {
    var couponid= $.getUrlParam("couponid");
    var i= +couponid+1;
    switch ( i ){
        case 1:
            $("h1").html("肯德基优惠券");
            break;
        case 2:
            $("h1").html("必胜客优惠券");
            break;
        case 3:
            $("h1").html("棒！约翰优惠券");
            break;
        case 4:
            $("h1").html("哈根达斯优惠券");
            break;
    }
    $.ajax({
        url:"http://mmb.ittun.com/api/getcouponproduct",
        data:{"couponid":couponid},
        success:function (data) {
            var html=template("liebiao",data);
            dom.html(html);
            selectshow();
        }
    })
}
function selectshow() {
    $(".tiao").click(function () {
        var that=this;
        $(".zhezhao").css("display","block");
        var now=$(this).children().eq(0).clone();
        $("#juti").html("");
        $("#juti").append(now);
        $(".zhezhao .tupian span:nth-child(1)").click(function () {
            var prev= $(that).parent().prev().children().children().eq(0).clone();
            if(prev.length!=0){
                that=$(that).parent().next().children().eq(0).get();
                $("#juti").html("");
                $("#juti").append(prev);
            }
        });
        $(".zhezhao .tupian span:nth-child(2)").click(function () {
            var next= $(that).parent().next().children().children().eq(0).clone();
            if(next.length!=0){
                that=$(that).parent().next().children().eq(0).get();
                $("#juti").html("");
                $("#juti").append(next);
            }
        })
        $("#juti").click(function () {
            $(".zhezhao").css("display","none");
        })
    });

}