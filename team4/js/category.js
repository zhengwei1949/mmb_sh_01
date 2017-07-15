/**
 * Created by chenlei on 2016/11/25.
 */
$(function(){
    ajax(getUrl()+"getcategorytitle","get","json",{},function(data){
        var title = template("listTitle",data);
        $(".catalogry").html(title);
        $(".catalogry").find("h3").each(function(i,v){
            this.index = i;
            $(v).on("click",function(){
                var that = this.index;
                if($(this).siblings(".lists").length===0){
                    ajax(getUrl()+"getcategory","get","json",{"titleid":this.index},function(data){
                        var listContain = template("listContain",data);
                        $($(".titleLi")[that]).append(listContain);
                    });
                }
               $(this).siblings(".lists").toggle();
            });
        })
    })
})
//·â×°ajaxÇëÇó
function ajax(url,type,dataType,data,callback) {
    $.ajax({
        url:url,
        type:type,
        dataType:dataType,
        data:data,
        success:function(data){
            callback&&callback(data);
        }
    })
}