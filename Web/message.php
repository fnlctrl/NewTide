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
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/bookblock.css' media='screen' />
	<link rel='stylesheet' type='text/css' media='all' href='<?php bloginfo( 'stylesheet_url' ); ?>' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<script src='<?php bloginfo('template_url');?>/js/modernizr.custom.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.1.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/hammer-2.0.4.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.mousewheel.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
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
		<div id='wp-wrapper'>
			<?php if (have_posts()) { while(have_posts()) { the_post();?>
				<div class='wp-entry-meta'>
					<?php the_post_thumbnail('full',array('class' => 'wp-entry-thumbnail')); ?>
					<h1 class='wp-entry-title'>
						<?php the_title(); ?>
					</h1>
				</div>
				<div class='wp-entry-content'>
					<?php the_content(); ?>
					<?php comments_template(); ?>
				</div>
			<?php }} ?>
			<div id='wp-fake-nav-prev'><?php next_post_link( '%link', '', TRUE ); ?></div>
			<div id='wp-fake-nav-next'><?php previous_post_link( '%link', '', TRUE ); ?></div>
		</div>
	</div>
</body>

</html>