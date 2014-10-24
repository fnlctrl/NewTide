$(function(){
	var $window = $(window),
		$sidebar = $('#sidebar'),
		$sidebarLogo = $('#sidebar-logo'),
		$items = $('.sidebar-item'),
		$bookContainer = $('#book-container'),
		$bookLoadingShade = $('#book-loading-shade'),
		$bookPages = $('#book-pages'),
		$bookNavNext = $('#book-nav-next'),
		$bookNavPrev = $('#book-nav-prev'),
		$menuIcon = $('#menu-icon'),
		$menuIconArrow = $('#menu-icon-arrow'),
		$sidebarSections = $('#sidebar-sections'),
		$wpEntryContent = $('.wp-entry-content'),
		$wpWrapper = $('#wp-wrapper'),
		$nextPageLink = $('#wp-fake-nav-next'),
		$prevPageLink = $('#wp-fake-nav-prev');

	var status = {
		showingMenu: null,
		userClickedMenu: false,
		currentPage: 0,
		numPages: 1,
		numColumns: 1,
		standardiseLineHeight: true,
		prevPageURL:'',
		nextPageURL:'',
	};

	var util = {
		isMobile: function() {
			if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				return true;
			} else {
				return false;
			}
		},
		isListPage: function() {
			if ($wpWrapper.find('.wp-item').length) {
				return true;
			} else {
				return false;
			}
		},
		getNavURL: function() {
			function parse() {
				var url;
				if (this.find('a').length) { 
					url = this.find('a').attr('href');
				} else {
					url = this.html();
				}
				return url;
			}
			status.prevPageURL = parse.call($prevPageLink);
			status.nextPageURL = parse.call($nextPageLink);
			console.log(status.prevPageURL);
			console.log(status.nextPageURL);
		},
	};

	var toggleMenu = {
		hide: function(needReflow) {
			var W = $window.width();
			$menuIconArrow.css({'transform':'rotateZ(180deg)'});
			$sidebarSections.css({display:'none'});
			$sidebarLogo.css({display:'none'});
			$sidebar.css({width:0});
			$bookContainer.css({width:W,left:0});
			if (W>1200 && needReflow) {
				book.reflow(book.getConfig(W));
			}
			if (W<1200 && $bookContainer.width() != W) {
				book.reflow(book.getConfig(W));
			}
			status.showingMenu = false;
		},
		show: function(needReflow) {
			var W = $window.width();
			$menuIconArrow.css({'transform':'rotateZ(0deg)'});
			$sidebarSections.css({display:''});
			$sidebarLogo.css({display:''});
			if (util.isMobile()) {
				$sidebar.css({width:448});
			} else {
				$sidebar.css({width:200});
				$bookContainer.css({left:200});
			}
			if (W>1200 && needReflow) {
				$bookContainer.css({width:W-200});
				book.reflow(book.getConfig(W-200));
			}
			status.showingMenu = true;
		},
		toggle: function () {
			if (status.showingMenu) {
				this.hide(true);
			} else {
				this.show(true);
			}
		},
		bind: (function() {
			$menuIcon.click(function() {
				toggleMenu.toggle();
				status.userClickedMenu = true;
			})
		})()
	};

	var book = {
		timer: null,
		getConfig: function(W) { // W is the proper(calculated) width for bookContainer(the width of 2 pages)
			H = $window.height();
			return {
				columnCount:status.numColumns,
				viewportHeight:Math.max($window.height()-100,500),
				viewportWidth:W/2,
				columnGap:W*0.02,
				standardiseLineHeight:status.standardiseLineHeight,
				columnFragmentMinHeight:40,
				pagePadding:W*0.04,
				noWrapOnTags: ['img','div'],
			}
		},
		columnizer: null,
		init: function() {			
			//preprocessing wordpress-generated content for FTColumnflow to render
			var flowedContent; 
			var fixedContent;
			var numColumns;
			if ($wpEntryContent.length) { // means the page is showing a single entry
				var $wpEntryImgs = $wpEntryContent.find('img');
				$wpEntryImgs.removeAttr('height width').css({width:'100%'}).addClass('nowrap');
				$wpEntryImgs.each(function() {
					var $this = $(this);
					if ($this.parents('p').length) {
						$this.unwrap();
					}
				})
				flowedContent = $wpEntryContent[0];
				var $wpEntryMeta = $('.wp-entry-meta');
				$wpEntryMeta.addClass('col-span-2');
				fixedContent = $wpEntryMeta[0].outerHTML;
				status.numColumns = 2;
				status.standardiseLineHeight = true;
			} else { // means the page is showing list of entries
				flowedContent = $wpWrapper.html();
				fixedContent = '';
				status.numColumns = 1;
				status.standardiseLineHeight = false;
			}
			var cfg;
			if (W>1200) {
				cfg = book.getConfig($window.width()-200);
			} else {
				cfg = book.getConfig($window.width());
			}
			book.columnizer = new FTColumnflow('book-pages', 'book-container', cfg);
			book.columnizer.flow(flowedContent, fixedContent);
			book.copyEntryThumbnail();
			util.getNavURL();
			console.log('initialized');
		},
		reflow: function(cfg) {
			$bookLoadingShade.css({opacity:1,'z-index':'999'});
			clearTimeout(book.timer);
			book.timer = setTimeout(function(){
				book.performReflow(cfg);
			},300);
		},
		performReflow: function(cfg) {
			book.columnizer.reflow(cfg);
			book.enableTurningPages(cfg.viewportWidth);
			console.log('reflowed');
			book.copyEntryThumbnail();
			$bookLoadingShade.css({opacity:0,'z-index':'-1'});
		},
		copyEntryThumbnail: function() { // a workaround to show title image with zero padding
			if ($('.wp-entry-thumbnail').length) {
				var $firstPage = $('.cf-page-1');
				var $div = $('<div />');
				var h = $firstPage.find('.wp-entry-title').offset().top - 24;
				if (h > 500) {
					h = 500;
				}
				$div.addClass('wp-fake-thumbnail').css({height:h}).append($('.wp-entry-thumbnail')[0].outerHTML);
				$firstPage.find('.wp-entry-thumbnail').css({opacity:0,height:h-50});
				$('.cf-page-1').append($div); 
			}
		},
		enableTurningPages: function(pageW) { // pageW is width of a single page
			// group cf-pages by two and wrap them to a .bb-item
			var $pages = $('.cf-page:not(.cf-preload)');
			var len = $pages.length;
			$pages.each(function(index) {
				var $this = $(this);
				if (index % 2 === 0) {
					$this.css({left:0});
				} else {
					$this.css({left:pageW});
					$pages.slice(index-1,index+1).wrapAll('<div class="bb-item"/>');
				}
			})
			if (len % 2 != 0) {
				$pages.last().wrap('<div class="bb-item"/>');
			}
			status.numPages = $('.bb-item').length;
			// enable page flip
			var $renderArea = $('.cf-render-area');
			$renderArea.addClass('bb-bookblock');
			var startPage;
			if (localStorage.returnedFromNextPage) {
				startPage = status.numPages;
			} else {
				startPage = 1;
			}
			$renderArea.bookblock({
				startPage : startPage,
				speed : 700,
				shadows: true,
				shadowSides	: 0.8,
				shadowFlip	: 0.4,
				onEndFlip: function(old,page,isLimit) {
					status.currentPage = page+1;
					console.log(status.currentPage);
				}
			});
			delete localStorage.returnedFromNextPage;
			$renderArea.focus();
			// initialize events
			$bookContainer.click(function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					return;
				}
				if (e.pageX < offset.left+200) {
					book.turn.call($renderArea,'left');
				} else if (e.pageX > offset.left+$bookContainer.width()-200) {
					book.turn.call($renderArea,'right');
				}
			})
			$window.keydown(function(e) {
				var keyCode = e.keyCode || e.which;
				switch (keyCode) {
					case 37: //left
						book.turn.call($renderArea,'left');
						break;
					case 39: //right
						book.turn.call($renderArea,'right');
						break;
				}
			});
			$bookContainer.on('swipeleft',function(event) {
				book.turn.call($renderArea,'right');
			}).on('swiperight',function(event) {
				book.turn.call($renderArea,'left');
			});
			//show hints to turn pages
			$bookContainer.bind('mousemove',function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					$bookNavPrev.css({opacity:0});
					$bookNavNext.css({opacity:0});
				} else {
					if (e.pageX < offset.left+400) {
						$bookNavPrev.css({opacity:1});
					} else if (e.pageX > offset.left+$bookContainer.width()-400) {
						$bookNavNext.css({opacity:1});
					} else {
						$bookNavPrev.css({opacity:0});
						$bookNavNext.css({opacity:0});
					}
				}
			}).bind('mouseleave',function() {
				$bookNavPrev.css({opacity:0});
			})
		},
		turn: function(direction) {
			if (direction=='left') {
				this.bookblock('prev'); // 'this' is $renderArea passed in by Function.prototype.call()
				if (status.currentPage === 0) {
					if (util.isListPage()) {
						if (/page/i.test(location.href)) {
							location.href = status.prevPageURL;
						}
					} else {
						location.href = status.prevPageURL;
					}
					localStorage.returnedFromNextPage = true;
				}
			}
			else if (direction=='right') {
				this.bookblock('next');
				if (status.currentPage === status.numPages) {
					if (util.isListPage()) {
						if ($wpWrapper.find('.wp-item').length > 59) {
							location.href = status.nextPageURL;
						}
					} else {
						location.href = status.nextPageURL;
					}
				}
			}
		},
	}

	// initialize when page first loads
	var W = $(window).width();
	var pageW;
	if (W>1200) {
		toggleMenu.show();
		$bookContainer.width(W-200);
		pageW = (W-200)/2;
	} else {
		toggleMenu.hide();
		$bookContainer.width(W);
		pageW = W/2;
	}
	$bookLoadingShade.css({opacity:1,'z-index':'999'});
	setTimeout(function() {
		book.init();
		book.enableTurningPages(pageW);
		$bookLoadingShade.css({opacity:0,'z-index':'-1'});
	},200)

	$window.bind('resize',_.debounce(function(){
		var W = $window.width();
		if (!status.userClickedMenu) { //auto toggle menu to fit the window after resizing, disabled if user manually toggled menu
			if (W>1200) {
				toggleMenu.show(true);
			} else {
				toggleMenu.hide(true);
			}
		}
		if (status.showingMenu) {
			$bookContainer.width(W-200);
			book.reflow(book.getConfig(W-200));
		} else {
			$bookContainer.width(W);
			book.reflow(book.getConfig(W));
		}
	}, 150));
})