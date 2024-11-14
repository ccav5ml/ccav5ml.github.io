function $(el) {
	if(typeof(el) == 'string') {
		return(document.getElementById(el));
	}
	return(el);
}
function fillZero(num, digit) {
	var str = '' + num;
	if(str.length < digit) {
		str = '0' + str;
	}
	return str;
}
window.onload = function() {
	var oDiv1 = $('time');
	var aInput = oDiv1.getElementsByTagName('input');
	var oYear = aInput[0]; //年
	var oMonth = aInput[1]; //月
	var oDay = aInput[2] //日
	var oDiv2 = $('start');
	var aSpan = oDiv2.getElementsByTagName('span');
	var sTxtDay = aSpan[0]; //天
	var sTxtHour = aSpan[1] //小时
	var sTxtMin = aSpan[2] //分
	var sTxtSec = aSpan[3] //秒
	var oTxtTarget = document.getElementsByTagName('b')[0];
	var timer = null;
	$('btn1').onclick = function() {
		timer = setInterval(updateTime, 1000);
		updateTime();
	}
	$('btn2').onclick = function() {
		clearInterval(timer);
	}

	function updateTime() {
		var sYear = Math.abs(oYear.value);
		var sMonth = Math.abs(oMonth.value);
		var sDay = Math.abs(oDay.value);
		if (sMonth > 12 || sDay > 31){
			clearInterval(timer);
			alert('你又调皮了');
			return;
		}
		oTxtTarget.innerHTML = '<span>'+ sYear + '</span> 年 <span>' + sMonth + '</span> 月 <span>' + sDay + '</span> 日 ';
		var oEndDate = new Date(sYear, (sMonth - 1), sDay);
		var oNowDate = new Date();
		var iRemain = 0;
		iRemain = parseInt((oEndDate.getTime() - oNowDate.getTime()) / 1000);
		if (iRemain <= 0) { //判断开始时间是否小于或等于今天
			clearInterval(timer);
			iRemain = 0;
			alert('请输入大于今天的时间');
		}
		var iDay = parseInt(iRemain / 86400); //剩余天数
		var iHour = parseInt((iRemain % 86400) / 3600); //剩余小时
		var iMin = parseInt((iRemain % 3600) / 60); //剩余分钟
		var iSec = (iRemain % 60); //剩余秒

		sTxtDay.innerHTML = fillZero(iDay, 2);
		sTxtHour.innerHTML = fillZero(iHour, 2);
		sTxtMin.innerHTML = fillZero(iMin, 2);
		sTxtSec.innerHTML = fillZero(iSec, 2);
	}
}