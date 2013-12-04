var 
//开始位置
startPosition = 0,
//滑动距离
distance = 0,
//滑动标准距离
standardDistance = 50;

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
		clearInterval(timer);
		startPosition = e.targetTouches[0].pageX;
	};

	//滑动中
	function sliding(e){
		distance = e.targetTouches[0].pageX - startPosition;
	};

	//滑动结束
	function slideEnd(e){
		//右
		if(distance > standardDistance){
			if(index == 0){
				$ol.css({marginLeft:-liNum*bannerWidth});
				index = liNum-1;
			}else{
				index--;
			}
			$ol.stop().animate({marginLeft:-index*bannerWidth},speed,function(){
				cur();
				clearInterval(timer);
				timer = setInterval(function(){
					var oldml = parseInt($ol.css('marginLeft'));
					$ol.stop().animate({marginLeft:oldml-bannerWidth},speed,function(){
						index++;
						if(index == liNum){
							$ol.css({marginLeft:0});
							index = 0;
						}
						cur();
					});
				},time);
			});
		//左
		}else if(distance < -standardDistance){
			if(index == (liNum-1)){
				$ol.stop().animate({marginLeft:-(index+1)*bannerWidth},speed,function(){
					index = 0;
					$ol.css({marginLeft:0});
					cur();
					clearInterval(timer);
					timer = setInterval(function(){
						var oldml = parseInt($ol.css('marginLeft'));
						$ol.stop().animate({marginLeft:oldml-bannerWidth},speed,function(){
							index++;
							if(index == liNum){
								$ol.css({marginLeft:0});
								index = 0;
							}
							cur();
						});
					},time);
				});
			}else{
				index++;
				$ol.stop().animate({marginLeft:-index*bannerWidth},speed,function(){
					cur();
					clearInterval(timer);
					timer = setInterval(function(){
						var oldml = parseInt($ol.css('marginLeft'));
						$ol.stop().animate({marginLeft:oldml-bannerWidth},speed,function(){
							index++;
							if(index == liNum){
								$ol.css({marginLeft:0});
								index = 0;
							}
							cur();
						});
					},time);
				});
			}
		}
		distance = 0;
		
	};
};

