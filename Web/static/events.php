<?php
/*
Template Name: 线下活动
*/
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/> 
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="manifest" href='<?php bloginfo('template_url');?>/manifest.json'>
	<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template _url');?>/img/mobile/app-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-180x180.png">
	<link rel="icon" sizes="192x192" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-192x192.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="normal">
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/events.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/timeline/timeline.css' media='screen' />
	<script>
		window._config = {
			pageType: 'events'
		};
		var imgSrcs = [
			[
				"<?php bloginfo('template_url');?>/img/events/音浪-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/音浪-2.jpg"
			],
			[
				"<?php bloginfo('template_url');?>/img/events/潮声潮影-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/潮声潮影-2.jpg"
			],
			[
				"<?php bloginfo('template_url');?>/img/events/读书会-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/读书会-2.jpg"
			],
			[
				"<?php bloginfo('template_url');?>/img/events/电影课-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/电影课-2.jpg"
			],
			[
				"<?php bloginfo('template_url');?>/img/events/电影节-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/电影节-2.jpg"
			],
			[
				"<?php bloginfo('template_url');?>/img/events/音乐节-1.jpg",
				"<?php bloginfo('template_url');?>/img/events/音乐节-2.jpg"
			]
		];
	</script>
	<script src='<?php bloginfo('template_url');?>/timeline/timeline.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/events.js'></script>
</head>
<body>
	<?php get_sidebar(); ?>
	<?php if(!$isPhone) :?>
		<div id='book-container' class='ease'>
			<div id='menu-icon'>
				<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
				<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
			</div>
			<div id='book-loading-shade' class='ease'>
				<div id='book-loading-spinner'></div>
			</div>
			<div id='intro-wrapper' class='book-page'>
				<h1 id='intro-title' class='unselectable'>线下活动介绍</h1>
				<div id='intro-events-list' class='unselectable'>
					<div class='intro-item'>音浪罗曼史</div>
					<div class='intro-item'>潮声潮影</div>
					<div class='intro-item'>白夜读书会</div>
					<div class='intro-item'>求是电影课</div><br/>
					<div class='intro-item'>浙江大学青年电影节</div>
					<div class='intro-item'>潮汐音乐节</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-yinlang.svg'/>
					</div>
					<div class='intro-event-text'>
						如果你也和我们一样，嗜乐成瘾<br/>
						如果你也不满足于单纯聆听，想透过歌声触得更深<br/>
						如果你也一直在寻寻觅觅这样一群磁场相合的人类——<br/><br/>
						音浪罗曼史，如你所爱。<br/>
						我们一起致敬过王菲、搅过张扬叛逆的国产土摇、聊过Coldplay、唱过A cappella。我们会一如既往，每月一次向音乐致敬，带来精心准备的评说与Live，与你一起体会音乐的本真。<br/>
						我们哼着歌，你自然地就接下一段——这是音浪带给你的，满满共鸣与暖暖幸福感。<br/>
					</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-chaosheng.svg'/>
					</div>
					<div class='intro-event-text'>
						始创于2009年秋冬，拥有一批忠实观众的潮声潮影一直坚持每月一个主题、三部精选影片。从希区柯克到安哲多普洛斯，从日本到法国，从摇滚到交响，从成长到爱情，从女权到战争。我们坚持不盲目的选片风范，希望创造一个分享态度的空间。我们曽邀请到杭州小众电影聚会进行交流，曾作为杭州亚洲青年影展的支持单位倾注力量，也曾承接过法语电影节在浙大开办的专场。<br/>
						我们尊重电影这一神圣的艺术形式；在浙江大学紫金港校区小剧场209，你、我和幕布上的电影，便是事件全部。和一群有水准的人一起观影、分享，不是一件令人向往的事吗。
					</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-baiye.svg'/>
					</div>
					<div class='intro-event-text'>
						不是什么文人，没有什么桀骜的姿态。读书，悄然会意罢了。不过分强调书的价值。也许丰满，也许无用。自有人爱，自有人厌，文学一样在那，没有浮夸，无需哗众取宠。只要是人写的，那一定是生活。我们不能否认的是文学那穿透生活的力量，把生活中的所有真实照亮。剥开文字技法，呈现的是作家的周围，又或是你的周围？如果你能静下心，是否一道玩味？
					</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-dianyingke.svg'/>
					</div>
					<div class='intro-event-text'>
						浙大最老牌的电影放映活动，每月带你阅览两部优质大片。最佳的硬件设施、正版高清片源、电影背景介绍，为您带来感官与心灵的双重震撼。优秀的电影并非爆米花和晦涩的杂糅；通过一堂堂“电影课”，我们希望带给你充满诚意的电影旅程。在这里，开始学会从一部电影了解更多。
					</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-zjuff.svg'/>
					</div>
					<div class='intro-event-text'>
						时代诞生艺术，光影印证梦想。2013年浙江大学第一届青年电影节在浙江大学紫金港校区成功举办。2014年，青年电影节在首届基础上扩大规模，增添活动环节，成为浙大乃至长三角地区高校中最权威、最具影响力的电影节。通过这个平台，求是学子与校外人士接触了多元化的电影作品，从而获得更深层次的观影体验。
					</div>
				</div>
				<div class='intro-event-info'>
					<div id='intro-event-logo' class='unselectable'>
						<img src='<?php bloginfo('template_url');?>/img/events/event-logo-yinyuejie.svg'/>
					</div>
					<div class='intro-event-text'>
						联合杭州各大高校乐团的音乐盛典，就在潮汐音乐节！历经半年缜密策划，凝聚众人心血，推广策划中心与水朝夕工作室合办，为有才华的年轻人提供实现梦想的舞台。<br/>
						潮汐音乐节分为“原创音乐征集大赛”、“音乐节创意市集”和“现场音乐会”三个子活动。
					</div>
				</div>
				<div id='intro-photo-container'>
					<img class='intro-photo' src='<?php bloginfo('template_url');?>/img/events/音浪-1.jpg'/>
					<img class='intro-photo' src='<?php bloginfo('template_url');?>/img/events/音浪-2.jpg'/>
				</div>
			</div>
			<div id='events-wrapper'>
				<h1 class='unselectable'>本学期活动时间表</h1>
				<div id='timeline'></div>
			</div>
		</div>
	<?php else: ?>
		<div id='timeline-mobileDetail'></div>
	<?php endif ?>
</body>
</html>



