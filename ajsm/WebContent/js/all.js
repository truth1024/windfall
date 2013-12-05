var buttonArr = {
	submit: null,
	submit1 : null,
	signUp: null,
	join : null,
	share : null,
	share1 : null,
	share2 : null,
	consult : null,
	traffic : null,
	oil_price : null,
	malfunction : null,
	order : null,
	dictionary : null,
	gasStation : null,
	game : null,
	home1 : { hover : '#A40F24', normal : null},
	home2 : { hover : '#A40F24', normal : null},
	home3 : { hover : '#A40F24', normal : null},
	home4 : { hover : '#A40F24', normal : null},
	home5 : { hover : '#A40F24', normal : null},
	home6 : { hover : '#A40F24', normal : null},
	home7 : { hover : '#A40F24', normal : null},
	home8 : { hover : '#A40F24', normal : null},
	home9 : { hover : '#A40F24', normal : null},
	home10 : { hover : '#A40F24', normal : null},
	home11 : { hover : '#A40F24', normal : null},
	home12 : { hover : '#A40F24', normal : null},
	shareTo : { hover : '#0E65A7', normal : null },
	look : { hover : '#A61328', normal : null }
};

$(function(){
	$('.header .fL a').click(function(){
		var $this = $(this);
		$this.css('backgroundImage','url(images/bt_back_s.png)');
		setTimeout(function(){
			$this.css('backgroundImage','url(images/bt_back.png)');
		},200);
	});
	
	$('.header .fR a').click(function(){
		var $this = $(this);
		$this.css('backgroundImage','url(images/bt_home_s.png)');
		setTimeout(function(){
			$this.css('backgroundImage','url(images/bt_home.png)');
		},2000);
	});

	$('body').append($('<img style="display:none;" src="images/bt_back_s.png"/>'))
	.append($('<img style="display:none;" src="images/bt_home_s.png"/>'));
		for(var key in buttonArr){
			ts(key,buttonArr[key]);
		}
});

function ts(id,obj){
	var canvas = document.getElementById(id);
	if(canvas != null){
		var isImg = (canvas.src != null);
		if(isImg){
			$('body').append($('<img style="display:none;" src="images/'+id+'_s.png"/>'));
		}else{
			buttonArr[id].normal = $(canvas).css('backgroundColor');
		}
		// touch start listener
		function touchStart(event){
			if(isImg){
				canvas.src = 'images/'+id+'_s.png';
			}else{
				$(canvas).css('backgroundColor',obj.hover);
			}
		};

		function touchEnd(event){
			if(isImg){
				canvas.src = 'images/'+id+'.png';
			}else{
				$(canvas).css('backgroundColor',obj.normal);
			}
		};
		// add touch start listener 
		canvas.addEventListener("touchstart", touchStart, false);
		canvas.addEventListener("touchend", touchEnd, false);
	}
}

//分享遮罩层
function maskLayer(){
	var $layerDiv = $('#layer');
	if(!!!$layerDiv.get(0)){
		$layerDiv = $('<div id="layer"><img style="position:absolute;right:0px;" src="images/arrow_03.png"/></div>');
		$layerDiv.css({position:'fixed',top:'0',width:'100%',height:$(window).height(),zIndex:'100',display:'none',background:'#000',opacity:'0.9'});
		$('body').append($layerDiv);
		$('body').css('overflow','hidden');
		$('#layer').click(function(){
			$(this).hide();
			$('body').css('overflow','visible');
		});
		$(window).resize(function(){
			$layerDiv.css({height:$(window).height()});
		});
	}
	$layerDiv.show();
};











