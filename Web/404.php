<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title>水朝夕 | 404 Not Found</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="manifest" href='<?php bloginfo('template_url');?>/manifest.json'>
	<link rel="apple-touch-icon" href="<?php bloginfo('template_url');?>/img/icon-android.png">
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
	<script>
		window._config = {
			pageType: '404'
		};
	</script>
	<style>
		* {
			user-select: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
		}
		#book-container {
			background: #efdae1;
		}
		#book-container:before {
			content:none
		}
		#akarin {
			position: absolute;
			right: 10%;
			bottom: 0;
			height: 95%;
		}
		#message {
			position: absolute;
			left: 14%;
			color: #c1848c;
			top: 25%;
		}
		#title {
			font-size: 80px;
		}
		#subtitle {
			font-size: 48px;
			line-height: 48px;
		}
		#goback {
			font-weight: bold;
			font-size: 24px;
		}
	</style>
</head>
<body>
	<?php get_sidebar(); ?>
	<?php if(!$isPhone): ?>
		<div id='book-container' class='ease'>
			<div id='menu-icon'>
				<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
				<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
			</div>
			<div id='book-loading-shade' class='ease'>
				<div id='book-loading-spinner'></div>
			</div>
	<?php else: ?>
		<div id='wp-wrapper'>
	<?php endif; ?>
			<div id='message'>
				<div id='subtitle'>
					404 NOT FOUND
				</div>
				<div id='title'>
					找不到了噜
				</div>
				<a id='goback' href="<?php bloginfo('url'); ?>">回到主页</a>
			</div>
			<img id='akarin' src='<?php bloginfo('template_url');?>/img/akarin.png'/>
		</div>
</body>
</html>

