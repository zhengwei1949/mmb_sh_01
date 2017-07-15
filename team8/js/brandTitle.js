/**
 * Created by DELL on 2016/11/30.
 */
window.onload=function(){
    getAjax1();
}
function getAjax1(){
    //ajax
    $.ajax({
        url:"http://mmb.ittun.com/api/getbrandtitle",
        //url:"http://192.168.13.210:9090/api/getbrandtitle",
        data:{},
        success:function(data){
            var html=template("brand",data);
            $(".brand_list1").html(html);

        }
    });
}