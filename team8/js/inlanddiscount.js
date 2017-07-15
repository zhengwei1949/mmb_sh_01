$.ajax({
    "url": "http://mmb.ittun.com/api/getinlanddiscount",
    "success":function(data){
        var a=template('briefTable',data);
        $('#content-con').html(a);

    }
})
$("#backtrack").click(function(){
    $('body').animate({"scrollTop":0},1000)
})