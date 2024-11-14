$(document).ready(function(){
	//高度设置
	var height = $(window).height();
	$('#myiframe').height(height);
})
function changeFrameHeight(){
	var ifm= document.getElementById("myiframe");
	$('#myiframe').height($(window).height());
}
window.onresize=function(){
	changeFrameHeight();
}
