$(function(){
	var timeline;
	var mobileDetect = new MobileDetect(window.navigator.userAgent);
	if (mobileDetect.mobile() && !mobileDetect.tablet()) {
		timeline = new MobileHome();
		timeline.start($('#timeline-mobileHome'),{
			'dataLocation': siteInfo.jsonurl,
			'siteUrl': siteInfo.siteurl,
			'maxEntryNumber': 999,
			'switchInterval': 5000,
			'backgroundColor': '#eee',
			'defaultImage': 'http://tide.myqsc.com/wp/wp-content/themes/NewTide/img/default-poster.svg',
			'initialImage': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		});
	} else {
		var $firstLoadHintWrapper = $('#hint-wrapper'),
			$ignoreButton = $('#hint-ignore-button'),
			$postsWrapper = $('.posts-wrapper');
		if (localStorage.firstLoad === 'false') {
			$firstLoadHintWrapper.css({display:'none'});
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
		timeline.start($('#timeline-desktop'),{
			'dataLocation': siteInfo.jsonurl,
			'siteUrl': siteInfo.siteurl,
			'maxEntryNumber': 999,
			'switchInterval': 10000,
			'backgroundColor': '#fff',
			'debounce': 350
		});
	}
});