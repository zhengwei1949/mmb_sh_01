/**
 * Created by yangxu on 2016/11/28.
 */
$(function(){
    //从地址栏获取数据
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var urlStr=decodeURI(window.location.search.substr(1));
        var r=reg.exec(urlStr);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var link=getUrlParam("brandtitleid");
    var titleid=link.slice(-1);
    var brandTitle=getUrlParam("brandTitle");
    console.log(brandTitle);

    $.ajax({
        url:"http://127.0.0.1:9090/api/getbrand",
        type:"get",
        data:{"brandtitleid":titleid},
        dataType:"Json",
        success:function(data){
            for(var i=0;i<data.result.length;i++){
                data.result[i].listId=i+1;
                data.result[i].skipUrl="brandProductList.html?brandtitleid="+data.result[i].brandTitleId+"&pagesize=6";
            }
            $(".navTitle").html(brandTitle+"哪个牌子好");
            var html=template("brandlist",data);
            $(".wrap ul").html(html);
        }
    })
});