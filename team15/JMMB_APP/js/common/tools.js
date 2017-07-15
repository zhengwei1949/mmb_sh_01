/**
 * Created by Jepson on 2016/11/25.
 */
/* 工具函数类 tools 封装，基于 jquery  */
(function( window ){
    function tools() {}

    tools.fn = tools.prototype = {
        constructor: tools,
        author: 'Jepson'
    };

    /* 扩展函数 */
    tools.extend = tools.fn.extend = function( obj ) {
        for ( var k in obj ) {
            // 一般还会进行一个判断 if obj.hasOwnProperty( k )
            // 这里只是简单的 工具类，先简单来写
            this[ k ] = obj[ k ];
        }
    };

    /* 工具函数模块 */
    tools.extend( {
        /* 公共函数 query(url) 解析url 传的参数，变成对象键值对 */
        query : function( url ) {
            var obj = {};
            var str = url.split('?')[1];
            str.split('&').forEach(function( v, i ) {
                var arr = v.split('=');
                obj[arr[0]] = arr[1] ? arr[1] : '';
            });
            return obj;
        }
    });

    /* ajax 请求模块 */
    tools.extend( {
        /* 公共函数 getData get 请求小型回调封装 */
        // 通过ajax 请求获取数据， 传 url obj 回调fuc
        getData : function( url, data, callback ) {
            $.ajax({
                url: url,
                dataType: 'json',//服务器返回json格式数据
                type: 'get',//HTTP请求类型
                data: data,
                success: function (data) {
                    //服务器返回响应，根据响应结果，分析是否登录成功；
                    callback(data);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });

    /* 页面模板功能库 */
    tools.extend( {
        /* 分页功能 */
        fenye : function( obj ) {
            /*------  处理参数 ------*/
            var href = location.href.split('?')[0]; // 获取当前页面 url
            /* 默认参数 */
            var base = {
                pageNum : 1,     // 总共几页，不传默认置为 1
                pageVal : 'pageid',     // 控制页面切换的参数,不传默认使用 pageid，根据 pageid 切页
                start : 1,       // 参数从几 开始传 默认为 1
                pageUrl : href,  // 不赋值默认为当前页面  xxx.html?pageVal
                extraStr: ''     // 默认为空，额外需要传在 url 中的值  &name=123...
            };
            /* 将传过来的参数赋值给 base */
            for ( var k in obj ) {
                base[ k ] = obj[ k ];
            }
            // 解析 search 获取参数 对象  pageid=x
            var o = {}; o[base.pageVal] = base.start;   // 初始化参数 { base.pageVal=base.start }
            var urlObj = location.search ? tools.query( location.search ) : o;
            var pageid = parseInt( urlObj[base.pageVal] || base.start ) ;

            /* 获取元素节点 */
            var $btlast = $('.mfenye-last'); // 上一个页面
            var $btnext = $('.mfenye-next'); // 下一个页面
            var $select = $('.mfenye-select'); // select 标签


            /*------  添加功能 ------*/
            if ( !isNaN( +base.pageNum ) && !isNaN( +pageid ) ) {
                // 上一页功能
                pageid <= base.start ? $btlast.attr('href','javascript:;') : ( $btlast.attr('href', base.pageUrl + '?' + base.pageVal + '='+(pageid-1) + base.extraStr ) );
                // 下一页功能
                pageid >= (base.start + base.pageNum - 1) ? $btnext.attr('href','javascript:;') : ( $btnext.attr('href', base.pageUrl + '?' + base.pageVal + '='+(pageid+1) + base.extraStr ) );

                /*  select option 选择跳转功能  */
                $select.html('');   // 清空
                /* 添加 option */
                for ( var i = 1; i <= base.pageNum; i++ ) {
                    var option = document.createElement('option');
                    option.value = i + base.start - 1;  // 从 1 + start - 1 开始
                    option.innerHTML =  i  + ' / ' + base.pageNum;
                    /* 设置 底部选中的 option */
                    if( i == ( pageid - base.start + 1 ) ) option.selected = true;
                    $select.append( option );
                }
                /* 选中 option 切换到对应页面 */
                $select.on('change',function() {
                    location.href = base.pageUrl +  '?' + base.pageVal + '=' + $select[0]['value'] + base.extraStr;
                });
            }
        }
    });

    window.tools = tools; // 向外暴露 tools 的引用
})( window )
