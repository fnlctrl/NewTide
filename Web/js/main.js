$(function(){
	var $window = $(window),
		$body = $('body'),
		$topbarMenu = $('#topbar-menu'),
		$topbarMenuIcon = $('#topbar-menu-icon'),
		$topbarTitle = $('#topbar-title'),
		$topbarSearch = $('#topbar-search'),
		$searchBar = $('#sidebar-search-wrapper'),
		$sidebar = $('#sidebar'),
		$cover = $('#cover'),
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
		$prevPageLink = $('#wp-fake-nav-prev'),
		$wpEntryMeta = $('.wp-entry-meta'),
		$searchWrapper = $('#sidebar-search-wrapper');
		$searchInput = $('#sidebar-search-input');

	var status = {
		showingMenu: null,
		currentPage: 1,
		numPages: 1,
		prevPageURL:'',
		nextPageURL:'',
		needBook: false,
		isMobile: false,
		isListPage: undefined,
		numColumns: 1,
		LineHeight: 18,
		qrcode: null,
		searchBar: false
	};

	var util = {
		isMobile: function() {
			if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				status.isMobile = true;
			}
			status.isMobile = true; // Debug
		},
		isListPage: function() {
			if ($wpWrapper.find('.wp-item').length) {
				status.isListPage = true;
				status.numColumns = 1;
				status.LineHeight = 15;
			} else {
				status.isListPage = false;
				status.numColumns = 2;
				status.LineHeight = 18;
			}
		},
		getNavURL: function() {
			function parse() {
				var url = this.find('a').attr('href');
				if (url === undefined) {
					url = this.html();
				}
				return url;
			}
			if ($prevPageLink.length) {
				status.prevPageURL = parse.call($prevPageLink);
			}
			if ($nextPageLink.length) {
				status.nextPageURL = parse.call($nextPageLink);
			}
			console.log(status.prevPageURL);
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
			$body.append($notice);
			setTimeout(function(){$notice.css({opacity:1});}, 100);
			$notice.bind('click', util.clearNotice($notice));
			setTimeout(util.clearNotice($notice), 1500);
		},
		getShareLink: function(){
			var shareInfo = {
				title: encodeURI($('.wp-entry-title').html().trim()+' | 水朝夕'),
				text: encodeURI($wpEntryContent.text().trim().substring(0,110)+'……'),
				image: encodeURI($wpEntryThumbnail[0].src),
				href: encodeURI(location.href)
			};
			return {
				weibo:'http://service.weibo.com/share/share.php?title='+shareInfo.title+encodeURI('　|　')+shareInfo.text+'&pic='+shareInfo.image+'&url='+shareInfo.href,
				renren:'http://widget.renren.com/dialog/share?title='+shareInfo.title+'&description='+shareInfo.text+'&pic='+shareInfo.image+'&resourceUrl='+shareInfo.href,
				douban:'http://www.douban.com/share/service?name='+shareInfo.title+'&text='+shareInfo.text+'&image='+shareInfo.image+'&href='+shareInfo.href
			};
		},
		search: (function() {
			$searchWrapper.submit(function(e) {
				var str = $searchInput.val();
				sessionStorage.setItem('searchstr',str);
				e.preventDefault();
				e.stopPropagation();
				if (str.length) {
					location.href=location.origin+'/wordpress/?s='+str;
				} else {
					location.href=location.origin+'/wordpress';
				}
			});
			if (/\?s=/.test(location.href)) { // on a search result page
				if (sessionStorage.searchstr) {
					$searchInput[0].onblur='';
					$searchInput.val(sessionStorage.searchstr).addClass('sidebar-search-active');
				}
			}
		})(),
		cloneCanvas: function(oldCanvas) {
			//create a new canvas
			var newCanvas = document.createElement('canvas');
			var context = newCanvas.getContext('2d');
			//set dimensions
			newCanvas.width = oldCanvas.width;
			newCanvas.height = oldCanvas.height;
			//apply the old canvas to the new one
			context.drawImage(oldCanvas, 0, 0);
			//return the new canvas
			return newCanvas;
		},
		setupQRCode: function() {
			$body.append('<div id="fake-qrcode"></div>');
			$('#fake-qrcode').qrcode({
				width: 100,
				height: 100,
				text: encodeURI(location.href),
				QRErrorCorrectLevel:2,
				background : "#ffffff",
				foreground : "#1767a3"
			});
			var canvas = $('#fake-qrcode canvas')[0];
			status.qrcode = util.cloneCanvas(canvas);
			$('#sidebar-qrcode').append(util.cloneCanvas(canvas));
		},
	};

	var toggleMenu = {
		hide: function(needReflow) {
			var W = $window.width();
			$bookContainer.css({width:W,left:0});
			$menuIconArrow.css({'transform':'rotateZ(180deg)'});
			$topbarMenu.css({'backgroundColor':'transparent'});
			$topbarMenuIcon.css({'transform':'rotateZ(0deg)'});
			$cover.fadeTo(300, 0, function () {
				$(this).hide(0);
			});
			if (status.isMobile) {
				$sidebar.css({left:'-40vw'});
			} else {
				$sidebar.css({left:'-200px'});
			}
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
			$topbarMenu.css({'backgroundColor':'#88E3EE'});
			$topbarMenuIcon.css({'transform':'rotateZ(90deg)'});
			$cover.show(0, function () {
				$(this).fadeTo(300, 0.5);
			});
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
				localStorage.setItem('userMenuStatus',status.showingMenu);
			});
			$topbarMenu.click(function() {
				toggleMenu.toggle();
				localStorage.setItem('userClickedMenu','true');
				localStorage.setItem('userMenuStatus',status.showingMenu);
			});
			$topbarSearch.click(function() {
				if (status.searchBar) {
					$searchBar.css({'left':'-100vw'});
					$(this).css({'backgroundColor':'transparent'});
					status.searchBar = false;
				} else {
					$searchBar.css({'left':0});
					$(this).css({'backgroundColor':'#88E3EE'});
					status.searchBar = true;
				}
			});
			$cover.click(function() {
				toggleMenu.toggle();
				localStorage.setItem('userClickedMenu','true');
				localStorage.setItem('userMenuStatus',status.showingMenu);
			});
		})()
	};

	var book = {
		timer: null,
		columnizer: null,
		renderArea: null,
		getConfig: function(W) { // W is the proper(calculated) width for bookContainer(the width of 2 pages)
			var H = $window.height();
			return {
				columnCount: status.numColumns,
				viewportHeight: Math.max($window.height()-100,500),
				viewportWidth: W/2,
				columnGap: W*0.02,
				standardiseLineHeight: true,
				lineHeight: status.LineHeight,
				//showGrid: true,
				columnFragmentMinHeight: 144,
				pagePadding: W*0.04,
				noWrapOnTags: ['div','img','blockquote']
			}
		},
		init: function(pageW) {
			//preprocessing wordpress-generated content for FTColumnflow to render
			if (!status.needBook) {
				return
			}
			var flowedContent; 
			var fixedContent;
			if (!status.isListPage) {
				var $wpEntryImgs = $wpEntryContent.find('img');
				$wpEntryImgs.each(function() {
					var $this = $(this);
					if ($this.parent('p').length) {
						$this.unwrap();
					}
				})
				$wpEntryImgs.css({width:'100%','max-height':500,'margin-top':'18px'}); //.removeAttr('height width class')
				if ($wpEntryContent.length) {
					flowedContent = $wpEntryContent[0].innerHTML + $('.wp-entry-comments').html();
				} else {
					flowedContent = '';
				}
				if ($wpEntryMeta.length) {
					if ($wpEntryThumbnail.length) {
						if ($wpEntryThumbnail[0].complete) {
							handler();
						} else {
							$wpEntryThumbnail.load(handler);
						}
					} else {
						handler();
					}
					function handler() {
						$wpEntryMeta.children().addClass('col-span-2');
						fixedContent = $wpEntryMeta[0].innerHTML;
						render(fixedContent);
					}
				} else {
					fixedContent ='';
					render(fixedContent);
				}
			} else {
				flowedContent = $wpWrapper[0].innerHTML;
				fixedContent = '';
				render(fixedContent);
			}
			function render(fixedContent) {
				var cfg = book.getConfig(pageW*2);
				book.columnizer = new FTColumnflow('book-pages', 'book-container', cfg);
				book.columnizer.flow(flowedContent, fixedContent);
				book.renderArea = $('.cf-render-area');
				book.enableTurningPages(pageW);
				book.copyEntryThumbnail();
				book.setUpEvents();
			}
		},
		reflow: function(cfg) {
			if (!status.needBook) {
				return
			}
			$bookLoadingShade.css({opacity:1});
			clearTimeout(book.timer);
			book.timer = setTimeout(book.performReflow(cfg), 300);
		},
		performReflow: function(cfg) {
			return function() {
				book.columnizer.reflow(cfg);
				book.renderArea.bookblock('destroy');
				book.enableTurningPages(cfg.viewportWidth);
				book.copyEntryThumbnail();
				$bookLoadingShade.css({opacity:0});
			}
		},
		copyEntryThumbnail: function() { // a workaround to show title image with zero padding
			if ($wpEntryThumbnail.length) {
				var $firstPage = $('.cf-page-1');
				var $div = $('<div />');
				var img = new Image();
				img.src = $wpEntryThumbnail[0].src;
				img.className = 'wp-fake-thumbnail';
				var h = $firstPage.find('.wp-entry-thumbnail').height() + 35;
				if (h > 500) {
					h = 500; // 500 is the max-width of .wp-entry-thumbnail + 50(top page padding)
				}
				$div.addClass('wp-fake-thumbnail-wrapper').height(h).append(img);
				// add sharing buttons
				var $shareWrapper = $('<div id="share-wrapper" class="toolbar-wrapper"/>');
				var href = util.getShareLink();
				$shareWrapper.append('<a class="toolbar-icon douban" target="_blank" href="'+href.douban+'"></a>')
							.append('<a class="toolbar-icon weibo" target="_blank" href="'+href.weibo+'"></a>')
							.append('<a class="toolbar-icon renren" target="_blank" href="'+href.renren+'"></a>')
							.append('<a class="toolbar-icon weixin"></a>')
							.append('<div id="toolbar-qrcode-wrapper"><div id="toolbar-qrcode"></div><span>分享到微信</span></div>');
				$div.append($shareWrapper);
				// add edit button
				var $postEditLink = $('.post-edit-link');
				if ($postEditLink.length) {
					var $adminToolsWrapper = $('<div id="admin-tools-wrapper" class="toolbar-wrapper"/>');
					var editLink = $postEditLink[0].href;
					$adminToolsWrapper.append('<a class="toolbar-icon edit" target="_blank" href="'+editLink+'"></a>');
					$div.append($adminToolsWrapper);
				}
				$firstPage.find('.wp-entry-thumbnail').css({opacity:0,height:h-50});
                $firstPage.append($div);
				// copy qrcode
				setTimeout(function(){
					$('#toolbar-qrcode').append(status.qrcode);
				},50)
			}
		},
		enableTurningPages: function(pageW) { // pageW is half the width of book-container
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
			});
			if (len % 2 != 0) {
				$pages.last().wrap('<div class="bb-item"/>');
			}
			var $bbItem = $('.bb-item');
			status.numPages = $bbItem.length;
			if (status.numPages === 0) {
				return
			}
			// add fake menu icon
			$bbItem.each(function(){
				$(this).append($('<div class="menu-icon-fake" />'));//
			});
			// enable page flip
			book.renderArea.addClass('bb-bookblock');
			var startPage;
			if (localStorage.returnedFromNextPage) {
				if (localStorage.returnedFromNextPage === 'true') {
					startPage = status.numPages;
				}
			} else {
				startPage = 1;
			}
			if (!status.isListPage) {
				startPage = 1;
			}
			book.renderArea.bookblock();
			book.renderArea.data('bookblock')._init({
				startPage : startPage,
				speed : 600,
				shadows: true,
				shadowSides	: 0.8,
				shadowFlip	: 0.4,
				onBeforeFlip: function(page) {
					status.currentPage = page+1;
					$menuIcon.css({'opacity':'0'});
				},
				onEndFlip: function(old,page,isLimit) {
					status.currentPage = page+1;
					$menuIcon.css({'opacity':'1'});
				}
			});
			localStorage.removeItem('returnedFromNextPage');
			book.renderArea.focus();
		},
		setUpEvents: function() {
			$bookContainer.click(function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) { // prevent fireing when clicked on menu icon
					return;
				}
				if (e.pageX < offset.left+65) {
					book.turn.call(book.renderArea,'left');
				} else if (e.pageX > offset.left+$bookContainer.width()-65) {
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
					default:
						break;
				}
			});
			if (!status.isMobile) {
				$window.on('mousewheel', function(event) {
					if (event.deltaY < 0){
						book.turn.call(book.renderArea,'right');
					} else {
						book.turn.call(book.renderArea,'left');
					}
				});
			}
            if (status.isMobile || /iPad/i.test(navigator.userAgent)) {
                var hammertime = new Hammer($bookContainer[0]);
                hammertime.on('swipeleft', function(e) {
                    book.turn.call(book.renderArea,'right');
                }).on('swiperight',function(){
                    book.turn.call(book.renderArea,'left');
                });
            }
			//show hints to turn pages
			$bookContainer.bind('mousemove',function(e) {
				var offset = $bookContainer.offset();
				if (e.pageY>50 && e.pageY<90 && e.pageX>offset.left && e.pageX<offset.left+25) {
					$bookNavPrev.css({opacity:0});
					$bookNavNext.css({opacity:0});
				} else {
					if (e.pageX < offset.left+450) {
						$bookNavPrev.css({opacity:1});
					} else if (e.pageX > offset.left+$bookContainer.width()-450) {
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
				this.data('bookblock').prev(); // 'this' is book.renderArea passed in by Function.prototype.call()
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
				this.data('bookblock').next();
				if (status.currentPage === status.numPages) {
					if (status.isListPage) {
						if ($wpWrapper.find('.wp-item').length >= 60) { // 60 is 3*4*5 that allow entry list to be separated into full pages
							location.href = status.nextPageURL;
						} else {
							util.showNotice('这个分类下已经没有更多文章了~');
						}
					} else {
						if (status.nextPageURL!=='') {
							location.href = status.nextPageURL;
						}
					}
				}
			}
		}
	};

	// initialize when page first loads
	util.getNavURL();
	util.isListPage();
	util.isMobile();
	if (!status.isMobile) {
		util.setupQRCode();
	}
	if ($wpWrapper.length) {
		status.needBook = true;
	}
	if (status.isMobile) {
		status.needBook = false;
	}
	if (window._config) {
		if (window._config.numColumns) {
			status.numColumns= window._config.numColumns;
		}
		if (window._config.needBook) {
			status.numColumns= window._config.needBook;
		}
	}
	var W = $window.width();
	var pageW;
	var showOrHideMenuOnLoad = function(show) {
		$sidebar.addClass('notransition');
		$bookContainer.addClass('notransition');
		$sidebar[0].offsetHeight; // small hack here to trigger a reflow, flushing the CSS changes, see http://stackoverflow.com/questions/11131875/
		if (show) {
			toggleMenu.show();
			$bookContainer.width(W-200);
			pageW = (W-200)/2;
		} else {
			toggleMenu.hide();
			$bookContainer.width(W);
			pageW = W/2;
		}
		$sidebar.removeClass('notransition');
		$bookContainer.removeClass('notransition');
	}
	if (localStorage.userMenuStatus) {
		if (localStorage.userMenuStatus === 'true') {
			showOrHideMenuOnLoad(true);
		} else if (localStorage.userMenuStatus === 'false'){
			showOrHideMenuOnLoad(false);
		}
	} else {
		if (W>1200) {
			showOrHideMenuOnLoad(true);
		} else {
			showOrHideMenuOnLoad(false);
		}
	}
	if (!status.isMobile) {
		$bookLoadingShade.css({opacity:1});
		util.setupQRCode();
		$window.load(function() {
			book.init(pageW);
			$bookLoadingShade.css({opacity:0});
		});
	} else {
		book = null;
	}
	
	$window.load(function() {
		book.init(pageW);
	});
	
	$topbarTitle.html($('.sidebar-item-current').html());
	
	if (!$('#posts-wrapper').html()) {
		$bookContainer.css('display','none');
	}
	$window.bind('resize',_.debounce(function(){
		var W = $window.width();
		if (localStorage.userClickedMenu !== 'true') { //auto toggle menu to fit the window after resizing, disabled if user manually toggled menu
			if (W>1200) {
				toggleMenu.show(true);
			} else {
				toggleMenu.hide(true);
			}
		}
		if (status.isMobile) {
			return;
		}
		if (status.showingMenu) {
			$bookContainer.width(W-200);
			book.reflow(book.getConfig(W-200));
		} else {
			$bookContainer.width(W);
			book.reflow(book.getConfig(W));
		}
	}, 100));
});
