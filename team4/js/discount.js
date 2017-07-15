/**/

$(function () {
    setProductList($('.productMessages'), $.getUrlParam('productid'));
    function setProductList(dom, productid, callback) {
        $.ajax({
            url: getUrl()+"getdiscountproduct",
            data: {'productid': productid},
            success: function (data) {
                var html = template("productDis", data);
                dom.html(html);
            }
        })
    }
});
