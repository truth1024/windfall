/**
 * @name 徐爽的插件库
 **/
(function(window){
	var Dudu = {
		"Img" : {
			"param" : {
				//速度对象（控制图片自动滚动的速度）
				"speed" : {
					//默认速度
					"defalut" : -2
				}
			},
			/**
			 *	@method autoMove 图片滚动
			 *	@author 徐爽
			 *  @param $obj    ul jqeruy对象
			 *	@param $li     li jqeruy对象
			 *  @param arrows  左右点击滚动控制（对象），其中要包括left、right、speed属性（可选）
			 *	@param length  设置li长度至少为多长时滚动（默认为5）
			 *	@date 2013-06-20
			 **/
			"autoMove" : function($obj,$li,arrows,length){

				//图片个数
				length = (typeof(length) !== 'number') ? 5 : length;
				var 
				//定时器
				timer1 = null,
				//间隔时间（单位：毫秒）
				interval = 60,
				//ul初始位置
				initPosition = 0,
				//ul重置位置
				resetPostion = 0,
				//第一个li对象
				$firstLi = $li.eq(0),
				//li的个数
				liLength = $li.length,
				//获取li的margin、border、padding值
				marginLeft = Dudu.strToNum($firstLi.css("marginLeft")),
				marginRight = Dudu.strToNum($firstLi.css("marginRight")),
				paddingLeft = Dudu.strToNum($firstLi.css("paddingLeft")),
				paddingRight = Dudu.strToNum($firstLi.css("paddingRight")),
				borderLeft = Dudu.strToNum($firstLi.css("borderLeftWidth")),
				borderRight = Dudu.strToNum($firstLi.css("borderRightWidth")),
				//第一个li的宽度
				liWidth = $firstLi.width()+marginRight+paddingRight
							  +paddingLeft+marginLeft+borderRight+borderLeft;
				
				//判断是否传arrows这个对象，没传就不绑定点击事件
				if(!!arrows && !!arrows.left){
					//根据箭头的类名绑定点击事件
					/**
					 *	参数：
					 *	arrowsName：类名 必填
					 * 	lor ：方向（左或右）必填，可选参数 【l】：left 或【r】：right
					 *
					*/
					function arrowsClick(arrowsName,lor){
						$('.'+arrowsName).on('click',{lor:lor},function(event){
							var 
								direction = Dudu.Img.param.speed[arrows.left],
								directionFlag = (event.data.lor == 'l' ? direction > 0 : direction < 0);
							if (directionFlag) {
								Dudu.Img.param.speed[arrows.left] = -direction;
							};
						});						
					};
					//如没设置初始速度，则使用默认速度
					Dudu.Img.param.speed[arrows.left] = (!!arrows.speed ? arrows.speed : Dudu.Img.param.speed.defalut);
					
					arrowsClick(arrows.left,'l');
					arrowsClick(arrows.right,'r');

				}
				
				//如果li长度大于或等于设定的长度，进行滚动，否则居中显示
				if(liLength >= length){
					//根据li的宽度和长度，设置ul的宽度
					$obj.width((liWidth*liLength)*2);
					//复制li
					$obj.html($obj.html()+$obj.html());
					resetPostion = (-$obj.width()/2);
					//自动滚动图片函数
					function autoMoveImg(){
						//获取ul的marginLeft
						var marginLeft = Dudu.strToNum($obj.css("marginLeft"));
						//获取的不是数字时，设置为初始位置值
						marginLeft = !!marginLeft ? marginLeft : initPosition;
						//改变marginLeft值
						$obj.css({marginLeft:marginLeft+(!!arrows ? Dudu.Img.param.speed[arrows.left] : Dudu.Img.param.speed.defalut)});
						//小于重置位置值时，设置为初始位置值
						if(marginLeft < resetPostion){
							$obj.css({marginLeft:initPosition});
						}
						//大于初始位置值时，设置为重置位置值
						else if(marginLeft > initPosition){
							$obj.css({marginLeft: resetPostion});
						}
					};
					//定义定时器，执行自动滚动图片函数，每interval时间，执行一次
					timer1 = setInterval(autoMoveImg,interval);
					
					//鼠标移动到ul事件，目的停止滚动
					$obj.mouseover(function(){
						//清除定时器
						clearInterval(timer1);
					});

					//鼠标移出ul事件，目的重新开始自动滚动
					$obj.mouseout(function(){
						//定义定时器
						timer1 = setInterval(autoMoveImg,interval);
					});
				}else{
					$obj.width(liLength*(liWidth+marginRight));
				}
			},
			/**
			 *	@method   autoReplace 图片自动替换
			 *	@author   徐爽
			 *  @param    $img 
			 *  @param    $li 
			 *  @param    $word 
			 *  @param    arr 
			 *  @param    auto 
			 **/
			"autoReplace" : function ($img,$li,auto,$word,arr){
				//提示器定义初始化
				var timer = null;
				//标识初始化
				var index = 0;
				//初始执行标识位
				var isFirst = true;
				//循环间隔时间（单位：毫秒）
				var stepTime = 5000;
				//获取当前$li的类名
				var className = $li.eq(0).attr('class');
				
				$li.parent().css({"z-index":10});
				
				//图片自动切换方法
				function moveImg(){
					//index大于等于图片个数时，将index重置为0。
					if(index >= $img.length){
						index = 0;
					}
					//第一次执行时，将index设置为1，否则执行时第一个图停留时间为stepTime的二倍。
					if(isFirst){
						index = 1;
						isFirst = false;
					}
					if($img.length >= 2){
						show();
					}
				};
				
				//定义定时器
				if(auto){
					timer = setInterval(moveImg,stepTime);
				}
				
				//点击切换方法
				$li.click(function(){
					if(auto){
						clearInterval(timer);
					}
					index = $li.index(this);
					if($img.length >= 2){
						show();
					}
					if(auto){
						timer = setInterval(moveImg,stepTime);
					}
				});

				//切换图片的具体操作
				function show(){
					$img.fadeOut();
					$img.eq(index).fadeIn();
					$li.removeClass(className);
					$li.eq(index).addClass(className);
					if(arr != null){
						$word.text(arr[index]);
					}
					index++;
				}
			},
			/**
			 *	@method		slide 图片滑动
			 *	@author		徐爽
			 *  @param		$contain	图片外的盒子
			 *  @param		$sub 		图片集
			 *  @param		$isAuto 	是否自动滑动 	
			 *  @param		ClickObj	需绑定的点击对象
			 *	
			 *	eg:var ClickObj = {
			 *				'left'	: '左箭头类名',
			 *				'right' : '右箭头类名',
			 *				'$point': '点的jquery对象'
			 *			}
			 *
			 *  @param		ClickObj	需绑定的点击对象
			 *  @param		ClickObj	需绑定的点击对象
			 **/
			slide : function($contain,$sub,isAuto,ClickObj,loopTime,slidTime){
				var 
				//初始化当前显示第几个图片
				i = 0,
				//获取图片个数
				subLength = $sub.length,
				//获取每个盒子的宽度
				subWidth = $sub.width();
				//定义盒子宽度
				$contain.width(subWidth*subLength);
				
				//是否自动播
				if(isAuto){
					
					//循环方法
					function anim(lor){
						if(!!lor && lor == 'l'){	//自动或者往右的时候：i++
							i--;
						}else{
							i++;
						}
						if(i == subLength){   	//判断到右边的头了
							if(lor != 'r'){		//如果不是往右就归零
								i = 0;
							}else{				//如果是往右点击
								i = subLength-1;
							}
						}else if(i < 0){    	//判断到左边的头了
							i = 0;
						}

						if(!!ClickObj && ClickObj.$point){
							ClickObj.$point.removeClass('cur');
							ClickObj.$point.eq(i).addClass('cur');
							$("#banner1 .banner1Mat span").eq(i).html($("#banner1 .banner1Mat").eq(i).find("img").attr('alt')); 
						}
						$contain.stop().animate({'marginLeft':-subWidth*i},(slidTime ? slidTime : 1000));
					};
					
					//设置循环
					function loopAnim(){
						return setInterval(anim,(loopTime ? loopTime : 4000));
					}

					var time1 = loopAnim();
					

				}
				//点击事件的公共部分
				function isAutoSilde(lor){
					if(isAuto){
							clearInterval(time1);
					}
					if(!!lor){
						anim(lor);
						if(isAuto){
							time1 = loopAnim();
						}
					}else{
						$contain.stop().animate({'marginLeft':-subWidth*i},(slidTime ? slidTime : 1000),function(){
							if(isAuto){
								time1 = loopAnim();
							}
						});
					}
				};
				
				//判断是否有点击对象
				if(!!ClickObj && typeof ClickObj == 'object'){
					//小点点击事件
					if(ClickObj.$point){
						ClickObj.$point.click(function(){
							i = ClickObj.$point.index(this);
							ClickObj.$point.removeClass('cur');
							$(this).addClass('cur');
							isAutoSilde();
						});
					}

					//左滑动点击事件
					if(!!ClickObj.left){
						$('.'+ClickObj.left).on('click',function(){
							isAutoSilde('l');
						});
					}

					//右滑动点击事件
					if (!!ClickObj.right){
						$('.'+ClickObj.right).on('click',function(){
							isAutoSilde('r');
						});	
					};

				}

			}
		},
		/**
		 *	@method strToNum 字符串转数字
		 *	@author 徐爽
		 *  @param str    字符串
		 *	@date 2013-06-28
		 **/
		"strToNum" : function strToNum(str){
			var num = parseInt(str);
			return isNaN(num) ? 0 : num;
		}

	};

	window.Dudu = Dudu;
})(window);

