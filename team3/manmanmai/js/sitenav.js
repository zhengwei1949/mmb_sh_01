$(function(){
    $(".container").css('minHeight', $(window).height() - $("footer").get(0).offsetHeight- $("header").height());
    console.log(window.screenHeight);

	$.ajax({
		type:"get",
		url:"http://127.0.0.1:9090/api/getsitenav",
		async:true,
		dataType:'json',
		success:function(data){
			var html=template("sitenav",data);
			$(".container").html(html);
		}
	});
});