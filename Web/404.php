<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title>水朝夕 | 404 Not Found</title>
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'/>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/bookblock.css' media='screen' />
	<link rel='stylesheet' type='text/css' media='all' href='<?php bloginfo( 'stylesheet_url' ); ?>' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/mobile.css' media='screen' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<script src='<?php bloginfo('template_url');?>/js/modernizr.custom.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.1.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/hammer-2.0.4.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
	<?php wp_head(); ?>
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
	<div id='book-container' class='ease'>
		<div id='menu-icon'>
			<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
			<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
		</div>
		<div id='book-loading-shade'></div>
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

