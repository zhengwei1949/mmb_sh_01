/**
* @Author: liyang
* @Date:   2016-11-22 18:50:00 
* @Last Modified by:   liyang
* @Last Modified time: 2016-11-25 20:00:00 
*/
/* ---- 白菜价页面 ---- */
$(function () {

    /* 加载页面时先渲染默认 */
    $.getJSON(
        'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getgsshop'],
        function (data) {
            var source =
                   '{{if result}}'
                +   '{{each result as value}}'
                +       '<option value="{{=value.shopId}}" id="{{=value.shopId}}">{{=value.shopName}}</option>'
                +   '{{/each}}'
                +   '{{/if}}'
                ;

            tool.renderHTML(source, data, '#select1');
            $('#select1 option:first-child').attr('selected', true);
        }
    );

    $.getJSON(
        'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getgsshoparea'],
        function (data) {
            var source =
                    '{{if result}}'
                    +   '{{each result as value}}'
                    +       '<option value="{{=value.areaId}}" id="{{=value.areaId}}">{{=value.areaName}}</option>'
                    +   '{{/each}}'
                    +   '{{/if}}'

                ;
            tool.renderHTML(source, data, '#select2');
            $('#select2 option:first-child').attr('selected', true);
            getproduct(0, 0);
        }
    );

    /* 监听select标签的change事件 */
    $('.select-nav form select:first-child').on("change",function(){
        var shopid = this.value;
        var areaid = $('.select-nav form select:nth-child(2)').val();
        getproduct(shopid, areaid);
    });

    $('.select-nav form select:nth-child(2)').on("change",function(){
        var shopid = $('.select-nav form select:first-child').val();
        var areaid = this.value;
        getproduct(shopid, areaid);
    });


    function getproduct(shopId, areaId){
        $.getJSON(
            'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getgsproduct'],
            {shopid: shopId, areaid:areaId},
            function (data) {
            var source =
                    '<ul class="clearfix">'
                    + '{{if result}}'
                    + '{{each result as value}}'
                    + '<li>'
                    + '<a href="" id="{{#value.productId}}">'
                    + '<img src="{{#value.productImg}}" alt=""/>'
                    + '<p>{{#value.productName}}</p>'
                    + '<span class="clearfix">'
                    + '<b>{{#value.productPrice}}</b>'
                    + '<i>去凑单</i>'
                    + '</span>'
                    + '</a>'
                    + '</li>'
                    + '{{/each}}'
                    + '{{/if}}'
                    + '</ul>'
                ;
            tool.renderHTML(source, data, '.productList');
        })
    }
});