/**
 * Created by Administrator on 2016/11/29.
 */
$(function () {
    mmb.goBack();
    var brandTitleId,productid;
    $.ajax({
        dataType:"jsonp",
        url:url.self+"/api/getbrandtitle",
        success: function (data) {
            //console.log(data);
            var html=template("order-moban",data);
            $(".order-ul").html(html);
            $(".order-ul li ").on("click", function () {
                brandTitleId=$(this).attr("brandTitleId");
                //console.log(brandTitleId);
                $(".order-box").addClass("hide");
                $(".order-box2").removeClass("hide");
                $.ajax({
                    dataType:"jsonp",
                    data:{brandtitleid:brandTitleId},
                    url:url.self+"/api/getbrand",
                    success: function (data) {
                        brandTitleId=$(this).attr("brandTitleId");
                        //console.log(data);
                        var html=template("order2-moban",data);
                        $(".order-ul2").html(html);
                        $.each(data.result, function (i,v) {
                            $(".order-box2 .num")[i].innerHTML=i+1;
                        })
                        $(".order-ul2 li ").click(function () {
                            brandTitleId=$(this).attr("brandTitleId");
                            $(".order-box2").addClass("hide");
                            $(".order-box3").removeClass("hide");
                            $.ajax({
                                url:url.self+"/api/getbrandproductlist",
                                dataType:"jsonp",
                                data:{brandtitleid:brandTitleId},
                                success: function (data) {
                                    var html=template("order3-moban",data);
                                    $(".pro-box").html(html);
                                    $(".order-box3 .pro-order").on("click", function () {
                                        var img=$(this).find(".img-box").html();
                                        var name=$(this).find(".pro-name").html();
                                        console.log(img);
                                        productid =$(this).attr("productId");
                                        $(".order-box3").addClass("hide");
                                        $(".order-box4").removeClass("hide");
                                        $.ajax({
                                            dataType:"jsonp",
                                            data:{productid:productid},
                                            url:url.self+"/api/getproductcom",
                                            success: function (data) {
                                                var html=template("order4-moban",data);
                                                $(".order-box4").append(html);
                                                $(".order-box4 .img-box").html(img);
                                                $(".order-box4 .pro-name").html(name);
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    })
})