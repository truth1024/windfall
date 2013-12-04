// JavaScript Document
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.call('hideToolbar');
		});
var oFooter = document.getElementById('footer');
var aSpan = oFooter.getElementsByTagName('span');
var aLi = oFooter.getElementsByTagName('li');
var aSubNav = oFooter.getElementsByTagName('div');
var	arrA0 = aSubNav[0].getElementsByTagName('a');
var	arrA1 = aSubNav[1].getElementsByTagName('a');
var	arrA2 = aSubNav[2].getElementsByTagName('a');
var iSubHeight = arrA0[0].offsetHeight*arrA0.length;
	for(var i=0;i<aSpan.length;i++){
		aSpan[i].index=i;
		aSpan[i].onclick=function(e){
			for(var i=0;i<aSubNav.length;i++){
				aSubNav[i].style.display="none";
			}
			aSubNav[this.index].style.display="block";	
		}
		
	}
	hide(arrA2,aSubNav[2]);
	hide(arrA1,aSubNav[1]);
	hide(arrA0,aSubNav[0]);
function hide(arr,arrPare){
	for(var i=0; i<arr.length;i++){
		arr[i].onclick=function(){
			arrPare.style.display="none";
			//alert(1);
		}
	}	
}
document.onclick=function(e){
	var e= e||event;
	var tarGet = e.target;
	if(tarGet.innerHTML !='企业信息' && tarGet.innerHTML != "服务信息"&&tarGet.innerHTML != "优车生活"){
		for(var i=0; i<aSubNav.length;i++){
			aSubNav[i].style.display="none";
		}
	}
}

	

