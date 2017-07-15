/**
 * Created by DELL on 2016/11/22.
 */
window.onload=function(){
    getAjax2();
}
function query(url) {
    var obj = {};
    var str = url.split('?')[1];
    str.split('&').forEach(function(item) {
        var arr = item.split('=');
        obj[arr[0]] = arr[1] ? arr[1] : '';
    })
    return obj;
}
function getAjax2(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getbrand",
        // url:"http://192.168.13.210:9090/api/getbrand",
        data:{"brandtitleid":query(location.href).brandtitleid},
        success:function(data){
            var html=template("brandnice",data);
            $(".brand_list2").html(html);
            var firstId=data.result[0].brandTitleId;
                getAjax3(firstId);
        }
    });
}

function getAjax3(firstId){
    $.ajax({
        url:"http://mmb.ittun.com/api/getbrandproductlist",
        //url:"http://192.168.13.210:9090/api/getbrandproductlist",
        data:{"brandtitleid": firstId, "pagesize": 4},
        success:function(data){
            var html=template("brandsole",data);
            $(".brand_list3").html(html);
            //var productid=data.result[0].productId;
            var productlist=data.result;
            console.log(productlist);
                getAjax4(productlist);
                console.log(1111);

        }
    });
}

function getAjax4(productlist,productid){
    var productid = [];
    for (var i = 0; i < productlist.length; i++) {
        productid.push(productlist[i].productId);
    }
    console.log(productid);//[1, 37, 38, 0]
    $.ajax({
        url: "http://mmb.ittun.com/api/getproduct",
        //url: "http://192.168.13.210:9090/api/getproduct",
        data: {"productid": productid[0]},
        success: function (data) {
            var result = data.result;
            console.log(result);
            //遍历上面获取数据，获得图片信息
            for (var j = 0; j < result.length; j++) {
                $.ajax({
                    url: "http://mmb.ittun.com/api/getproductcom",
                    //url: "http://192.168.13.210:9090/api/getproductcom",
                    data: {"productid": productid[0]},
                    success: function (data) {
                        console.log(data);
                        data = data.result;
                        var productfrom = []
                        for (var i = 0; i < data.length; i++) {
                            productfrom.push({
                                "productName":result[0].productName,
                                "productImg": result[0].productImg,
                                "comContent": data[i].comContent,
                                "comTime": data[i].comTime,
                                "comFrom": data[i].comFrom,
                                "comName": data[i].comName
                            })
                        }
                        data = {result: productfrom};
                        console.log(data);
                        var html = template('brandreview', data);
                        $(".comz").html(html);
                    }
                })
            }
        }
    });
}
