/**
 * Created by ASUS on 2016/11/22.
 */

$(function() {
    $.ajax({
        type:'get',
        url: getUrl()+'getbrandtitle',
        // url:'http://mmb.ittun.com/api/getbrandtitle',
        dataType:'json',
        success: function (data) {
            var lists = data.result;
            //console.log(data);
            var str = '';
            for (var i = 0; i < lists.length; i++) {
                str += '<li>'
                    + '<a href="./ten-brand.html?brandTitleId='+lists[i].brandTitleId+'' +
                    '" id="'+lists[i].brandTitleId+'" "data-categoryId"="'+lists[i].categoryId+'"> '
                    +   lists[i].brandTitle
                    + '<span class="icon-jiantouxia iconfont fr"></span>'
                    + '</a>'
                    + '</li>'
            }
            $('.list').html(str);
        }
    });
})
