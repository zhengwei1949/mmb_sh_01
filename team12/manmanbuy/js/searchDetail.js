$(function () {
    var productId = getData('productId');    //��ȡ��ǰ��ҳ·����productid��ֵ
    var category = getData('category');
    var com = getData('com');         //��ȡ��ǰ��ҳ·������������ֵ
    //����Ʒ���������ֽ���ajax����
    $.getJSON(url() + '/api/getproduct',
        {productid: productId},
        function (data1) {
            var tag1 = template('content', data1);
            $(".content").html(tag1);
            //$('.layer-left a:eq(1)').find('span').text(category + ' >');
            $('.contrast-tab ul li:eq(2)').text(com);
        });
    //�����������ݽ���ajax����
    $.getJSON(url() + '/api/getproductcom',
        {productid: productId},
        function (data2) {
            var tag2 = template('comment', data2);
            $(".comment").html(tag2);
        });

    returnTop('#reTop');    //���÷��ض�������
});