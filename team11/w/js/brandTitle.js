'use strict';
$(function(){
  setCategoryTitle( $('#category >.row') );
  function setCategoryTitle( dom, callback ){
    $.ajax({
      url: "http://mmb.ittun.com/api/getbrandtitle",
      "success": function( data ){
        var html = template('sCTitle', data);
        dom.html(html);
      }
    })
  }
})
