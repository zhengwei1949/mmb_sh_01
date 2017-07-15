window.onload=function(){
    var productid= $.getUrlParam("productid");
    var url="http://mmb.ittun.com/api/getdiscountproduct/?productid="+productid;
    $.ajax({
        "type":"get",
        "url": url,
        "success":function(data){
            var a=template('shopinfo',data);
            $('#referral').html(a);
            var ab=template('suggest',data);
            $('#recommend').html(ab);
        }
    });
};


$("#backtrack").click(function(){
    $('body').animate({"scrollTop":0},1000)
})
