/**
 * Created by crazy on 2016/11/23.
 */
$(function () {
    // 分类标题渲染
    function setBox(dom) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorytitle",
            success:function (data) {
                var $dom = $(dom);
                data = data.result;
                var boxHtml = "";
                for(var i =0;i<data.length;i++){
                    boxHtml += '<li class="list1"><a href="javascript:void(0)" data-titleid="'+data[i].titleId+'">'+data[i].title+'<span class="icon-jiantouyoujiantou iconfont"></span></a><ul class="hide categroy_content clearfix"></ul></li>'
                }
                $dom.html(boxHtml);
                setContent($dom);
                console.log(data);
            }
        })
    }
    setBox($('#category > .category_box > ul'));
    // function linkTo(url,id){
    //     console.log(id);
    //     var data = {name:'aa',price:'22',realP:'1'};
    //     var html= '<div id="name">'+data.name+'</div><div id="price">'+data.price+'</div>';
    //     $('body').html(html);
    //     // format(html,{name:data.name,price:data.price});
    //
    //
    // }

    // 分类内容渲染
    function setContent(dom){
        $(dom).off('click').on('click','li',function (e) {
            e.stopPropagation();
            var $this = $(this);
            var $ul = $this.find('ul');
            var id = $this.find('a').eq(0).data('titleid');
            var listData = sessionStorage.getItem('listData'+id);
            // var $target = $(e.target).closest('li');
            // if(!$target.hasClass('list1')){
            //     linkTo('1',$target.data('title-id'));
            //     return;
            // }
            if(!$ul.hasClass('hide')){
                $ul.stop().slideToggle(500);
                return;
            }
            if(listData){
                var data = JSON.parse(listData);
                renderList($ul,data);
                return;
            }


            $.ajax({
                url:"http://mmb.ittun.com/api/getcategory",
                data: { "titleid": id },
                success:function (data) {
                    sessionStorage.setItem('listData'+id,JSON.stringify(data));
                    renderList($ul,data);
                }
            })
            function renderList($dom,data){
                var contentHtml = '';
                data = data.result;
                for(var i = 0;i<data.length;i++){
                    contentHtml += '<li data-title-id="' + data[i].titleId + '"><a href="list.html?categoryId='+data[i].categoryId  +'&category='+data[i].category+'"  >'+data[i].category+'</a></li>'
                }
                $ul.siblings('a').children('span').toggleClass('godown');
                $dom.html(contentHtml).stop().slideToggle(500);
            };
        });
    }

    $('#goTop').on('click',function () {
        document.body.scrollTop = 0;
    })
})
