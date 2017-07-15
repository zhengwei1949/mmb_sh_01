 /*
 * @Author: zhengwei
 * @Date:   2016-10-19 17:07:19
 * @Last Modified by:   zwxs
 * @Last Modified time: 2016-10-27 22:51:21
 */
 //菜单
$(function(){
  $.ajax({
    url:"http://mmb.ittun.com/api/getindexmenu",
    success:function(data){
      var html = template('list',data);
      $('.menu').find('ul').html(html);
      // console.log(data);
    }
  })
})


//省钱控制
  var num = 0;
$(function(){
function  sheng(num){
    $.ajax({
    url:'http://mmb.ittun.com/api/getmoneyctrl?pageid='+num,
    success:function(data){
      var html = template('lis',data);
      $('.center').find('ul').html(html);
    }
  })
}
sheng(num);
})


// 菜单
  $(".mmore").click(function (){
    $(".menu").toggleClass('hide');  
  })
