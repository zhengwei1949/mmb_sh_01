/**
 * Created by dell on 2016/11/25.
 */
$(function() {

    var shopid, areaid, id = { shopid: 0, areaid: 0 },
        flag = true;

    function queryData(url, obj, callback) {
        $.ajax({
            type: "get",
            data: obj,
            url: 'http://127.0.0.1:9090/api/' + url,
            dataType: 'json',
            success: function(data) {
                callback(data);
            }
        });
    }

    queryData('getgsshop', id, function(data) {
        var html = template('shop', data);
        $(".hb_shopInfo").html(html);
        showList($(".hb_getshop"), $(".hb_shopInfo"));
    })

    queryData('getgsshoparea', id, function(data) {
        var html = template('area', data);
        $(".hb_areaInfo").html(html);
        showList($(".hb_getarea"), $(".hb_areaInfo"));
    })

    $('body').on('click', '.hb_shopList li', function() {
        $(".hb_market").text($(this).find('a').text());
        $(".hb_shopInfo").hide();
        flag = !flag;
        shopid = $(this).attr('shopid');
        id.shopid = shopid;
        queryData('getgsproduct', id, function(data) {
            var html = template('main', data);
            $(".hb_main").html(html);
        })
    })

    $('body').on('click', '.hb_areaList li', function() {
        var str = $(this).find('a').text().substr(0, 2);
        $(".hb_where").text(str);
        $(".hb_areaInfo").hide();
        flag = !flag;
        areaid = $(this).attr('areaid');
        id.areaid = areaid;
        queryData('getgsproduct', id, function(data) {
            var html = template('main', data);
            $(".hb_main").html(html);
        })
    })

    queryData('getgsproduct', id, function(data) {
        var html = template('main', data);
        $(".hb_main").html(html);
    })



    function showList(parentObj, sonObj) {
        // var flag = true;
        parentObj.click(function() {
            if (flag) {
                sonObj.show();
            } else {
                sonObj.hide();
            }
            flag = !flag;
        })
    }
})
