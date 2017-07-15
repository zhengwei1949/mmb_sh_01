/**
 * Created by Administrator on 2016/11/26.
 * @author: caoye
 */
/*
 * 有待优化的地方： 1.红色选项箭头 2.未使用字体图标
 * */
$(function () {
    //回到顶部
    mmb.goBack();
    /*-----集中管理变量名，将所有全局变量提写在最上面----*/
    //shopid保存所选店铺的id名，areaid保存所选地区的id名
    var shopid = 0, areaid = 0, tmpShopid, tmpareaid;

    //进入页面立即发送 ajax请求，请求到默认的数据
    getProJson();

    //店铺列表相关操作
    $("#store").on("click", function () {
        tmpShopid = shopid;
        //console.log(tmpShopid);
        //隐藏地区列表
        $(".area-drop").addClass("hide");
        //显示、隐藏店铺列表
        $(".store-drop").toggleClass("hide");
        //发送ajax请求到 店铺数据
        $.ajax({
            url: url.self+'/api/getgsshop',
            data: {},
            type: "get",
            dataType: "json",
            success: function (data) {
                var html = template("shop-moban", data);
                $(".store-drop").html(html);

                $(".store-drop li ").on("click", function () {
                    shopid = $(this).attr("shopId");
                    //console.log(shopid);
                    var shopName = $(this).html();
                    $("#store").html(shopName);
                    $(".store-drop").addClass("hide");
                    //更改shopid时需要动态加载商品列表数据
                    if (tmpShopid != shopid) {
                        getProJson();
                    }
                })
            }
        })
    })

    //地区列表相关操作
    $("#area").on("click", function () {
        tmpareaid = areaid;
        $(".store-drop").addClass("hide");
        $(".area-drop").toggleClass("hide");
        //发送ajax请求到 地区列表数据
        $.ajax({
            url: url.self+"/api/getgsshoparea",
            data: {},
            type: "get",
            dataType: "json",
            success: function (data) {
                var html = template("area-moban", data);
                $(".area-drop").html(html);
                $(".area-drop li ").on("click", function () {
                    areaid = $(this).attr("areaId");
                    var areaName = $(this).html();
                    $("#area").html(areaName);
                    $(".area-drop").addClass("hide");
                    //更改areaid时需要动态加载商品列表数据
                    if (tmpareaid != areaid) {
                        getProJson();
                    }

                })
            }
        })
    })

    //封装的获取商品列表数据的函数
    function getProJson() {
        //发送ajax请求到 商品列表数据
        $.ajax({
            url:  url.self+"/api/getgsproduct",
            data: {shopid: shopid, areaid: areaid},
            type: "get",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = template("pro-moban", data);
                $(".pro-order").html(html);
            }
        })
    }

})