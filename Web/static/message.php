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
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<script>
		window._config = {
			pageType: 'message'
		}
	</script>
	<?php wp_head(); ?>
	<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
</head>
<body>
	<?php get_sidebar(); ?>
	<?php if(!$isMobile) :?>
		<div id='book-container' class='ease'>
			<div id='menu-icon'>
				<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
				<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
			</div>
			<div id='book-nav-next' class='book-nav-icon'></div>
			<div id='book-nav-prev' class='book-nav-icon'></div>
			<div id='book-loading-shade' class='ease'></div>
			<div id='book-pages'></div>
		</div>
	<?php endif; ?>
	<div id='wp-wrapper'>
		<?php if (have_posts()) { while(have_posts()) { the_post();?>
			<div class='wp-entry-content'>
				<?php if(!isMobile): ?>
					<h1 class='wp-entry-title'>
						<?php the_title(); ?>
					</h1>
				<?php endif;?>
				<?php the_content(); ?>
			</div>
			<div class='wp-entry-comments'>
				<?php comments_template(); ?>
			</div>
		<?php }} ?>
	</div>
</body>
</html>