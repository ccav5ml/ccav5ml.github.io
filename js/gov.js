function resizeIframe() {
	var frame = document.getElementById('myiframe');
	frame.style.height = (window.innerHeight - 150) + 'px';
}

window.addEventListener('resize', resizeIframe);
resizeIframe(); // 初始化调整iframe高度
