/**
 * Created by Chen on 2016/11/29.
 */
$(function () {
    function GetQueryString(name){
        var reg = new RegExp('(^|&)' + name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURI(r[2]);
        }
        return null;
    }
    var num = GetQueryString('categoryId');
    var txt = GetQueryString('category');
    $('.new').html(txt);
    var pageNum = 1;
    $.ajax({
        url:'http://mmb.ittun.com/api/getproductlist',
        data:{categoryid:num,pageid:pageNum},
        success:function (data) {
            var html = template('pro', data);
            $('.son_main').html(html);
            console.log(data.totalCount);
            var pageId = data.totalCount;
            var tem = Math.ceil(pageId/10);
            $('select')[0].value = Math.ceil(pageId/10);
            var opt = '';
            for(var i = 0; i < tem; i++){
                opt +=  '<option value="'+(i+1)+'">' +(i+1)+ '/' + tem + '</option>'
            }
            $('select').html(opt);
        }
    });
    //中间选择框
    $('select').on('change',function () {
        pageNum = this.value.substr(0,1);
        $.ajax({
            url:'http://mmb.ittun.com/api/getproductlist',
            data:{categoryid:num,pageid:pageNum},
            success:function (data) {
                var html = template('pro', data);
                $('.son_main').html(html);
            }
        });
    });
    //上一页
    $('.prv').on('click',function () {
        pageNum--;
        if(pageNum<1){
            return pageNum = 1;

        }

        $("select")[0].value = pageNum ;
        $.ajax({
            url:'http://mmb.ittun.com/api/getproductlist',
            data:{categoryid:num,pageid:pageNum},
            success:function (data) {
                var html = template('pro', data);
                $('.son_main').html(html);
            }
        });
    });
    //下一页
    $('.nex').on('click',function () {
        pageNum++;
        var m = $('select').children().length;
        if(pageNum>m){
            return pageNum = m;
        }
        $("select")[0].value = pageNum ;
        $.ajax({
            url:'http://mmb.ittun.com/api/getproductlist',
            data:{categoryid:num,pageid:pageNum},
            success:function (data) {
                var html = template('pro', data);
                $('.son_main').html(html);
            }
        });
    });
});


