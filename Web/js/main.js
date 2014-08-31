$(function(){
	//Replace all SVG images with inline SVG
	jQuery('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgStyle = $img.attr('style');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');
			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}
			// Add replaced image's style to the new SVG
			if(typeof imgStyle !== 'undefined') {
				$svg = $svg.attr('style', imgStyle);
			}
			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');
			// Replace image with new SVG
			$img.replaceWith($svg);
		}, 'xml');
	});

	var $window = $(window);
	var $sidebar = $('#sidebar');
	var $sidebarLogo = $('#sidebar-logo');
	var $items = $('.sidebar-item');
	var $bookContainer = $('#book-container');
	var $bookLoadingShade = $('#book-loading-shade');
	var $bookPages = $('#book-pages');
	var $bookNavNext = $('#book-nav-next');
	var $bookNavPrev = $('#book-nav-prev');
	var $menuIcon = $('#menu-icon');
	var $menuIconArrow = $('#menu-icon-arrow');
	var $sidebarSections = $('#sidebar-sections');

	var status = {
		showingMenu: null,
		userClickedMenu: false,
		currentPage: 1,
		numPages: 1,
		prevNumColumns: 0,
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
			$sidebar.css({width:200});
			$bookContainer.css({left:200});

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
	}
	var timer;
	var book = {
		getConfig: function(W,numColumns) { // W is the proper(calculated) width for bookContainer(the width of 2 pages)
			H = $window.height();
			if (numColumns===undefined) {
				numColumns = status.prevNumColumns;
			} else {
				status.prevNumColumns = numColumns;
			}
			return {
				columnCount:numColumns,
				viewportHeight:Math.max($window.height()-100,500),
				viewportWidth:W/2,
				columnGap:W*0.02,
				standardiseLineHeight:true,
				columnFragmentMinHeight:40,
				pagePadding:W*0.04,
				noWrapOnTags: ['img'],
			}
		},
		columnizer: null,
		init: function() {			
			//preprocessing wordpress-generated content for FTColumnflow to render
			var flowedContent; 
			var fixedContent;
			var numColumns;
			var $wpEntryContent = $('.wp-entry-content');
			if ($wpEntryContent.length) {
				var $wpEntryImgs = $wpEntryContent.find('img');
				$wpEntryImgs.removeAttr('height').removeAttr('width').css({width:'100%'}).addClass('nowrap');
				$wpEntryImgs.each(function() {
					var $this = $(this);
					if ($this.parents('p').length) {
						$this.unwrap();
					}
				})
				flowedContent = $wpEntryContent[0];
				fixedContent = '';
				numColumns = 2;
			} else {
				flowedContent = $('#wp-wrapper').html();
				fixedContent = '';
				numColumns = 1;
			}
			var cfg;
			if (W>1200) {
				cfg = book.getConfig($window.width()-200,numColumns);
			} else {
				cfg = book.getConfig($window.width(),numColumns);
			}
			this.columnizer = new FTColumnflow('book-pages', 'book-container', cfg);
			this.columnizer.flow(flowedContent, fixedContent);
			console.log('initialized');
		},
		getFixedContent: function() {
			var $wpEntryContent = $('.wp-entry-content');
			if ($wpEntryContent[0]) {
				// var fixedContent = $('<div />');
				// var txt = $('.subpage-title')[0].outerHTML + $('.entry-meta').html();
				// fixedContent = fixedContent.html(txt).css({padding:'0 0 30px 0'}).addClass('col-span-2')[0].outerHTML;
				// fixedContent = $('.entry-thumbnail').find('img').addClass('title-image col-span-2')[0].outerHTML + fixedContent;
				return 'fixedContent'
			} else {
				return ''
			}
		},
		reflow: function(cfg) {  // set timer to prevent being called too frequently, avoiding lag 
			$bookLoadingShade.css({opacity:1,'z-index':'999'});
			clearTimeout(timer);
			timer = setTimeout(function() {
				book.columnizer.reflow(cfg);
				book.enableTurningPages(cfg.viewportWidth);
				$bookLoadingShade.css({opacity:0,'z-index':'-1'});
				console.log('reflowed');
			},300);
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
			$renderArea.bookblock( {
				speed : 800,
					perspective : 2000,
					shadowSides	: 0.8,
					shadowFlip	: 0.4,
			});
			$renderArea.focus();
			//get back to previous location
			$renderArea.bookblock('jump',status.currentPage);
			// initialize events
			$bookContainer.click(function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					return;
				}
				if (e.pageX < offset.left+200 && status.currentPage>1) {
					book.turn.call($renderArea,'left');
				} else if (e.pageX > offset.left+$bookContainer.width()-200 && status.currentPage<status.numPages) {
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
			//show hints to turn pages
			$bookContainer.bind('mousemove',function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					$bookNavPrev.css({opacity:0});
					$bookNavNext.css({opacity:0});
				} else {
					if (e.pageX < offset.left+200 && status.currentPage>1) {
						$bookNavPrev.css({opacity:1});
					} else if (e.pageX > offset.left+$bookContainer.width()-200 && status.currentPage<status.numPages) {
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
				status.currentPage --;
				console.log('turing left');
			}
			else if (direction=='right') {
				this.bookblock('next');
				status.currentPage ++;
				console.log('turing right');
			}
			console.log(status.currentPage);
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

	// $window.on({'mousewheel': function(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// }})
})