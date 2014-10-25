<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'/>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/bookblock.css' media='screen' />
	<link rel='stylesheet' type='text/css' media='all' href='<?php bloginfo( 'stylesheet_url' ); ?>' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<script src='<?php bloginfo('template_url');?>/js/modernizr.custom.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.mobile.custom.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
	<style>#book-container:before{content:none}</style>
	<?php wp_head(); ?>
</head>
<body>
	<div id='sidebar' class='unselectable ease'>
		<a href="<?php bloginfo('url'); ?>"><img id='sidebar-logo' src='<?php bloginfo('template_url');?>/img/sidebar-logo.svg'/></a>
		<div id='sidebar-sections'>
			<div class='sidebar-section'><span>文章</span><hr>
				<div id='sidebar-featured' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/featured/'; ?>"'>　专题 
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-featured.svg'/>
				</div>
				<div id='sidebar-movie' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/movie/'; ?>"'>　电影
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-movie.svg'/>
				</div>
				<div id='sidebar-literature' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/literature/'; ?>"'>　文学
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-literature.svg'/>
				</div>
				<div id='sidebar-music' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/music/'; ?>"'>　音乐
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-music.svg'/>
				</div>
				<div id='sidebar-life' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/life/'; ?>"'>　生活
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
				</div>
			</div>
			<div class='sidebar-section'><span>线下</span><hr>
				<div id='sidebar-event' class='sidebar-item' onclick='location.href="<?php echo home_url().'/events/'; ?>"'>　活动
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-event.svg'/>
				</div>
				<div id='sidebar-onepage' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/onepage/'; ?>"'>　一张纸
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-onepage.svg'/>
				</div>
			</div>
			<div class='sidebar-section'><span>关于</span><hr>
				<div id='sidebar-comment' class='sidebar-item'>　留言
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-comment.svg'/>
				</div>
				<div id='sidebar-contribute' class='sidebar-item'>　投稿
					<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/>
				</div>
			</div>
		</div>
		<div id='sidebar-copyright'>© 2001 - 2014 </br> 浙江大学求是潮</div>
	</div>
	<div id='book-container' class='ease'>
		<div id='menu-icon'>
			<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
			<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
		</div>
		<div id='book-loading-shade'></div>
		<div id='first-load-hint-wrapper' class='unselectable'>
			<div id='first-load-hint'>
				<div id='first-load-title'>欢迎来到全新的</div>
				<img id='first-load-logo' class='svg' src='<?php bloginfo('template_url');?>/img/first-load-logo.svg'/>
				<div id='first-load-text'>
					<b>· 开放投稿啦！</b></br>
					　请点击左侧　<b>投稿</b> <img class='first-load-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/></br>
					　有精美礼品相送！</br></br>
					<b>· 分页阅读</b></br>
					　在文章页面，单击页</br>
					　面边缘翻页，或使用</br>
					　键盘左右键，触屏上</br>
					　亦可滑动翻页</br></br>
					<b>· 再写点啥？</b></br>
					　暂时想不出来</br>
				</div>
				<div id='first-load-ignore-button'>
					我知道了
				</div>
			</div>
			<div id='first-load-wave-wrapper'>
				<img id='first-load-wave' src='<?php bloginfo('template_url');?>/img/first-load-wave.svg'/>
			</div>
		</div>
	</div>
</body>
</html>

