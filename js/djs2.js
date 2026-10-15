function fillZero(num, digit) {
	var str = '' + num;
  	var len = str.length;
	while (len < digit) {
		str = '0' + str;
		len++;
	}
	return str;
}

function fillSpace(num, digit) {
	var str = '' + num;
  	var len = str.length;
	while (len < digit) {
		str = '&nbsp;' + str;
		len++;
	}
	return str;
}

function countDownT( title,oYear,oMonth,oDay,fn ) {
	var oEndDate = new Date(oYear, (oMonth - 1), oDay);
	var oNowDate = new Date();
	var maxtime = 0;
	maxtime = parseInt((oEndDate.getTime() - oNowDate.getTime()) / 1000);
	
	var timer = setInterval(function() {
		if (maxtime>0){
			var day = Math.floor(maxtime / 86400),
			hour = Math.floor((maxtime % 86400) / 3600),
			minutes = Math.floor((maxtime % 3600) / 60),
			seconds = Math.floor(maxtime%60),
			msg = "😞【"+title+"】("+oYear+"-"+fillZero(oMonth, 2)+"-"+fillZero(oDay, 2)+") 还有&nbsp;"+fillSpace(day, 3)+"&nbsp;天&nbsp;"+fillZero(hour, 2)+"&nbsp;时&nbsp;"+fillZero(minutes, 2)+"&nbsp;分&nbsp;"+fillZero(seconds, 2)+"&nbsp;秒";
			fn( msg );
			--maxtime;
		} else {
			clearInterval( timer );
			msg =  "😪【"+title+"】("+oYear+"-"+fillZero(oMonth, 2)+"-"+fillZero(oDay, 2)+") 已到，期待来年!";
			fn( msg );
		}
	}, 1000);
}

var lunar = calendar.solar2lunar();
var festival = lunar.festival;
if (festival === null || typeof(festival) === 'undefined') {festival = ""} else {festival = " " + festival};
var lFestival = lunar.lunarFestival;
if (lFestival === null || typeof(lFestival) === 'undefined') {lFestival = ""} else {lFestival = " " + lFestival};
var Term = lunar.Term;
if (Term === null || typeof(Term) === 'undefined') {Term = ""} else {Term = " " + Term};

function Tips( fn ) {
	var timer = setInterval(function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var mytime=date.toLocaleTimeString("chinese", { hour12: false });
	    	var weekString="日一二三四五六";
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		var weekday = weekString.charAt(date.getDay());
		var nowDate = year + "年" + month + "月" + day+"日 星期"+weekday+" 农历"+lunar.gzYear+"年"+lunar.gzMonth+"月"+lunar.gzDay+"日（"+lunar.Animal+"年"+lunar.IMonthCn+lunar.IDayCn+"）"+festival+lFestival+Term;
		msg = "今天是【"+nowDate+"】"+mytime+"！";
		fn( msg );
	}, 1000);
}

Tips( function( msg ) {
	document.getElementById('tips1').innerHTML = msg;
})

var week = new Date().getDay();
document.getElementById('dayimg').innerHTML = "<img id=\"fishimg\" src=\"img/fishday.png\" width=\"480px\" />";
if (week  == 5) {
	document.getElementById('friday').innerHTML = "🎉 哈哈~~今天又是星期五啦~~";
} 

window.onload = choosePic;
function choosePic() {
	if (week  == 5) {
		var myPix = new Array("Friday.jpg","Friday1.jpg","Friday2.jpg");
	} else {
		var myPix = new Array("workday.jpg","workday01.jpg","workday02.jpg","workday03.jpg","workday04.jpg","workday05.jpg","workday06.jpg","workday07.jpg","workday08.jpg","workday09.jpg","workday10.jpg","workday11.jpg","workday12.jpg","workday13.jpg");
	}
	var randomNum = Math.floor((Math.random() * myPix.length));
	document.getElementById("fishimg").src = "img/"+myPix[randomNum];
}

if (festival !== "" || lFestival !== "") {
	document.getElementById('day00').innerHTML = "🎉 嘿嘿~~今天是"+festival+lFestival+"哦~~";
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 示例：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) {
	var o = {   
		"M+" : this.getMonth()+1,	//月份   
		"d+" : this.getDate(),	//日  
		"h+" : this.getHours(),	//小时   
		"m+" : this.getMinutes(),	//分  
		"s+" : this.getSeconds(),	//秒  
		"q+" : Math.floor((this.getMonth()+3)/3),	//季度   
		"S"  : this.getMilliseconds()	//毫秒   
	};   
	if (/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for (var k in o) 
	if (new RegExp("("+ k +")").test(fmt))   
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}

var today = new Date().format("yyyy-MM-dd");
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var day6 = document.getElementById('day6');
var day7 = document.getElementById('day7');
var day8 = document.getElementById('day8');
var day9 = document.getElementById('day9');

if (today<'2026-10-01') {
	countDownT( "2026年国庆节",2026,10,1,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "2027年元旦节",2027,1,1,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "丙午马年除夕",2027,2,5,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "丁未羊年春节",2027,2,6,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年清明节",2027,4,5,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day9.innerHTML = msg;} )
} else if (today<'2027-01-01') {
	countDownT( "2027年元旦节",2027,1,1,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "丙午马年除夕",2027,2,5,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "丁未羊年春节",2027,2,6,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "2027年清明节",2027,4,5,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "2027年国庆节",2027,10,1,function( msg ) {day9.innerHTML = msg;} )
} else if (today<'2027-02-05') {
	countDownT( "丙午马年除夕",2027,2,5,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "丁未羊年春节",2027,2,6,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "2027年清明节",2027,4,5,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "2027年国庆节",2027,10,1,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "2028年元旦节",2028,1,1,function( msg ) {day9.innerHTML = msg;} )
} else if (today<'2027-02-06') {
	countDownT( "丁未羊年春节",2027,2,6,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "2027年清明节",2027,4,5,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "2027年国庆节",2027,10,1,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "2028年元旦节",2028,1,1,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "丁未羊年除夕",2028,1,25,function( msg ) {day9.innerHTML = msg;} )
} else if (today<'2027-04-05') {
	countDownT( "2027年清明节",2027,4,5,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2027年国庆节",2027,10,1,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "2028年元旦节",2028,1,1,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "丁未羊年除夕",2028,1,25,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "戊申猴年春节",2028,1,26,function( msg ) {day9.innerHTML = msg;} )
} else if (today<'2027-05-01') {
	countDownT( "2027年劳动节",2027,5,1,function( msg ) {day1.innerHTML = msg;} )
	countDownT( "2027年儿童节",2027,6,1,function( msg ) {day2.innerHTML = msg;} )
	countDownT( "2027年端午节",2027,6,9,function( msg ) {day3.innerHTML = msg;} )
	countDownT( "2027年中秋节",2027,9,15,function( msg ) {day4.innerHTML = msg;} )
	countDownT( "2027年国庆节",2027,10,1,function( msg ) {day5.innerHTML = msg;} )
	countDownT( "2028年元旦节",2028,1,1,function( msg ) {day6.innerHTML = msg;} )
	countDownT( "丁未羊年除夕",2028,1,25,function( msg ) {day7.innerHTML = msg;} )
	countDownT( "戊申猴年春节",2028,1,26,function( msg ) {day8.innerHTML = msg;} )
	countDownT( "2028年清明节",2028,4,4,function( msg ) {day9.innerHTML = msg;} )
}
