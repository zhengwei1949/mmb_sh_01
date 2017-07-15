/**
 * @Author: zq
 * @Date:   2016-11-21 20:52:00
 * @Last Modified by:   zq
 * @Last Modified time: 2016-11-25 16:58:00
 */

$(function () {
    //1. �������ݲ���
    $.ajax({
        url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getmoneyctrl'],
        type: 'get',
        data: {pageid: 0},
        dataType: 'json',
        async: 'true',
        success: function (data) {
            var html = '';
            for (var k in data.result) {
                html +=  '<li>'
                    +'<a href="#" id="'+data.result[k].productId+'">'
                    + '<span class="left_pic">' + data.result[k].productImgSm + '</span>'
                    + '<span class="right_text">'
                    + '<i>' + data.result[k].productName + '<n>' + data.result[k].productPinkage + '</n></i>'
                    + '<span class="price">'
                    + '<span>' + data.result[k].productFrom + '|' + data.result[k].productTime + '</span>'
                    + '<span class="comment fr">'
                    + '<s class="glyphicon glyphicon-comment"></s>'
                    + '<span>' + data.result[k].productComCount + '</span>'
                    + '</span>'
                    + '</span>'
                    + '</a>'
                    + '</li>'
            }
            $('.product ul').html(html);

            /* 2.��Ⱦҳ�������˵� */
            var fenmu = data.pagesize;
            var pages = Math.ceil(data.totalCount / fenmu);
            var selStr = '';
            for (var i = 0; i < pages; i++) {
                selStr += '<option value="' + i + '">' + (i + 1) + '/' + pages + '</option>';
            }
            selStr = '<select name="" id="">'
                + selStr
                + '</select>';
            $('.page form').html(selStr);

            /* 3.��Ⱦ��ɺ󣬸�selectע��change�¼�����������ҳ��number���������ı�ʱ������select��valueֵ�����Σ�����ajax���� */
            $('.page form select').on('change', function () {
                var pageid = this.value;
                /*���̨��������*/
                $.ajax({
                    url: 'http://' + tool.baseURL + ':' + tool.basePort + tool.apiHub['getmoneyctrl'],
                    dataType: 'json',
                    data: {pageid: pageid},
                    /* ���ﴫ�ļ�ֵ�ԣ�ǰ���pageid�ǽӿ��ĵ��ṩ�ģ���������Լ���ȡ����ֵ */
                    type: 'get',
                    success: function (data) {
                        //�ظ�����ҳ��ʱ����Ⱦ���̣�ֱ���ù����ü���
                        var html = '';
                        for (var k in data.result) {
                            html += '<li>'
                                +'<a href="#" id="'+data.result[k].productId+'">'
                                + '<span class="left_pic">' + data.result[k].productImgSm + '</span>'

                                + '<span class="right_text">'
                                + '<i>' + data.result[k].productName + '<n>' + data.result[k].productPinkage + '</n></i>'
                                + '<span class="price">'
                                + '<span>' + data.result[k].productFrom + '|' + data.result[k].productTime + '</span>'
                                + '<span class="comment fr">'
                                + '<s class="glyphicon glyphicon-comment"></s>'
                                + '<span>' + data.result[k].productComCount + '</span>'
                                + '</span>'
                                + '</span>'
                                + '</a>'
                                + '</li>'
                        }
                        $('.product ul').html(html);
                    },
                    fail: function (error) {
                        alert('����ʧ��');
                    }
                })
            });


            /* 4.����ʵ�ֵ����һҳ��һҳ���� */
            $('.next_page').on('click', function () {
                //�Ȼ�ȡ����ǰselect��valueֵ
                //�����һҳʱ����ʵ����Ҫ��ת����ǰҳ��Ӧ��option����һ��option
                var pageIndex = parseInt($('.page form select')[0].value);
                console.log(pageIndex);
                if(pageIndex >= pages-1){
                    pageIndex = pages-1;
                    return;
                }
                $('.page form select option').removeAttr('selected').eq(pageIndex+=1).attr('selected', true);
                $('.page form select').val(pageIndex);
                $('.page form select').change();
            });
            $('.pre_page').on('click',function(){
                var pageIndex = parseInt($('.page form select')[0].value);
                console.log(pageIndex);
                if(pageIndex <=0){
                    pageIndex = 0;
                    return;
                }
                $('.page form select option').removeAttr('selected').eq(pageIndex=pageIndex-1).attr('selected', true);
                $('.page form select').val(pageIndex);
                $('.page form select').change();
            })

        },
        fail: function (error) {
            alert('��������ݲ�����');
        }
    });
});