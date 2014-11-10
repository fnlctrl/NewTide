<?php
/*
Template Name: 留言板
*/
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'/>
	<link rel='stylesheet' type='text/css' media='all' href='<?php bloginfo( 'stylesheet_url' ); ?>' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/bookblock.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/mobile.css' media='screen' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
</head>
<body>
	<?php get_sidebar(); ?>
	<div id='book-container' class='ease'>
		<div id='menu-icon'>
			<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
			<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
		</div>
		<div id='book-loading-shade'></div>
		<div id='book-pages'></div>
	</div>
	<div id='wp-wrapper'>
		<?php if (have_posts()) { while(have_posts()) { the_post();?>
			<div class='wp-entry-content'>
				<h1 class='wp-entry-title'>
					<?php the_title(); ?>
				</h1>
				<?php the_content(); ?>
				<?php comments_template(); ?>
			</div>
		<?php }} ?>
	</div>
</body>
<script>
	window._config = {
		numColumns : 1
	}
</script>
<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
</html>