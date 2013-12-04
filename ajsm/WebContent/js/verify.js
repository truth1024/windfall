$(function(){
	
	var $inputText = $('input[type="text"]');
	var textArr = new Array($inputText.length);	//文本框中文字数组
	$inputText.each(function(index){
		textArr[index] = $(this).val();
	});
	$inputText.focus(function(){
		var index = $inputText.index(this);
		if($(this).val() == textArr[index]){
			$(this).val('');
		}
	}).blur(function(i){
		var index = $inputText.index(this);
		if($(this).val().trim() == ''){
			$(this).val(textArr[index]);
		}
	});
});