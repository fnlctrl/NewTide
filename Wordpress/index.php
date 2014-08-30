<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<link rel="stylesheet" href="<?php bloginfo('template_url');?>/style.css" media="screen" />
	<script src="<?php bloginfo('template_url');?>/js/jquery-2.1.0.min.js"></script>
	<script src="<?php bloginfo('template_url');?>/js/main.js"></script>
	<?php wp_head(); ?>

</head>
<body>
	<?php get_sidebar(); ?>
	<div id='book-container' class='ease'>
		<div id='menu-icon'>
			<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
			<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
		</div>
		<div id='book-nav-next' class='book-nav-icon'></div>
		<div id='book-nav-prev' class='book-nav-icon'></div>
		<div id='book-loading-shade'></div>
		<div id='book-pages'></div>
	</div>
	<a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a>
	<?php
		if (have_posts()) {
			while(have_posts()) {
				the_post();
	?>
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	<?php
			}
		}
	?>

<a href="<?php get_category_link('movie'); ?>"><?php the_title(); ?></a> 
<?php get_stylesheet_uri(); ?>
</body>

</html>