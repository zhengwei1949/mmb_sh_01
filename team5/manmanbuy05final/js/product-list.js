
$(function(){

    function get(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var a=get('productid');
    //console.log(a);
    $.ajax({
        url: url.self+'/api/getproduct',
        //url: 'http://127.0.0.1:9090/api/getdiscountproduct',
        dataType: 'json',
        data:{productid:a},
        success:function(data){
            console.log(data);
            var html=template('template',data);
            $('.main')[0].innerHTML=html;
        }
    });
    $.ajax({
        url:url.self+'/api/getproductcom',
        dataType: 'json',
        data:{productid:a},
        success:function(data){
            console.log(data);
            var html=template('template1',data);
            $('.comment')[0].innerHTML=html;
        }
    });
  });

