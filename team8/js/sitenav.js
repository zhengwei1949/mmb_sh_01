/**
 * Created by admin on 2016/12/1.
 */
(function () {
    renderHTML();
    function renderHTML() {
        tools.getData(URL.getSitenav,{},function (data) {
            var html = template("sitenav",data);
            $(".sitenav").html(html);
        });
    }
})();
