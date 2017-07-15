$(function () {
    //截取当前网页路径中categoryid的值
    var categoryid = getData('categoryId');
    //定义变量记录传递来的商品种类名
    var category;
    //对主体中的层级部分 进行第一层ajax请求
    $.getJSON(url() + '/api/getcategorybyid',
        {categoryid: categoryid},
        function (data1) {
            //记录商品种类
            category = data1.result[0].category;
            var tag1 = template('layer', data1);
            //把标签字符串添加到主体中的层级部分中
            $(".layer").html(tag1);
        });

    //对主体中的商品部分 进行第一层ajax请求
    $.getJSON(url() + '/api/getproductlist',
        {categoryid: categoryid},
        function (data2) {
            var tag1 = template('goods', data2);
            //把标签字符串添加到主体中的商品部分中
            $(".goods").html(tag1);
            //将商品的a标签地址链接进行修改，添加商品种类值，传递给下一页
            //for (var i = 0; i < $('.href').length; i++) {
            //    $('.href:eq(' + i + ')').attr('href', $('.href').attr('href:eq(' + i + ')') + '&category=' + category);
            //}
            //动态生成转页栏下拉选择表单
            var option = '';   //定义空的optipn标签
            //动态计算出页数
            var denominator = Math.ceil(data2.totalCount / data2.pagesize);
            //对页数循环
            for (var i = 0; i < denominator; i++) {
                //每遍历一次生成一个option标签
                option += '<option value="' + i + '">' + (i + 1) + '/' + denominator + '</option>';
            }
            //将按钮表单和select表单拼接成字符串
            var tag2 = '<form action="#">' +
                '<input type="button" value="上一页" class="fl page-previous"/>' +
                '<select name="" id="select">' + option + '</select>' +
                '<input type="button" value="下一页" class="fr page-next"/>' +
                '</form>'
            //将字符串渲染到页面之上
            $(".pages").html(tag2);

            //实现转页功能
            //当点击下一页按钮时
            $(".page-next").on('click', function () {
                //记录下当前点击瞬间 选择栏的val值
                var index = parseInt($('#select').val());
                //对val值++
                index += 1;
                //判断若val值等于最大页数时不执行任何操作
                if (index == denominator) {
                    return;
                }
                //使对应的下一个option栏被选中，同时使其兄弟元素失去被选中
                $('#select option:eq(' + index + ')').attr('selected', 'selected').siblings().removeAttr('selected');
                //改变select的val值
                $('#select').val(index);
                //触发select表单的change事件
                $('#select').change();
            });
//当         //点击上一页按钮时
            $(".page-previous").on('click', function () {
                var index = parseInt($('#select').val());
                index -= 1;
                if (index == -1) {
                    return;
                }
                $('#select option:eq(' + index + ')').prop('selected', 'selected').siblings().removeAttr('selected');
                $('#select').val(index);
                $('#select').change();
            });

            //当监听到change事件执行时
            $('#select').on('change', function () {
                var index2 = parseInt($(this).val());
                $(".goods").html('');   //初始化商品部分内容
                //再次发送请求获得商品数据
                $.getJSON(url() + '/api/getproductlist', {
                    categoryid: categoryid,
                    pageid: index2 + 1      //传入data
                }, function (data2) {
                    var tag3 = template('goods', data2);
                    $(".goods").html(tag3);
                    //将商品的a标签地址链接进行修改，添加商品种类值，传递给下一页
                    //for (var i = 0; i < $('.href').length; i++) {
                    //    $('.href:eq(' + i + ')').attr('href', $('.href').attr('href:eq(' + i + ')') + '&category=' + category);
                    //}
                });
            });
        });

    returnTop('#reTop');  //调用返回顶部函数
});
