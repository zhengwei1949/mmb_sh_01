$(function () {
    //在页面一加载就先获得页面的商品数据
    $.getJSON(url() + '/api/getgsproduct', {shopid: 0, areaid: 0}, function (data) {
        var tag = template('products', data);
        //for (var k in data.result) {
        //    data.result[k].productPrice;
        //}
        console.log(data);
        $('.content-products').html(tag);
    });

    var flag;   //定义一个记录
    var shopCookie = 0, areaCookie = 0;  //定义cookie
    //当点击tab栏的标题时触发
    $('.tabs-header li').on('click', function () {
        //判断下本标题的id是否和记录的值相同
        if ($(this).attr('id') == flag) {
            //若相同说明上一次刚刚点击过该栏，但还没做任何的操作
            //应该关闭该栏的子列表栏
            $('.tabs-list').html('');
            //使三角图标变为向下指向
            $(this).find('span:eq(1)').css({'transform': 'rotate(' + 0 + 'deg)'});
            //使记录初始化
            flag = null;
            return;
        } else {
            //若flag记录不相同说明上一次没有点击过该栏，本次点击应该会出现子列表细信息
            var shopid = 0, areaid = 0;     //定义shopid和areaid
            //对flag赋值，标记为已点击该栏
            flag = $(this).attr('id');
            //$(this).parent().next().find('ul:eq(1)').html('');
            //将所有tab栏的三角图标变为向下指向、初始化所有子列表栏
            $('.tabs-header li').find('span:eq(1)').css({'transform': 'rotate(' + 0 + 'deg)'});
            $('.tabs-list').html('');
            //将本栏的三角图标变为向上指向
            $(this).find('span:eq(1)').css({'transform': 'rotate(' + 180 + 'deg)'});

            //进行点击判断
            //若点击的是第一个tab栏
            if ($(this).attr('id') == 'header0') {
                //保存当前的tab位置
                $that = $(this);
                //说明点击的是店铺栏，则向店铺信息数据发送请求，渲染到页面
                $.getJSON(url() + '/api/getgsshop', function (data) {
                    var tag = template('list0', data);
                    $('.tabs-list').html(tag);
                    //将符合上一次点击后的下拉选项的选中效果根据cookie值保留下来
                    $('.tabs-list li:eq(' + shopCookie + ')').children('span:last-child').show();
                    //点击每一个下拉的选项时出现的效果
                    $('.tabs-list li').on('click', function () {
                        //记录下当前选中的子列表的文本内容
                        var text = $(this).children('span:first-child').text();
                        //将文本内容显示到父tab上面去
                        $that.children('span:first-child').text(text);
                        //点击时可以出现本选项的选中效果
                        $(this).siblings().children('span:last-child').hide();
                        $(this).children('span:last-child').show();
                        //记录本次的shopid的值
                        shopid = $(this).attr('id');
                        //记录shopCookie的值
                        shopCookie = shopid;
                        //根据shopid值的改变再次向后台请求数据
                        $.getJSON(url() + '/api/getgsproduct', {
                            shopid: shopid,
                            areaid: areaid
                        }, function (data) {
                            //局部刷新页面商品内容
                            var productTag = template('products', data);
                            $('.content-products').html(productTag);
                        });
                        //延时0.2秒执行关闭子列表的操作
                        setTimeout(function () {
                            $('.tabs-list').html('');
                            $('.tabs-header li').find('span:eq(1)').css({'transform': 'rotate(' + 0 + 'deg)'});
                            flag = null;
                        }, 200);
                    })
                });
                //若点击的是第二个tab栏
            } else if ($(this).attr('id') == 'header1') {
                //保存当前的tab位置
                $that = $(this);
                //说明点击的是地区栏，则向地区信息数据发送请求，渲染到页面
                $.getJSON(url() + '/api/getgsshoparea', function (data) {
                    var tag = template('list1', data);
                    $('.tabs-list').html(tag);
                    //将符合上一次点击后的下拉选项的选中效果根据cookie值保留下来
                    $('.tabs-list li:eq(' + areaCookie + ')').children('span:last-child').show();
                    //点击每一个下拉的选项时出现的效果
                    $('.tabs-list li').on('click', function () {
                        //记录下当前选中的子列表的文本内容
                        var text = $(this).children('span:first-child').text();
                        //由于文本过长，只截取文本的前两个字符
                        text = text.substr(0, 2);
                        //将文本内容显示到父tab上面去
                        $that.children('span:first-child').text(text);
                        //点击时可以出现本选项的选中效果
                        $(this).siblings().children('span:last-child').hide();
                        $(this).children('span:last-child').show();
                        //记录本次的areaid的值
                        areaid = $(this).attr('id');
                        //记录areaCookie的值
                        areaCookie = areaid;
                        //根据areaid值的改变再次向后台请求数据
                        $.getJSON(url() + '/api/getgsproduct', {
                            shopid: shopid,
                            areaid: areaid
                        }, function (data) {
                            //局部刷新页面商品内容
                            var productTag = template('products', data);
                            $('.content-products').html(productTag);
                        });
                        //延时0.2秒执行关闭子列表的操作
                        setTimeout(function () {
                            $('.tabs-list').html('');
                            $('.tabs-header li').find('span:eq(1)').css({'transform': 'rotate(' + 0 + 'deg)'});
                            flag = null;
                        }, 200);
                    })
                });
                //否则说明点击的是第三个tab栏
            } else if ($(this).attr('id') == 'header2') {
                //由于内容是固定的，这里就用字符串拼接的方式去得到数据
                var tag = '<li>全部价格' +
                    '<span class="iconfont icon-gangbi fr" style="display: block"></span>' +
                    '</li>' +
                    '<li>1-3元</li>' +
                    '<li>3-5元</li>' +
                    '<li>5-10元</li>' +
                    '<li>10-15元</li>' +
                    '<li>15元以上</li>';
                //渲染到页面
                $('.tabs-list').html(tag);
            }else{
                return;
            }
        }
    });

    returnTop('#reTop');    //反回顶部
});
