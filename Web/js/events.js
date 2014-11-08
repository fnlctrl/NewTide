$(function() {
	var $events = $('.intro-event-info'),
		$items = $('.intro-item'),
		$introPhoto = $('#intro-photo')
		;
	var delByIndex = function(n) {
		if (n<0) {
			return this;
		} else {
			return $.merge(this.slice(0,n),this.slice(n+1,this.length))
		}
	};
	$items.each(function(index) {
		var $this = $(this);
		$this.click(function() {
			delByIndex.call($events,index).removeClass('intro-event-info-current');
			$events.eq(index).addClass('intro-event-info-current');
			delByIndex.call($items,index).removeClass('intro-item-current');
			$this.addClass('intro-item-current');
			$introPhoto[0].src=imgSrcs[index];
		});
	});
	$events.eq(0).addClass('intro-event-info-current');
	$items.eq(0).addClass('intro-item-current');
});