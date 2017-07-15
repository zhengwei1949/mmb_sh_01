//使用变量select接收沙箱的结果
var select = 

(function () {

//将数组的push方法保存到push变量中
var push = [].push;

// 如果出现了错误那么就需要重写 push
try {
  var div = document.createElement( 'div' );
  div.innerHTML = '<p></p>';
  var arr = [];
  push.apply( arr, div.getElementsByTagName( 'p' ));
} catch ( e ) {
//因为兼容性问题，push不能用的话，就用这种方法
  push = {
    //添加一个apply成员方法，第一个参数是结果数组，第二个参数是要添加的伪数组
    apply: function ( array1, array2 ) {
      //循环将arr2中的内容添加到arr1中。
      for ( var i = 0; i < array2.length; i++ ) {
        array1[ array1.length++ ] = array2[ i ]; 
      }
    }
  };
}


// 基本函数, support 对象, 验证 qsa 与 byclass
  //正则表达式对象
// 正则表达式
var rnative = /\{\s*\[native/;
var rtrim = /^\s+|\s+$/g;
//                          1           2         3     4
var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;





//能力检测
// 基本函数, support 对象, 验证 qsa 与 byclass
var support = {};

support.qsa = rnative.test( document.querySelectorAll + '' );
support.getElementsByClassName = 
	rnative.test( document.getElementsByClassName + '' );
support.trim = rnative.test( String.prototype.trim + '' );
support.indexOf = rnative.test( Array.prototype.indexOf + '' );






// 基本方法
function getByClassName ( className, node ) {
  node = node || document;
  var allElem, res = [], i;

  if ( support.getElementsByClassName ) {
    return node.getElementsByClassName( className );
  } else {
    allElem = node.getElementsByTagName( '*' );
    for ( i = 0; i < allElem.length; i++ ) {
      if ( allElem[ i ].className === className ) {
        res.push( allElem[ i ] );
      }
    }
    return res;
  }
}

// 自定义实现 trim 方法
//自定义myTrim方法，实现兼容的trim方法
var myTrim = function ( str ) {
	// 表示两端去空格, 然后返回去除空格的结果
	if ( support.trim ) {
		return str.trim();
	} else {
		// 自定义实现  
    //进行正则替换，将str字符串中匹配rtrim正则的内容替换为‘’
		return str.replace( rtrim, '' );
	}
}
/*自定义myIndexOf方法，实现兼容的indexOf方法，
查找search元素在array数组中的下标，没有返回-1
search是传过去的数据
startIndex是在那个地方开始
*/
var myIndexOf = function ( array, search,startIndex) {
 startIndex = startIndex || 0;
  if ( support.indexOf ) {
    //返回search在array中的下标，如果没有返回-1
    return array.indexOf( search,startIndex);
  } else {
    for ( var i = 0; i < array.length; i++ ) {
      if ( array[ i ] === search ) {
        return i;//返回的是对应的下标
      }
    }
    return -1;
  }
}

//实现元素去重复的unique函数，把数组中重复的元素进行去除
var unique = function ( array ) {
  //定义一个新数组
  var resArray = [], i = 0;
  //循环array数组
  for ( ; i < array.length; i++ ) {
    //如果array[i]元素在resArray中没有找到
    if ( myIndexOf( resArray, array[ i ] ) == -1 ) {
      //然后把array[i]添加到数组resArray中
      resArray.push( array[ i ] );
    }
  }
  return resArray;
} 

//实现基本选择器的判断以及返回对应选择器的元素的方法
function basicSelect ( selector, node ) {
  node = node || document;
  var m, res;
  /*提取selector字符串中匹配rbaseselector正则的内容，
  赋值给m，如果有提取到，m就有值，没有提取到，m就没有值(undefined)*/
  if ( m = rbaseselector.exec( selector ) ) {
    //id选择器
    if ( m[ 1 ] ) { // id
      res = document.getElementById( m[ 1 ] );
      if ( res ) {
        return [ res ];
      } else {
        return [];
      }
    } 
     //类选择器
    else if ( m[ 2 ] ) {  // class
      // return node.getElementsByClassName( m[ 2 ] );
      return getByClassName( m[ 2 ], node );
      //*
    } else if ( m[ 3 ] ) {
      return node.getElementsByTagName( m[ 3 ] );
      //标签选择器 
    } else if ( m[ 4 ] ) {
      return node.getElementsByTagName( m[ 4 ] );
    }
  }
  return [];
}

//处理后代选择器的方法
function select2 ( selector, results ) {

  results = results || [];
//清除掉查询字符串的前后空格
    selector = myTrim(selector);
    //按照空格进行分隔
  var selectors = selector.split( ' ' );

  // 假定 'div p .c'
//定义两个数组，node数组设置为document意为从document开始查找。
  var arr = [], node = [ document ];
//遍历selectors

  for ( var j = 0; j < selectors.length; j++ ) {
    for ( var i = 0; i < node.length; i++ ) {
      //在node[j]中查找选择器selectors[i]的内容，将至添加到数组arr中
      arr.push.apply( arr, basicSelect( selectors[ j ], node[ i ] ));
    } 
    //将查询到的结果赋值给node。
    node = arr;
    //将arr数组还原为[]，以备下一次的查询
    arr = [];
  }
//将结果node添加到results中
  push.apply( results, node );
  //将results去重复并返回
  return results;

}
//准备选择器函数select,第一个参数selector是选择字符串，第二个参数results是结果数组
function select ( selector, results ) {
	results = results || [];
  var m, temp, selectors, i, subselector;
	//判断selector是不是字符串类型的
  if ( typeof selector != 'string' ) return results;

  // 表明参数都没有问题, 接下来就是如何选择
  // 首先判断 qsa 是否可用
  // 然后再 一步步的 自己实现
  //如果系统中存在qsa方法
  if ( support.qsa ) {//使用系统的qsa方法获得选择器对应的元素
    push.apply( results, document.querySelectorAll( selector ) );
  } else {//如果系统中不存在qsa方法
    // 不存在再来考虑自己实现
    //按照逗号分隔选择器字符串，得到数组selectors
    selectors = selector.split( ',' );
    // 循环
    //遍历数组selectors
    for ( i = 0; i < selectors.length; i++ ) {
      //去除selectors[i]的前后空格的选择器字符串赋值给subSelector
      subselector = myTrim( selectors[ i ] );
      //如果是符合正则表达式的subSelector，那么subSelector一定是基本选择器
      // 接下来就是 处理 subselector
      if ( rbaseselector.test( subselector ) ) {
        // 基本选择器
        //那就把选择器字符串对应的元素添加到结果数组中
       result.push.apply( results, basicSelect( subselector ) );
      } else {
        // select2 函数
        //如果不符合正则表达式的subSelector，那么subSelector就应该是带空格的
        { //那就调用select2获得后代元素，并将其添加到results数组中
        select2( subselector, results );
      }
    }
  }
  // 返回 result
  //返回去除了重复的数组结果。
  return unique( results );
}

//返回select函数作为沙箱的返回结果
return select;
}();
