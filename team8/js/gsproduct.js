/**
 * Created by admin on 2016/11/25.
 */
(function () {

    // 功能主函数，整个页面中所有的功能都在这个函数中管理
    /*渲染导航栏点击事件获取数据*/
    (function () {
        renderpullList();
    })();


    /*导航栏点击获取下拉菜单数据*/
    function renderpullList() {
        $(".titleList").each(function (i) {
            $(this).on("click", function () {
                var self = this;
                if (i == 0) {
                    renderStore(self);
                } else if (i == 1) {
                    renderAddress(self);
                }
                $(this).find("i").toggleClass("icon-xiangshang1 icon-xiangxia1");

            });
        });

        /*获取下拉菜单中的超市数据*/
        function renderStore(self) {
            var mData = self.mdata || null;
            if (!mData) {
                tools.getData(URL.getStore, {}, function (data) {
                    self.mdata = data;
                    var html = template("productStore", data);
                    $(".store").html(html).slideDown(200);
                    $(".address").hide();
                    storeTag();
                });
            } else {
                $(".store").slideToggle(200);
                $(".address").hide();
            }
        }

        /*获取下拉菜单中的区域数据*/
        function renderAddress(self) {
            var mData = self.mdata || null;
            if (!mData) {
                tools.getData(URL.getAddress, {}, function (data) {
                    self.mdata = data;
                    var html = template("productAddress", data);
                    $(".address").html(html).slideDown(200);
                    $(".store").hide();
                    addressTag();
                });
            }
            else {
                $(".address").slideToggle(200);
                $(".store").hide();
            }
        }

        /*下拉菜单点击事件，让导航数据变更*/
        function storeTag() {
            $(".storeList").each(function () {
                $(this).on("click", function () {
                    var $lia = $(this).find('a'); // 选中的 li 的 a
                    var shopid = $lia.attr('shopid');    // 选中 的shopid
                    // 如果 选中的 a 和标题栏的 a 中的 shopid 不相等 才请求 并设置
                    if (shopid !== $(".title1 a").attr('shopid')) {
                        $(".title1 a").html($lia.html()).attr("shopid", shopid);
                        renderProduct();
                    }
                    $(this).parent().slideUp(200);
                });
            });
        }

        /*下拉菜单点击事件，让导航数据变更*/
        function addressTag() {
            $(".addressList").each(function () {
                $(this).on("click", function () {
                    var $lia = $(this).find('a');
                    var areaid = $lia.attr("areaid");
                    if (areaid !== $(".title2 a").attr('areaid')) {
                        $(".title2 a").html($lia.html()).attr('areaid', $lia.attr('areaid'));
                        renderProduct();
                    }
                    $(this).parent().slideUp(200);
                });
            });
        }

        renderProduct();
        /*获取商品展示栏中的区域数据*/
        function renderProduct() {
            var shopId = $(".title1").find("a").attr("shopId");
            var areaId = $(".title2").find("a").attr("areaId");
            console.log(shopId);
            console.log(areaId);
            tools.getData(URL.getProduct, {shopid: shopId, areaid: areaId}, function (data) {
                self.mData = data;
                console.log("请求数据了");
                var html = template("productShow", data);
                $(".product").html(html).slideDown(200);

            });
        }
    }

})();

