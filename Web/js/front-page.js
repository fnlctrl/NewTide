$(function(){
	var timeline;
	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		timeline = new MobileHome();
		timeline.start($('#timeline'),{
			'dataLocation': dataLocation,
			'maxEntryNumber': 999,
			'switchInterval': 5000,
			'backgroundColor': '#eee',
			'siteUrl': 'http://tide.myqsc.com/'
		});
	} else {
		var $firstLoadHintWrapper = $('#hint-wrapper'),
			$ignoreButton = $('#hint-ignore-button'),
			$postsWrapper = $('#posts-wrapper');
		if (localStorage.firstLoad === 'false') {
			$firstLoadHintWrapper.remove();
			$postsWrapper.css({left:0,width:'50%'});
		}
		$ignoreButton.click(function() {
			$firstLoadHintWrapper.css({width:0});
			$firstLoadHintWrapper.children().css({display:'none'});
			setTimeout(function() {$firstLoadHintWrapper.remove()}, 500);
			localStorage.firstLoad = 'false';
			$postsWrapper.css({left:0,width:'50%'});
		});
		timeline = new DesktopTimeline();
		timeline.start($('#timeline'),{
			'dataLocation': dataLocation,
			'maxEntryNumber': 999,
			'switchInterval': 10000,
			'backgroundColor': '#fff',
			'debounce': 300
		});
	}
});