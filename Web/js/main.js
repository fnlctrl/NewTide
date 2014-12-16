$(function(){
	var $window = $(window),
		$body = $('body'),
		$topbar = $('#topbar'),
		$topbarMenu = $('#topbar-menu'),
		$topbarMenuIcon = $('#topbar-menu-icon'),
		$topbarTitle = $('#topbar-title'),
		$topbarSearchWrapper = $('.topbar-search-wrapper'),
		$topbarSearchInput = $('#topbar-search-input'),
		$topbarSearchIcon = $('#topbar-search-icon'),
		$topbarSearchReturn = $('#topbar-search-return'),
		$sidebar = $('#sidebar'),
		$cover = $('.cover'),
		$bookContainer = $('#book-container'),
		$bookLoadingShade = $('#book-loading-shade'),
		$bookNavNext = $('#book-nav-next'),
		$bookNavPrev = $('#book-nav-prev'),
		$menuIcon = $('#menu-icon'),
		$menuIconArrow = $('#menu-icon-arrow'),
		$wpEntryContent = $('.wp-entry-content'),
		$wpWrapper = $('#wp-wrapper'),
		$wpEntryThumbnail = $('.wp-entry-thumbnail'),
		$nextPageLink = $('#wp-nav-next'),
		$prevPageLink = $('#wp-nav-prev'),
		$wpEntryMeta = $('.wp-entry-meta'),
		$searchWrapper = $('.search-wrapper');
		$sidebarSearchInput = $('#sidebar-search-input');

	var status = {
		showingMenu: null,
		showingSearch: false,
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
		lockPopstate: false
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
				status.LineHeight = 15;
			} else {
				status.isListPage = false;
				status.numColumns = 2;
				status.LineHeight = 24;
			}
		},
		getNavURL: function() {
			function parse() {
				var url;
				if (this.find('a').length) {
					url = this.find('a').attr('href');
				} else {
					url = this.attr('href');
				}
				if (url === undefined) {
					url = this.text();
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
		showNotice: function(string,duration) {
			if (duration===undefined) {
				duration = 1500;
			}
			var $notice = $("<div id='message-" + Math.random() + "' class='message-block'></div>").append($("<div class='message-content'></div>").text(string));
			$body.append($notice);
			setTimeout(function(){$notice.css({opacity:1});}, 100);
			$notice.bind('click', util.clearNotice($notice));
			setTimeout(util.clearNotice($notice), duration);
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
		preventDefault: function(event) {
			event.preventDefault();
		},
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
		timer: null,
		preventPopstate: function(duration) {
			status.lockPopstate = true;
			clearTimeout(util.timer);
			util.timer = setTimeout(function() {
				status.lockPopstate = false;
			},duration);
		},
	};

	var toggleMenu = {
		show: function(needReflow) {
			if (status.showingMenu) {
				return;
			}
			if (status.isMobile) {
				$topbarMenuIcon.css({'transform':'rotateZ(90deg)'});
				$cover.addClass('cover-active');
				$sidebar.css({
					transform:'translate3d(0, 0, 0)',
					'-webkit-transform':'translate3d(0, 0, 0)',
					'box-shadow':'0 0 20px 0 rgba(0,0,0,0.5)'
				});
				util.preventPopstate(320); // 320 is animation duration + 20ms margin
				location.hash = 'menu';
				document.body.addEventListener('touchmove', util.preventDefault);
			} else {
				var W = $window.width();
				$menuIconArrow.css({'transform':'rotateZ(0deg)'});
				$bookContainer.css({left:200});
				$sidebar.css({left:'0px'});
				if (W>1200 && needReflow) {
					$bookContainer.css({width:W-200});
					book.reflow(book.getConfig(W-200));
				}
			}
			status.showingMenu = true;
		},
		hide: function(needReflow) {
			if (!status.showingMenu) {
				return;
			}
			if (status.isMobile) {
				$topbarMenuIcon.css({'transform':'rotateZ(0deg)'});
				$cover.removeClass('cover-active');
				$sidebar.css({
					transform:'translate3d(-100%, 0, 0)',
					'-webkit-transform':'translate3d(-100%, 0, 0)',
					'box-shadow':''
				});
				util.preventPopstate(320); // 320 is animation duration + 20ms margin
				if (/menu/.test(location.hash)) {
					history.back();
				}
				document.body.removeEventListener('touchmove', util.preventDefault);
			} else {
				var W = $window.width();
				$menuIconArrow.css({'transform':'rotateZ(180deg)'});
				$bookContainer.css({width:W,left:0})
				$sidebar.css({left:'-200px'});
				if (W>1200 && needReflow) {
					book.reflow(book.getConfig(W));
				}
				if (W<1200 && $bookContainer.width() != W) {
					book.reflow(book.getConfig(W));
				}
			}
			status.showingMenu = false;
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
				util.preventPopstate(320); // 320 is animation duration + 20ms margin
				toggleMenu.toggle();
			});
		})()
	};

	var toggleSearch = {
		show: function() {
			if (status.showingSearch) {
				return;
			}
			if (status.showingMenu) {
				location.hash='menu';
				toggleMenu.hide();
			}
			$topbarSearchWrapper.addClass('topbar-search-active');
			$topbarSearchInput.focus();
			$topbarMenu.css({'z-index':1}); // fix pointer-events:none not working for svgs on android 4.1
			$cover.addClass('cover-active');
			setTimeout(function(){ // added setTimeout as a workaround of unfixed chromium bug: https://code.google.com/p/chromium/issues/detail?id=243066
				location.hash = 'search';
			},10)
			status.showingSearch = true;
			document.body.addEventListener('touchmove', util.preventDefault);
		},
		hide: function() {
			if (!status.showingSearch) {
				return;
			}
			$topbarSearchWrapper.removeClass('topbar-search-active');
			$topbarSearchInput.val('');
			$topbarMenu.css({'z-index':4}); // fix pointer-events:none not working for svgs on android 4.1
			$cover.removeClass('cover-active');
			if (/search/.test(location.hash)) {
				history.back();
			}
			status.showingSearch = false;
			document.body.removeEventListener('touchmove', util.preventDefault);
		},
		bind: (function() {
			$topbarSearchIcon.click(function() {
				toggleSearch.show();
			});
			$topbarSearchReturn.click(function() {
				toggleSearch.hide();
			});
			$cover.click(function() {
				if (status.preventCoverClick) {
					return;
				}
				if (status.showingMenu) {
					toggleMenu.hide();
				}
				if (status.showingSearch) {
					toggleSearch.hide();
				}
			})
		})()
	}

	var side_ctrl = {
		click_x			: 0,
		start_x			: 0,
		new_x			: 0,
		boundary		: parseInt($window.width()) * 0.75,
		ticking			: false,
		coverHammer		: null,
		sidebarHammer	: null,
		wpHammer		: null,

		initialize : function () {
			$body.bind("mousedown", function (event) {
				side_ctrl.click_x = event.pageX;
				side_ctrl.start_x = parseInt($sidebar.css('transform').split('(')[1].split(',')[4]) + side_ctrl.boundary;
			});

			coverHammer = new Hammer($cover[0]);
			sidebarHammer = new Hammer($sidebar[0]);
			if ($wpWrapper.length) {
				wpHammer = new Hammer($wpWrapper[0]);
				wpHammer.on('pan', function () {
					if (window._config.pageType === "single") {
						var new_URL = event.deltaX < 0 ? status.nextPageURL : status.prevPageURL;
						if (new_URL) {
							window.location.href = new_URL;
						} else {
							util.showNotice('这个分类下已经没有更新的文章了~');
						}
					}
				});
			}
			setInterval(function () {
				var now_x = parseInt($sidebar.css('transform').split('(')[1].split(',')[4]) + side_ctrl.boundary;
				if (side_ctrl.ticking && (now_x === 0 || now_x === side_ctrl.boundary || now_x === side_ctrl.new_x)) {
					side_ctrl.ticking = false;
					if (now_x === 0 || now_x === side_ctrl.boundary) {
						$cover.removeAttr('style');
					}
				}
			}, 1000 / 60);
			coverHammer.on('pan', side_ctrl.onPan);
			coverHammer.on('panend', side_ctrl.onPanend);
			sidebarHammer.on('pan', side_ctrl.onPan);
			sidebarHammer.on('panend', side_ctrl.onPanend);
		},
		getNewX : function (deltaX) {
			return Math.min(Math.max(side_ctrl.start_x + deltaX, 0), side_ctrl.boundary);
		},
		updateSidebar : function (new_x) {
			$topbarMenuIcon.addClass('notransition').css({'transform':'rotateZ(' + new_x / side_ctrl.boundary * 90 + 'deg)'});
			$sidebar.addClass('notransition').css({
				transform:'translateX(' + (new_x - side_ctrl.boundary) + 'px)',
				'-webkit-transform':'translateX(' + (new_x - side_ctrl.boundary) + 'px)',
				'box-shadow':'0 0 20px 0 rgba(0,0,0,' + (new_x === 0 ? 0 : 0.5) + ')'
			});
			if (new_x === side_ctrl.boundary) {
				$cover.addClass('cover-active').addClass('notransition');
			} else {
				$cover.removeClass('cover-active').addClass('notransition').css({opacity:(new_x / side_ctrl.boundary * 0.6)});
			}
		},
		onPan : function (event) {
			if (status.showingMenu || side_ctrl.click_x < 20) {
				if (!side_ctrl.ticking) {
					side_ctrl.ticking = true;
					side_ctrl.new_x = side_ctrl.getNewX(event.deltaX);
					side_ctrl.updateSidebar(side_ctrl.new_x);
				}
			}
		},
		onPanend : function (event) {
			status.preventCoverClick = true;
			setTimeout(function () {
				status.preventCoverClick = false;
			}, 10);
			if (status.showingMenu || side_ctrl.click_x < 20) {
				side_ctrl.ticking = true;
				var show_menu = (side_ctrl.getNewX(event.deltaX) < side_ctrl.boundary * 0.5) ? false : true;
				if (show_menu) {
					status.showingMenu = true;
					side_ctrl.new_x = side_ctrl.boundary;
					location.hash = 'menu';
				} else {
					status.showingMenu = false;
					side_ctrl.new_x = 0;
					if (location.hash === '#menu') {
						history.back();
					}
				}
				side_ctrl.updateSidebar(side_ctrl.new_x);
				$topbarMenuIcon.removeClass('notransition');
				$sidebar.removeClass('notransition');
				$cover.removeClass('notransition');
			}
		}
	};

	// initialize when page first loads
	util.getNavURL();
	util.isListPage();
	util.isMobile();
	var W = $window.width();
	if (status.isMobile) {
		book = null;
		var pageType = window._config.pageType;
		// hide menu or searchbar on back pressed
		window.onhashchange = function() {
			if (!/menu/.test(location.hash) && status.showingMenu) {
				toggleMenu.hide();
			}
			setTimeout(function() {
				if (!/search/.test(location.hash) && status.showingSearch) {
					toggleSearch.hide();
				}
			},20); // location.hash = 'search' has a 10ms delay, so we use 20ms here.

		}
		if (status.prevPageURL !== '' && status.prevPageURL !== location.href.replace(location.hash,"")) {
			$prevPageLink.css({display:'block'});
		}
		if (status.nextPageURL !== '' && status.nextPageURL !== location.href.replace(location.hash,"") && $('.wp-item').length===60 ) {
			$nextPageLink.css({display:'block'});
		}
		// adjust entry thumbnail height on load
		if ($wpEntryThumbnail.length) {
			function handler() {
				if ($wpEntryThumbnail.height() < 256) {
					$wpEntryThumbnail.css({height:'256px',width:'auto'});
				}
			}
			if ($wpEntryThumbnail[0].complete) {
				handler();
			} else {
				$wpEntryThumbnail.load(handler);
			}
		}
		// set top title
		// all pageTypes: index,front-page,single,category,author,events,search,404,message
		if (pageType === 'author' ) {
			$topbarTitle.html(location.href.split(/.*author\/(.*)\//)[1]);
		} else if (pageType === '404' ) {
			$topbarTitle.html('404');
		} else if (pageType === 'search' ) {
			$topbarTitle.html('搜索');
		} else if (/editors-picks/.test(location.href)) {
			$topbarTitle.html('编辑精选');
		} else if (/all/.test(location.href)) {
			$topbarTitle.html('全部文章');
		} else {
			if ($('.sidebar-item-current').html()) {
				var href = $('.sidebar-item-current').attr('href');
				var text = $('.sidebar-item-current').text().trim();
				$topbarTitle.html('<a href="'+href+'">'+text+'</a>');
			}
		}
		// change topbar background on load
		if ($wpEntryMeta.length) { // on single entry page
			$topbar.css({background:'rgba(16,198,215,0.5)'});
		}
		if (/event/.test(location.href)) { // on events page
			$topbar.css({background:'rgba(0,0,0,0.2)'});
		}
		// handle search button press
		$('#events-wrapper').css({'height':$window.width()*0.8});
		// set sidebar-top background
		$('#sidebar-top').css({'background-image':'url('+siteInfo.siteurl+'wp-content/themes/NewTide/img/mobile/background/' + (Math.floor(Math.random()*24)+1) + '.jpg)'}) // 24 is the number of pics in the folder
		// handle back press on android
		window.WebAppCallbacks = {
			onBackPressed : function() {
				if (status.showingMenu) {
					toggleMenu.hide();
					return;
				}
				if (status.showingSearch) {
					toggleSearch.hide();
					return;
				}
				if (pageType === 'index' || pageType === 'front-page') {
					WebApp.finish();
					return;
				}
				if (pageType === 'single') { // redirect to category page if pressed back on single entry page
					var category = location.href.split(siteInfo.siteurl)[1].split('/')[0]
					location.href = siteInfo.siteurl+'category/'+category+'/';
				} else {
					location.href = siteInfo.siteurl;
					return;
				}
			}
		}
		side_ctrl.initialize();
	} else {
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
					columnFragmentMinHeight: 140,
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
					if ($wpEntryContent.length) {
						if ($('.wp-entry-comments').length) {
							flowedContent = $wpEntryContent[0].innerHTML + $('.wp-entry-comments').html();
						} else {
							flowedContent = $wpEntryContent[0].innerHTML;
						}
					} else {
						flowedContent = '';
					}
					if ($wpEntryMeta.length) {
						function handler() {
							$wpEntryMeta.children().addClass('col-span-2');
							fixedContent = $wpEntryMeta[0].innerHTML;
							render(fixedContent);
						}
						if ($wpEntryThumbnail.length) {
							if ($wpEntryThumbnail[0].complete) {
								handler();
							} else {
								$wpEntryThumbnail.load(handler);
							}
						} else {
							handler();
						}
					} else {
						fixedContent ='';
						render(fixedContent);
					}
				} else {
					flowedContent = $wpWrapper.html();
					console.log($wpWrapper.html());
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
				book.timer = setTimeout(book.performReflow(cfg), 500);
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
						//status.currentPage = page+1;
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

		if ($wpWrapper.length) {
			status.needBook = true;
		}
		if (window._config) {
			if (window._config.numColumns) {
				status.numColumns= window._config.numColumns;
			}
			if (window._config.needBook) {
				status.needBook = window._config.needBook;
			}
		}
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
		$bookLoadingShade.css({opacity:1});
		util.setupQRCode();
		$window.load(function() {
			book.init(pageW);
			$bookLoadingShade.css({opacity:0});
		});
		$window.bind('resize',function(){
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
		});
	}
	$searchWrapper.submit(function(e) {
		var str = $(this).find('input').val();
		sessionStorage.setItem('searchstr',str);
		e.preventDefault();
		e.stopPropagation();
		if (str.length) {
			location.href=siteInfo.siteurl+'?s='+encodeURIComponent(str);
		} else {
			location.href=siteInfo.siteurl;
		}
	});
	if (window._config.pageType === 'search') { // on a search result page
		if (sessionStorage.searchstr) {
			if (status.isMobile) {
				$topbarSearchInput.val(sessionStorage.searchstr);
				$topbarSearchWrapper.addClass('topbar-search-active');
				$topbarMenu.css({'z-index':1});
				status.showingSearch = true;
			} else {
				$sidebarSearchInput[0].onblur=null;
				$sidebarSearchInput.val(sessionStorage.searchstr).addClass('sidebar-search-active');
			}
		}
	}

	window._status = status;
});
