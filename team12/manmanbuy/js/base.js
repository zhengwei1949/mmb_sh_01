//��ȡ��ǰ��ҳ·���е�ĳ����ֵ�ĺ���
function getData(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//���ض����ĺ������������ǵ���İ�ť��
function returnTop(btn) {
    $(btn).on('click', function (e) {
        //��ȡ��ǰ��Ļ����ȥ�ĸ߶�
        var top = $('body').scrollTop();
        //�����ÿ20����Ĳ�������
        perTop = top / 25;
        //���û�����ʱ��
        var interval = setInterval(function () {
            //�ж�������ȥ����С�ڵ���0ʱ
            if (top <= 0) {
                //ֹͣ����
                clearInterval(interval);
                //��ҳ���ö�
                top = 0
            }
            //ִ��ÿ��ҳ�������
            $('body').scrollTop(top -= perTop);
        }, 20);
    })
}

//���ܵ�ֱַ�ӷ���
function url(){
    //return 'http://127.0.0.1:9090';
    return 'http://mmb.ittun.com';
}