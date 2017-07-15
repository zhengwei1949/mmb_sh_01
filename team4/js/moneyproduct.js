/*
 *
 * ---------------------------------------------------------------------------------
 *
 * */
$(function () {
    setProductList($('.productMessages'), $.getUrlParam('productid'))

    function setProductList(dom, productid, callback) {
        $.ajax({
            url: getUrl()+"getmoneyctrlproduct",
            data: {'productid': productid},
            success: function (data) {
                var html = template("moneyProduct", data);
                dom.html(html);
            }
        })
    }
});
