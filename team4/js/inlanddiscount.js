/**/
$(function () {
    setProductList($('.list'));

    function setProductList(dom, callback) {
        $.ajax({
            url: getUrl()+"getinlanddiscount",
            success: function (data) {
                var html = template("productList", data);
                dom.html(html);
                $('.loading').hide();
            }
        })
    }
});
