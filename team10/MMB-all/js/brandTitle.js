/**
 * Created by yangxu on 2016/11/27.
 */
//渲染页面
$(function(){
    $.ajax({
        url:"http://127.0.0.1:9090/api/getbrandtitle",
        type:"get",
        data:{},
        dataType:"Json",
        success:function(data){
            //匹配标题名
            var reg=/(?:(\w*[\u4e00-\u9fa5]+)\s*十大品牌)$/;
            for(var i=0;i<data.result.length;i++){
                var brandTitle=reg.exec(data.result[i].brandTitle);
                data.result[i].skipUrl="brandlist.html?brandtitleid="+data.result[i].brandTitleId+"&brandTitle="+brandTitle[1];
            }
            var brandHTML=template("brand",data);
            $(".wrap ul").html(brandHTML);
        }
    });
});
