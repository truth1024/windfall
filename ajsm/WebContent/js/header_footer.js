//全局变量
var paddingLeft = 16, 		//导航按钮文字左右边距
selectClassName = 'on',		//激活class名
contentWidth = 0,			//内容宽度值
speed = 300,				//导航背景滑动速度
aIndex = 0,					//激活导航索引
heightArr = {},				//各模块在不同宽度时的高度值
footerArr = [
				[{text:'关于我们',url:'http://www.baidu.com/'},{text:'销售管理',url:''},{text:'企业信息栏目',url:''}],
				[{text:'服务信息栏目1',url:''},{text:'服务信息栏目2',url:''},{text:'服务信息栏目3',url:''}],
				[{text:'优车生活栏目1',url:''},{text:'优车生活栏目2',url:''},{text:'优车生活栏目3',url:''}]
			],
footerIsInit = true;				//是否是初始加载footer
window.onload = function(){
	$('body').css({minHeight:$(window).height()});
	//初始化组件
	init();
	//导航绑定点击事件
	$('#nav a').click(function(){
		var index = $('#nav a').index(this);
		nowApply(index);
	});

	//监听浏览器窗口变化
	$(window).resize(function(){
		init();
	});
};

function nowApply(index){
	aIndex = index;
	var $activeA = $('#nav a').eq(aIndex);
	var aLeft = $activeA.offset().left;
	var aWidth = $activeA.width();
	slide(aWidth,aLeft,$activeA);
};

//初始化函数
function init(){
	var $nav = document.getElementById('nav');
	if(!!$nav){
		if(contentWidth == 0 || contentWidth != $('.nav_content').width()){
			//初始化置导航条
			var $li = $('#nav li');
			$li.css({width:(100/$li.length)+'%'});
			//初始化内容位置
			getBodyWidth();
			setContentWidth();
			slide($('#nav .'+selectClassName).width(),$('#nav .'+selectClassName).offset().left,'init');
		}
	}else{
		getBodyWidth();
	}
	createFooter(footerIsInit);
	
};

/**
	导航滑动效果
	width : a标签的宽度；left ：a标签的坐标；operation：执行的操作（init,a标签对象）
*/
function slide(width,left,operation){
	width = width+2*paddingLeft;
	left = left-paddingLeft;
	var $navBg = $('#nav .navBg');
	if(operation === 'init'){
		$navBg.css({width:width,left:left});
	}else{
		if(!operation.hasClass(selectClassName)){
			$('.'+selectClassName).removeClass(selectClassName);
				operation.addClass(selectClassName);
			$navBg.animate({left:left,width:width},speed);
			$('#slideDiv').animate({marginLeft:-(aIndex*contentWidth)},speed,function(){
				var moduleHeight = heightArr[contentWidth][aIndex];
				$('#slideDiv > div').css({height:moduleHeight});
				$('#slideDiv').css({height:moduleHeight,overflowY:'hidden'});
			});
		}
		
	}
	
};
function getBodyWidth(){
	contentWidth = $('body').width();
};
//获取内容部分宽度，并赋值给全局变量。设置各个模块的宽度
function setContentWidth(){
	//模块个数
	$module = $('#slideDiv > div');
	var moduleNum = $module.length;
	//各个模块添加样式
	$module.css({width:contentWidth,float:'left',height:''});
	var newArr = new Array(moduleNum);
	var contentHeight = $(window).height()-84;
	$module.each(function(index){
		var moduleH = $(this).height();
		newArr[index] = (moduleH < contentHeight ? contentHeight : moduleH);
	});
	heightArr[contentWidth] = newArr;
	var moduleHeight = heightArr[contentWidth][aIndex];
	$('#slideDiv').css({width:contentWidth*moduleNum,height:moduleHeight,overflowY:'hidden',marginLeft:-(aIndex*contentWidth)});
	$('#slideDiv > div').css({height:moduleHeight});
};

//创建页脚
function createFooter(initFlag){
	if(initFlag || $('.nav_content').width() != contentWidth){
		$('.footer').remove();
		var $footer = $('<div class="footer"></div>');
		var $footerCon = $('<div class="footerCon"></div>');
		var btn,btnCon;
		$footer.append($footerCon);
		for(var i = 0;i<3;i++){
			var j = (i+1);
			$btn = $('<div id="btn'+j+'" class="btn"></div>');
			$btnCon = $('<div id="btn_con'+j+'" class="btnCon">\
					        <ul>\
					            <li><a href="'+(footerArr[i][0].url == "" ? "javascript:;" : footerArr[i][0].url)+'">'+footerArr[i][0].text+'</a></li>\
					            <li class="border"></li>\
					            <li><a href="'+(footerArr[i][1].url == "" ? "javascript:;" : footerArr[i][1].url)+'">'+footerArr[i][1].text+'</a></li>\
					            <li class="border"></li>\
					            <li><a href="'+(footerArr[i][2].url == "" ? "javascript:;" : footerArr[i][2].url)+'">'+footerArr[i][2].text+'</a></li>\
					        </ul>\
					        <span></span>\
					    </div>');
			$footerCon.append($btn);
			$footer.append($btnCon);
		}
		$('body').append($footer);
		$('.btn').click(function(){
			if(document.all){
				window.event.cancelBubble = true;
		 	}else{
				event.stopPropagation(); 
			}
			var index = $(this).index();
			if($('.btnCon').eq(index).css('display') == 'none'){
				$('.btnCon').hide();
				$('.btnCon').eq(index).show();
			}else{
				$('.btnCon').hide();
			}
		});
		$('body').click(function(){
			$('.btnCon').hide();
		});
	}
	
	//定位箭头和显示框
	$('.btn').each(function(index){
		var oldLeft = $(this).offset().left;
		var left = oldLeft-28;
		var arrowLeft = 81;
		if(left < 0){
			left = 0;
			arrowLeft = 53+oldLeft;
		}else if(left+162 > contentWidth){
			left = contentWidth-162;
			arrowLeft = 53+(oldLeft-left);
		}
		$('.btnCon span').eq(index).css({left:arrowLeft});
		$('.btnCon').eq(index).css({left:left});
	});
};
