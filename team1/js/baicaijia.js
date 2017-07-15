/**
 *  @author lyc
 *
 */

(function($) {
  'use strict';
    var origin = '//mmb.ittun.com',
    url = {
      title: origin + '/api/getbaicaijiatitle',
      productList: origin + '/api/getbaicaijiaproduct'
    },
    getUrlParam = function(name) {
        var reg = new RegExp("(?:^[&|?])" +
            name + "=([^&]*)(?:&|$)");
        var r = window.location.search.match(reg);
        if (r != null) {
          return decodeURI(r[1]);
        }
        return null;
    },
    getQueryStr = function(querystr){
      var qstr = querystr || window.location.search,
          qarr = qstr.slice(1).split('&').map(s => s.split('=')),
          qobj = {};
          if(qarr.length == 0){
            return qobj;
          }
          qarr.forEach(function(v){
            qobj[v[0]] = v[1];
          });
          return qobj;
    },
    zproductList = [];
    $(function() {
      var obj = getQueryStr();
      if(!obj.titleid) {
        obj.titleid = 0;
      }
      setTitle($('.bcj-title'), obj.titleid);
      setProductList($('.bcj-list'), obj.titleid);

      function setTitle(dom, titleid) {
      $.getJSON( url.title,
          function(data) {
              var html = template('bcjTitle', data);
              var $title = $(html).appendTo(dom);
              //顶部a标签点击事件
              $title.find('a').on('click', function(e){
                obj = getQueryStr(this.href.slice(this.href.indexOf('?')));
                console.log(obj.titleid);
                if(obj.titleid){
                  topSwipe($tabs, obj.titleid);
                  $(this).parents('ul').find('.active').removeClass('active');
                  $(this).parent('li').addClass('active');
                }
                setProductList($('.bcj-list'), obj.titleid);
                //取消默认事件
                //
                e.preventDefault();
              });
              var $tabs = $title.find('.ul-wapper .tabs');
              // dom.html(html);
              var titleLi = $title.find('.ul-wapper .tabs li');
              var tabsUlWidth = 0;
              for (var i = 0; i < titleLi.length; i++) {
                  tabsUlWidth += $(titleLi[i]).width();
              }
              var windowWidth = $(window).width();
              if (windowWidth < 768) {
                  $tabs.css('width', tabsUlWidth + 38);
              }
              $(titleLi[titleid || 0]).addClass('active');
              topSwipe($tabs, obj.titleid);
          });
      }

      function topSwipe(dom, titleid) {
          var domWidth = dom.width();
          var domParentWidth = dom.parent().width();
          var buffer = 50;
          var maxPosition = 0;
          var minPosition = domParentWidth - domWidth;
          var maxSwipe = 0 + buffer;
          var minSwipe = minPosition - 50;
          var startX = 0;
          var moveX = 0;
          var endX = 0;
          var distanceX = 0;
          var currentX = 0;
          var li = dom.find('li');
          for (var i = 0; i < titleid; i++) {
              currentX -= $(li[i]).width();
          }
          if (currentX < minPosition) {
              currentX = minPosition
          } else if (currentX > maxPosition) {
              currentX = maxPosition;
          }
          addTransition(dom);
          setTranslateX(dom, currentX)
          dom[0].addEventListener('touchstart', function(e) {
              startX = e.touches[0].clientX;
          });
          dom[0].addEventListener('touchmove', function(e) {
              moveX = e.touches[0].clientX;
              distanceX = moveX - startX;
              // removeTransition(dom);
              if ((currentX + distanceX) > minSwipe && (currentX + distanceX) < maxSwipe) {
                  // console.log(currentX + distanceX);
                  addTransition(dom);
                  setTranslateX(dom, (currentX + distanceX));
              }
          });
          dom[0].addEventListener('touchend', function(e) {
              // endX = e.changedTouches[0].;
              if ((currentX + distanceX) > maxPosition) {
                  currentX = maxPosition;
                  addTransition(dom);
                  setTranslateX(dom, currentX);
              }
              //小于最小定位的时候
              else if ((currentX + distanceX) < minPosition) {
                  currentX = minPosition;
                  addTransition(dom);
                  setTranslateX(dom, currentX);
              } else {
                  //记录当前滑动完成后的定位
                  currentX = currentX + distanceX;
              }
          });

          function addTransition(dom) {
              dom.css('transition', "all 0.2s");
          }

          function removeTransition(dom) {
              dom.css('transition', "none");
          }

          function setTranslateX(dom, x) {
              dom.css('transform', "translateX(" + x + "px)");
          }
      }

      function setProductList(dom, titleid, callback) {
        history.pushState({'titleid': titleid}, document.title, '?titleid='+titleid);
        if(!zproductList[titleid]){
          $.ajax({
              url: url.productList,
              data: { "titleid": titleid },
              success: function(data) {
                  var html = template('bcjProductList', data);
                  zproductList[titleid] = $(html);
                  zproductList.forEach(function(v){
                    v.hide();
                  });
                  dom.append(zproductList[titleid]);
                  zproductList[titleid].show();
              }
          });
        } else {
          zproductList.forEach(function(v){
            v.hide();
          });
          zproductList[titleid].show();
        }
      }
      window.onpopstate = function(event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        $('.bcj-title .ul-wapper .tabs li')
          .removeClass('active')[window.history.state.titleid].classList.add('active');
        topSwipe($('.ul-wapper .tabs'), window.history.state.titleid);
        setProductList($('.bcj-list'), window.history.state.titleid);

      };
    });
// $('.back a').click(function(e){
//   history.back();
//   e.preventDefault();
// });
})(Zepto);
