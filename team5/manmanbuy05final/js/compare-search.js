/**
 * Created by john on 2016/11/22.
 */

$(function(){



    //请求分类标题
    $.ajax({
        //url:'http://127.0.0.1:9090/api/getcategorytitle',
        url:url.self+'/api/getcategorytitle',
        //url:'http://192.168.13.34:9090/api/getcategorytitle',
        //url:'http://mmb.ittun.com/api/getcategorytitle',
        dataType:'json',
        success:function(data){
            //console.log(data);
            for(var i=0;i<data.result.length;i++){
                var tag='';
                for(var i=0;i<data.result.length;i++){
                    tag+='<li id="'+data.result[i].titleId+'">'+data.result[i].title+'<div class="more"></div></li>';
                }
                $('.product-title')[0].innerHTML=tag;
                $('.more').on('click',function(){
                    if(this.parentNode.childNodes.length==2|| $('.juti')[0].style.display=='none'){
                        $('.juti')[0].style.display='block';
                    }else{
                        $('.juti')[0].style.display='none';
                    }
                    var li_id=this.parentNode.id;

                    //请求分类
                    $.ajax({
                        //url: 'http://mmb.ittun.com/api/getcategory',
                        //url: 'http://127.0.0.1:9090/api/getcategory',
                        url:url.self+'/api/getcategory',
                        //url: 'http://192.168.13.34:9090/api/getcategory',
                        dataType: 'json',
                        data:{titleid:li_id},
                        success: function (data) {
                            //console.log(data);
                            var tag='';
                            //console.log(data.result[0].category);
                            for(var i=0;i<data.result.length;i++){
                                tag+='<a id="'+data.result[i].categoryId+'">'+data.result[i].category+'</a>';
                            }
                            $('.juti')[0].innerHTML=tag;
                            $('li')[li_id].appendChild( $('.juti')[0]);
                            //console.log($('.juti a'));


                            $('.juti a').on('click',function(){
                                var a_id=this.id;
                                //console.log(a_id);
                                //console.log('1');
                                var text=this.innerHTML;
                                //console.log(text);

                                //请求具体商品
                                ajax_product(1);
                                //跳转页面
                                $('select').on('change',function(){
                                    ajax_product(this.value);
                                });
                                //下一页
                                $('.next').on('click',function(){
                                    var value=$('select').val();
                                    //console.log(value);
                                    value=-(-value)+1;
                                    //console.log(value);
                                    ajax_product(value);
                                });
                                //上一页
                                $('.last').on('click',function(){
                                    var value=$('select').val();
                                    //console.log(value);
                                    value=value-1;
                                    ajax_product(value);
                                });
                                function ajax_product(pageid){
                                $.ajax({
                                    //url: 'http://127.0.0.1:9090/api/getproductlist',
                                    url: url.self+'/api/getproductlist',
                                    //url: 'http://192.168.13.34:9090/api/getproductlist',
                                    dataType: 'json',
                                    data:{categoryid:a_id,pageid:pageid},
                                    success:function(data){
                                        console.log(data.result[0].productId);
                                        //console.log(data.pagesize);
                                        var pagetotal=data.pagesize;
                                        var tag='';
                                        for(var i=0;i<data.result.length;i++){
                                            tag+='<a class="detailedInfo" href="product-list.html?productid='+data.result[i].productId+'">'+data.result[i].productImg+
                                                '<div class="title">'+data.result[i].productName+'</div>'
                                                +'<div class="price">'+data.result[i].productPrice+'</div>'
                                                +'<div class="comment">'+data.result[i].productQuote+'  '
                                                +data.result[i].productCom+'</div>'+'</a>'
                                        }
                                        $('.list')[0].innerHTML=tag;
                                        $('.productlist')[0].style.display='block';
                                        $('.product-search')[0].style.display='none';
                                        $('.current')[0].innerHTML=text;
                                        var op='';
                                        for(var j=1;j<pagetotal+1;j++){
                                            op+='<option value="'+j+'">'+j+'/'+pagetotal+'</option>'
                                        }
                                        $('select')[0].innerHTML=op;
                                        $('select')[0].value=pageid;

                                        //给detailedInfo添加点击跳转
                                        //$('.detailedInfo').on('click',function(){
                                        //    window.location.href='product-list.html';
                                        //})
                                    }
                                });

                            }
                            });
                        }
                    });
                });
           }
        }
    });

});