var 
//屏幕宽度
wWidth,
//活动列表的margin值
margin = 10,
//活动列表宽度
activityWidth,
//活动列表高度
activityHeight,
//活动列表对象
$activityList,
//活动容器对象
$activityContain,
//活动对象
$activitys,
//活动条数
activityNum,
//激活活动
index = 0;
$(function(){
	$('.like').bind('click',function(){
		$(this).prev().text(parseInt($(this).prev().text())+1);
		$(this).attr('src','images/like1.png');
		$(this).unbind();
	});
	
	slideEvent('activityList','id');
	$(window).load(function(){
		initStyle();
		for(var i = 0;i<activityNum;i++){
			if(i == 0){
				$('.move').append($('<a index="'+i+'" href="javascript:;"><img src="images/showInfohover.png" /></a>'));
			}else{				
				$('.move').append($('<a index="'+i+'" href="javascript:;"><img src="images/showInfo.png" /></a>'));
			}
		}
		$activityContain.append($activityContain.html());
	});
});

function initStyle(){
	//屏幕宽度
	wWidth = $(window).width();
	//计算活动列表的margin值
//	margin = wWidth/90;
	margin = 10;
	//计算活动列表的宽度
	activityWidth = wWidth-2*margin;
	//获取活动列表对象
	$activityList = $('#activityList');
	//获取活动容器对象
	$activityContain = $('#activityContain');
	//获取活动对象
	$activitys = $activityContain.children('.activity');
	//获取活动条数
	activityNum = $activitys.length; 
	//设置活动容器样式
	$activityContain.css({width:(activityWidth+2)*activityNum*2});
	//设置活动样式
	$activitys.css({width:activityWidth,float:'left'});
	//获取活动高度
	activityHeight = $activitys.height();
	//设置活动列表样式
	$activityList.css({width:activityWidth+2,margin:'0 auto 50px',height:activityHeight,overflow :'hidden',padding:activityWidth*0.06+'px 0'});
};

var 
//开始位置
startPosition = 0,
//滑动距离
distance = 0,
//滑动标准距离
standardDistance = 50;

var originalml;

var speed = 300;
//滑动事件
function slideEvent(idOrClass,property){
	var slideTargets = null;
	//获取绑定目标
	if(property == 'id'){
		slideTargets = $('#'+idOrClass).get(0);
		bindSlide(slideTargets);
	}
	
	//绑定活动事件
	function bindSlide(slideTarget){
		slideTarget.addEventListener('touchstart',slideStart,false);
		slideTarget.addEventListener('touchmove',sliding,false);
		slideTarget.addEventListener('touchend',slideEnd,false);
	}
	
	//滑动开始
	function slideStart(e){
		startPosition = e.targetTouches[0].pageX;
	};

	//滑动中
	function sliding(e){
		distance = e.targetTouches[0].pageX - startPosition;
	};

	//滑动结束
	function slideEnd(e){
		var oldml;
		//右
		if(distance > standardDistance){
			if(index <= 0){
				index = activityNum;
				$activityContain.css({marginLeft:-activityNum*(activityWidth+2)});
			}
			oldml = parseInt($activityContain.css('marginLeft'));
			$activityContain.stop().animate({marginLeft:oldml+(activityWidth+2)},speed,function(){
				index--;
				cur();
			});
		//左
		}else if(distance < -standardDistance){
			oldml = parseInt($activityContain.css('marginLeft'));
//			alert(parseInt($activityContain.css('marginLeft')));
			$activityContain.stop().animate({marginLeft:oldml-(activityWidth+2)},speed,function(){
				index++;
				if(index >= activityNum){
					index = 0;
					$activityContain.css({marginLeft:'0'});
				}
//				alert('index'+index);
				cur();
			});
		}
		distance = 0;
	};
};

function cur(){
	$('.move a img').attr('src','images/showInfo.png');
	$('.move a img').eq(index).attr('src','images/showInfohover.png');
};