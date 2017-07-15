/**
 * Created by Administrator on 2016/11/25.
 */

setMoneyProduct($('.moneyProduct'),$.getUrlParam('pageid')||1);
function setMoneyProduct(dom,pageid){
    $.ajax({
        url:getUrl()+'getmoneyctrl',
        data:{'pageid':pageid-1},
        success: function (data) {
            data.pageCount = Math.floor(data.totalCount / data.pagesize);
            data.pageid = pageid || 1;
            data.page = [];
            for (var i = 0; i < data.pageCount; i++) {
                data.page.push({ 'pageid': i + 1, 'pageCount': data.pageCount });
            }
            var html = template('moneyProduct', data);
            dom.html(html);
            $('select').on('change', function(e) {
                window.location.href = "moneyctrl.html?pageid=" + $(this).val();
                $(this).attr('selected',"selected");
            })
        }
    })
}