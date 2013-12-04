var index = 0,
$ul,
$ol,
timer,
bannerWidth,
liNum,
//速度
speed = 300,
time = 3000;
window.onload = function(){
	var $bannerList = $('#bannerList');
	$ol = $bannerList.children('ol');
	$ul = $bannerList.children('ul');
	var margin = parseInt($bannerList.css('marginTop'));
	var wWidth = $(window).width();
	liNum = $('#bannerList ol li').length;
	bannerWidth = wWidth-2*margin;
	$bannerList.width(bannerWidth);
	var bannerHeight = $('#bannerList ol li img:eq(0)').height();
	$bannerList.height(bannerHeight);
	$ol.width(2*liNum*bannerWidth);
	$('#bannerList ol li').width(bannerWidth);
	for(var i = 1;i<liNum;i++){
		$('#bannerList ul').append($('<li></li>'));
	}
	$ol.append($ol.html());
	
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
	
	slideEvent('bannerList','id',timer);
};

function cur(){
	$ul.children('li').removeClass('cur');
	$ul.children('li').eq(index).addClass('cur');
}