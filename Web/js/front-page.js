$(function(){
	localStorage.clear();
	var $firstLoadHintWrapper = $('#first-load-hint-wrapper'),
		$ignoreButton = $('#first-load-ignore-button'),
		$postsWrapper = $('#posts-wrapper');

	if (localStorage.firstLoad === 'false') {
		$firstLoadHintWrapper.remove()
	}

	$ignoreButton.click(function() {
		$firstLoadHintWrapper.css({width:0});
		$firstLoadHintWrapper.children().css({display:'none'});
		setTimeout(function() {$firstLoadHintWrapper.remove()}, 500);
		localStorage.firstLoad = 'false';
		$postsWrapper.css({left:0,width:'50%'});
	})
})