$(function() {
	var timeline;
	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		timeline = new MobileDetail();
		timeline.start($('#timeline-mobileDetail'),{
			'dataLocation': siteInfo.jsonurl,
			'siteUrl': siteInfo.siteurl,
			'maxEntryNumber': 999,
			'switchInterval': 10000,
			'backgroundColor': '#eee',
			'defaultImage': 'http://tide.myqsc.com/wp/wp-content/themes/NewTide/img/default-poster.svg',
			'initialImage': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		});
		setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
	} else {
		var $events = $('.intro-event-info'),
			$items = $('.intro-item'),
			$introPhoto = $('.intro-photo');
		var delByIndex = function(n) {
			if (n<0) {
				return this;
			} else {
				return $.merge(this.slice(0,n),this.slice(n+1,this.length))
			}
		};
		var cycleImages;
		$introPhoto.eq(0).css({opacity:1});
		$introPhoto.eq(1).css({opacity:0});
		$items.each(function(index) {
			var $this = $(this);
			$this.click(function() {
				delByIndex.call($events,index).removeClass('intro-event-info-current');
				$events.eq(index).addClass('intro-event-info-current');
				delByIndex.call($items,index).removeClass('intro-item-current');
				$this.addClass('intro-item-current');
				$introPhoto[0].src=imgSrcs[index][0];
				$introPhoto[1].src=imgSrcs[index][1];
				clearInterval(cycleImages);
				setTimeout(function() {
					$introPhoto.eq(0).css({opacity:0});
					$introPhoto.eq(1).css({opacity:1});
				},5000);
				cycleImages = setInterval(function(){
					$introPhoto.eq(0).css({opacity:0});
					$introPhoto.eq(1).css({opacity:1});
					setTimeout(function() {
						$introPhoto.eq(0).css({opacity:1});
						$introPhoto.eq(1).css({opacity:0});
					},5000);
				},10000);
			});
		});
		$items.eq(0).click();
		timeline = new DesktopTimeline();
		timeline.start($('#timeline'),{
			'dataLocation': siteInfo.jsonurl,
			'siteUrl': siteInfo.siteurl,
			'maxEntryNumber': 999,
			'switchInterval': 10000,
			'backgroundColor': '#fff',
			'defaultImage': 'http://tide.myqsc.com/wp/wp-content/themes/NewTide/img/default-poster.svg',
			'initialImage': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		});
	}
});