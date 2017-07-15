/**
 * Created by King on 2016/11/27.
 */
$(function () {
    var rex=/hide/;
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getcategorytitle',
        dataType:'json',
        success:function(data){
            var html=template('cotegory',data);
            $('.cotegory').html(html);
            $('section >.cotegory> li > a').on('click',function () {
                if(rex.test($(this).siblings('ul').get(0).className)){
                    $(this).siblings('ul').toggleClass('hide');
                    getData($(this),this.id);
                } else {
                    $(this).siblings('ul').toggleClass('hide');
                    // console.log(this.id);
                }
            })
        }
    })


    function getData(dom,num,callback) {
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:9090/api/getcategory',
                data:{"titleid":num},
                dataType:'json',
                success:function(data) {
                    // data=data.result;
                    var html = template('down', data);
                    dom.siblings('ul').html(html);
                }
            })
    };


})