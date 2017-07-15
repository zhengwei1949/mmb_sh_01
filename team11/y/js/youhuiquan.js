/**
 * Created by Yang on 2016/11/28.
 */
window.onload=function () {
    getlist($("#quan"));
};

function getlist(dom) {
    $.ajax({
        url:"http://localhost:9090/api/getcoupon",
        type:"get",
        success:function (data) {
            var html=template("liebiao",data);
            dom.html(html);
        }
    })
}