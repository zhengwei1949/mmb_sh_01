//ajax请求数据函数
$(function () {
    $.ajax({
        type: 'get',
        url: url() + '/api/getcoupon',
        data: {},
        dataType: 'json',
        success: function (data) {
            var html = template('result', data);
            $('.content').html(html);
        }
    })
})
//$(function(){
//    $.ajax({
//        type:"get",
//        url:"../js/hldm_2.json",
//        data:{},
//        dataType:"json",
//        success:function(data){
//          var tag="";
//            $.each(data,function(key){
//                tag+= '<li>'+
//                    '<a href="javascript:;" class="clearfix">'+
//                    '<img src='+data[key].src+' alt=""/>'+
//                    '<div class="book_right">'+
//                    '<h5>'+data[key].name+'</h5>'+
//                    '<p>'+data[key].continuity+'</p>'+
//                    '<p>'+data[key].update+'</p>'+
//                    '<p>下载更新数:<span>459</span></p>'+
//                    '</div>'+
//                    '</a>'+
//                    '</li>';
//            });
//            $(".lzdm_main>ul:eq(1)").html(tag);
//        }
//    });
//});