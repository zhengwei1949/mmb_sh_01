 /*
 * @Author: zhengwei
 * @Date:   2016-10-19 17:07:19
 * @Last Modified by:   zwxs
 * @Last Modified time: 2016-10-27 22:51:21
 */
$(function(){
  $.ajax({
    url:"http://mmb.ittun.com/api/getindexmenu",
    success:function(data){
      var html = template('list',data);
      // console.log(html);
      $('.menu').find('ul').html(html);
    }
  })
})


//省钱控制
  var num = 0;
  //获取省钱空页面  封装成一个函数
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

// 点击上一页连接中间
$(function(){
  //设置上一页点击事件
  $(".b1").click(function(){
    if(num>0)
      num--;
    sheng(num);
    //遍历option  获得索引进行对比
    $.each($('option'),function (i,v) {
      if(i+1 === num){
        //给那个确定的添加selected属性
        v.selected = true;
      }
    })
  })

  // 点击下一页连接中间
 $('.b2').click(function(){
  if(num<14&&num>=0){
    if(num==1){
    sheng(num);
    }
   num++;
   sheng(num);
    $.each($('option'),function (i,v) {
      if(i+1 === num){
        v.selected = true;
      }
    })
  }
 })

// 中间关联上下页
$('.s1').on('change',function(){
  num = $(this).val();
  sheng(num);
})
// *****************************
})
