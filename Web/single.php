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
		<div id='book-nav-next' class='book-nav-icon'></div>
		<div id='book-nav-prev' class='book-nav-icon'></div>
		<div id='book-loading-shade'></div>
		<div id='book-pages'></div>
		<div id='wp-wrapper'>
			<?php if (have_posts()) { while(have_posts()) { the_post();?>
				<div class='wp-entry-meta'>
					<?php the_post_thumbnail('full',array('class' => 'wp-entry-thumbnail')); ?>
					<h1 class='wp-entry-title'>
						<?php the_title(); ?>
					</h1>
					<div class='wp-entry-author'>
						文/ <a href='<?php the_author_link(); ?>'><?php the_author(); ?></a>
						@ <?php the_category(' &gt; ');?>
						, <?php the_date('Y-m-d');?>
					</div>
				</div>
				<div class='wp-entry-content'>
					<?php the_content(); ?>

				</div>
			<?php }} ?>
			<div id='wp-fake-nav-prev'><?php next_post_link( '%link', '', TRUE ); ?></div>
			<div id='wp-fake-nav-next'><?php previous_post_link( '%link', '', TRUE ); ?></div>
		</div>
	</div>
	<div id='sidebar-copyright'>© 2003-2014 </br> 浙江大学求是潮</div>
</body>

</html>