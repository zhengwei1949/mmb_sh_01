/**
 * Created by admin on 2016/11/22.
 */

$(function(){
    $.getJSON('http://127.0.0.1:9090/api/getinlanddiscount',null,function(data){
        console.log(data);
        var html=template('tpl',data);
        $('.product').html(html);


    });







});


