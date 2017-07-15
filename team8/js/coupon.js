window.onload=function () {
    getlist($("#quan"));
};

function getlist(dom) {
    $.ajax({
        url:"http://mmb.ittun.com/api/getcoupon",
        type:"get",
        success:function (data) {
            var html=template("liebiao",data);
            dom.html(html);
        }
    })
}