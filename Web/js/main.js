$(function(){
	var $window = $(window),
		$sidebar = $('#sidebar'),
		$bookContainer = $('#book-container'),
		$bookLoadingShade = $('#book-loading-shade'),
		$bookNavNext = $('#book-nav-next'),
		$bookNavPrev = $('#book-nav-prev'),
		$menuIcon = $('#menu-icon'),
		$menuIconArrow = $('#menu-icon-arrow'),
		$wpEntryContent = $('.wp-entry-content'),
		$wpWrapper = $('#wp-wrapper'),
		$wpEntryThumbnail = $('.wp-entry-thumbnail'),
		$nextPageLink = $('#wp-fake-nav-next'),
		$prevPageLink = $('#wp-fake-nav-prev');

	var status = {
		showingMenu: null,
		currentPage: 1,
		numPages: 1,
		numColumns: 1,
		standardiseLineHeight: true,
		prevPageURL:'',
		nextPageURL:'',
		isListPage: undefined,
		needBook: false,
		isMobile: false
	};

	var util = {
		isMobile: function() {
			if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				status.isMobile = true;
			}
		},
		isListPage: function() {
			if ($wpWrapper.find('.wp-item').length) {
				status.isListPage = true;
				status.numColumns = 1;
			} else {
				status.isListPage = false;
				status.numColumns = 2;
			}
			console.log('is list page: ' + status.isListPage);
		},
		getNavURL: function() {
			function parse() {
				var url = this.find('a').attr('href');
				if (url === undefined) {
					url = this.html();
				}
				return url;
			}
			status.prevPageURL = parse.call($prevPageLink);
			console.log(status.prevPageURL);
			status.nextPageURL = parse.call($nextPageLink);
			console.log(status.nextPageURL);
		},
		clearNotice: function($obj) {
			return function() {
				$obj.css({opacity:0});
				setTimeout(function(){
					$obj.remove()
				},150);
			};
		},
		showNotice: function(string) {
			var $notice = $("<div id='message-" + Math.random() + "' class='message-block'></div>").append($("<div class='message-content'></div>").text(string));
			$('body').append($notice);
			setTimeout(function(){$notice.css({opacity:1});}, 100);
			$notice.bind('click', util.clearNotice($notice));
			setTimeout(util.clearNotice($notice), 1500);
		},
	};

	var toggleMenu = {
		hide: function(needReflow) {
			var W = $window.width();
			$menuIconArrow.css({'transform':'rotateZ(180deg)'});
			if (status.isMobile) {
				$sidebar.css({left:'-448px'});
			} else {
				$sidebar.css({left:'-200px'});
			}
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
			$sidebar.css({left:'0px'});
			if (!status.isMobile) {
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
				localStorage.setItem('userClickedMenu','true');
			})
		})()
	};

	var book = {
		timer: null,
		columnizer: null,
		renderArea: null,
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
		init: function() {
			//preprocessing wordpress-generated content for FTColumnflow to render
			if (!status.needBook) {
				return
			}
			var flowedContent; 
			var fixedContent;
			if (!status.isListPage) {
				var $wpEntryImgs = $wpEntryContent.find('img');
				$wpEntryImgs.css({width:'100%'}).addClass('nowrap'); //.removeAttr('height width class')
				$wpEntryImgs.each(function() {
					var $this = $(this);
					if ($this.parents('p').length) {
						$this.unwrap();
					}
				})
				flowedContent = $wpEntryContent.html();
				var $wpEntryMeta = $('.wp-entry-meta');
				$wpEntryMeta.addClass('col-span-2');
				fixedContent = $wpEntryMeta[0].outerHTML;
				status.standardiseLineHeight = true;
			} else {
				flowedContent = $wpWrapper[0].innerHTML;
				fixedContent = '';
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
			book.renderArea = $('.cf-render-area');
			book.copyEntryThumbnail();
			book.enableTurningPages(pageW);
			book.setUpEvents();
		},
		reflow: function(cfg) {
			if (!status.needBook) {
				return
			}
			$bookLoadingShade.css({opacity:1,'z-index':'999'});
			clearTimeout(book.timer);
			book.timer = setTimeout(book.performReflow(cfg), 300);
		},
		performReflow: function(cfg) {
			return function() {
				book.columnizer.reflow(cfg);
				book.enableTurningPages(cfg.viewportWidth);
				console.log('reflowed');
				book.copyEntryThumbnail();
				$bookLoadingShade.css({opacity:0,'z-index':'-1'});
			}
		},
		copyEntryThumbnail: function() { // a workaround to show title image with zero padding
			if ($wpEntryThumbnail.length) {
				var $firstPage = $('.cf-page-1');
				var $div = $('<div />');
				var img = new Image();
				img.src = $wpEntryThumbnail[0].src;
				img.className = 'wp-fake-thumbnail';
				var h = $firstPage.find('.wp-entry-title').offset().top - 24;
				if (h > 400) {
					h = 400;
				}
				$div.addClass('wp-fake-thumbnail-wrapper').css({height:h}).append(img);
				$firstPage.find('.wp-entry-thumbnail').css({opacity:0,height:h-50});
                $firstPage.append($div);
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
			book.renderArea.addClass('bb-bookblock');
			var startPage;
			if (localStorage.returnedFromNextPage === 'true') {
				startPage = status.numPages;
			} else {
				startPage = 1;
			}
			if (!status.isListPage) {
				startPage = 1;
			}
			book.renderArea.bookblock({
				startPage : startPage,
				speed : 700,
				shadows: true,
				shadowSides	: 0.8,
				shadowFlip	: 0.4,
				onBeforeFlip: function(page) {
					status.currentPage = page+1; // bookblock has a bug that start counting pages from 0 in onBeforeFlip and onEndFlip, and from 1 in everywhere else
				},
				onEndFlip: function(old,page,isLimit) {
					status.currentPage = page+1;
					console.log(status.currentPage);
				}
			});
			localStorage.removeItem('returnedFromNextPage');
			book.renderArea.focus();
		},
		setUpEvents: function() {
			$bookContainer.click(function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					return;
				}
				if (e.pageX < offset.left+100) {
					book.turn.call(book.renderArea,'left');
				} else if (e.pageX > offset.left+$bookContainer.width()-100) {
					book.turn.call(book.renderArea,'right');
				}
			});
			$window.keydown(function(e) {
				var keyCode = e.keyCode || e.which;
				switch (keyCode) {
					case 37: //left
						book.turn.call(book.renderArea,'left');
						break;
					case 39: //right
						book.turn.call(book.renderArea,'right');
						break;
				}	
			});
			$window.on('mousewheel', function(event) {
    			if (event.deltaY < 0){
					book.turn.call(book.renderArea,'right');
				} else {
					book.turn.call(book.renderArea,'left');
				}
			});
			$bookContainer.on('swipeleft',function(e) {
				book.turn.call(book.renderArea,'right');
			}).on('swiperight',function(e) {
				book.turn.call(book.renderArea,'left');
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
			});
		},
		turn: function(direction) {
			if (direction==='left') {
				this.bookblock('prev'); // 'this' is book.renderArea passed in by Function.prototype.call()
				if (status.currentPage === 1) {
					if (status.isListPage) {
						if (/page/i.test(location.href)) {
							location.href = status.prevPageURL;
							localStorage.setItem('returnedFromNextPage','true');
						} else {
							util.showNotice('这个分类下已经没有更新的文章了~');
						}
					} else {
						if (status.prevPageURL != '') {
							location.href = status.prevPageURL;
						} else {
							util.showNotice('这个分类下已经没有更新的文章了~');
						}
					}
				}
			}
			else if (direction==='right') {
				this.bookblock('next');
				if (status.currentPage === status.numPages) {
					if (status.isListPage) {
						if ($wpWrapper.find('.wp-item').length >= 60) { // 60 is 3*4*5 that allow entry list to be separated into full pages, and is configured in wordpress settings.
							location.href = status.nextPageURL;
						} else {
							util.showNotice('这个分类下已经没有更多文章了~');
						}
					} else {
						location.href = status.nextPageURL;
					}
				}
			}
		}
	};

	// initialize when page first loads
	util.getNavURL();
	util.isListPage();
	util.isMobile();
	var W = $(window).width();
	if ($wpWrapper.length!=0) {
		status.needBook = true;
	}
    if (status.isMobile) {
        status.needBook = false;
    }
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
		$bookLoadingShade.css({opacity:0,'z-index':'-1'});
	},200)

	$window.bind('resize',_.debounce(function(){
		var W = $window.width();
		if (localStorage.userClickedMenu !== 'true') { //auto toggle menu to fit the window after resizing, disabled if user manually toggled menu
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