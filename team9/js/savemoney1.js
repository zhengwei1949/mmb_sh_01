/**
 * Created by Administrator on 2016/11/30.
 */
/**
 * Created by admin on 2016/11/22.
 */

$(function(){

    //����location��ַ
    var url=location.search;//http://localhost:63342/MMB/page/detailA.html?productid=0
    console.log(url);

    var num=url.split('=');
    //console.log(num+','+(typeof  num));
    console.log( num);

    //http://mmb.ittun.com/api/getmoneyctrlproduct
    $.getJSON('http://127.0.0.1:9090/api/getmoneyctrlproduct?productid='+num[1],function(data){
        console.log(data);
        //��ģ�����������
        var  html=template('tpl',data);
        //��Ⱦҳ��
        $('.MMB_main').html(html);

        //��������
        //��������
        var text=$('textarea'),
            btn=$(':submit'),
            list=$('.list'),
            ul=$('.list ul');

        //ҵ���߼�

        /**
         * 1. �������� return
         * 2. ��̬����li ���ı����е����� �ύ��li  Ȼ������ı���
         * 3. ���뵽��ǰ��
         */

        btn.on('click',function(){
            if(!text.val()){
                return;
            }
            //������ǰ��
            ul.prepend('<li><span>'+text.val()+'</span></li>');
            //����ı����ڲ�����
            text.val("");





        });












    });

});
