/**
 * Created by crazy on 2016/11/25.
 */
$(function () {
    // 渲染商家下拉列表信息
    renderShop($('#list>.list_box>.shop>ul'));
    function renderShop(dom) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getgsshop",
            success:function (data) {
                var $dom = $(dom);
                data = data.result;
                var shopHtml = "";
                for(var i = 0;i<data.length;i++){
                    shopHtml += '<li ><a href="javascript:void(0)" data-shopid="'+data[i].shopId+'">'+data[i].shopName+'</a><span></span></li>';
                }
                $dom.html(shopHtml);
            }
        });
    }

    // 渲染区域下拉列表信息
    renderArea($('#list>.list_box>.area>ul'));
    function renderArea(dom) {
        var $this = $(dom);
        $.ajax({
            url:"http://mmb.ittun.com/api/getgsshoparea",
            success:function (data) {
                data = data.result;
                var areaHtml = "";
                for(var i = 0;i<data.length;i++){
                    areaHtml += '<li><a href="javascript:void(0)"  data-areaid="'+data[i].areaId+'">'+data[i].areaName+'</a><span></span></li>';
                }
                $this.html(areaHtml);
            }
        });
    }

    // 渲染商品信息
    setProductList($('#list>.list_content'),{"shopid": 0, "areaid": 0 });
    function setProductList(dom, data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            data: { 'shopid': data.shopid || 0, 'areaid': data.areaid || 0 },
            success: function(data) {
                var html = template('gsProductList', data);
                dom.html(html);
            }
        })
    }

    // 控制下拉列表点击显示
    showList();
    function showList() {
        $('.box_title').on('click','li',function () {
            var $this = $(this),showBox = $('.list_down>ul');
            var num = $this.index();
            showBox.eq(num).toggleClass('hide').parent().siblings('.list_down').children().addClass('hide');
            $this.children('span').toggleClass('godown').parent().siblings('li').children('span').removeClass('godown');
        })
    }
    // 点击店家列表显示对应列表
    var shopId='',areaId='';
    clickShop($('.shop > ul'));
    function clickShop(dom){
        $(dom).on('click','li',function () {
            var $this = $(this);
            shopId = $this.find('a').eq(0).data('shopid');
            var msg = $this.children().text();
            $('.box_title').find('a').eq(0).text(msg);
            setProductList($('#list>.list_content'),{"shopid": shopId, "areaid": areaId });
            ani($this);
        })
    }
    // 点击区域列表显示对应内容
    clickArea($('.area > ul'));
    function clickArea(dom){
        $(dom).on('click','li',function () {
            var $this = $(this);
            areaId = $this.find('a').eq(0).data('areaid');
            var msg = $this.children().text();
            msg = msg.slice(0,2);
            $('.box_title').find('a').eq(1).text(msg);
            setProductList($('#list>.list_content'),{"shopid": shopId, "areaid": areaId });
            ani($this);
        })
    }
    // 点击全部价格显示对应内容
    $('.price > ul > li').on('click',function () {
        var $this = $(this);
        setProductList($('#list>.list_content'),{"shopid": 0, "areaid": 0 });
        $this.children('span').addClass('red_right');
        ani($this);
    })

    // 点击下拉列表li效果
    function ani(dom) {
        $(dom).children('span').addClass('red_right');
        $(dom).siblings().children('span').removeClass('red_right');
        $(dom).parent().parent().fadeOut(500,function () {
            $(this).removeAttr('style');
            $(this).children().addClass('hide');
        })
        $('.box_title li').children('span').removeClass('godown');
    }

    // 点击返回页面头部
    $('#goTop').on('click',function(){
        $('html,body').animate({scrollTop:0},500);
    })
})