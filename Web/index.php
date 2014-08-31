<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/style.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
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
			<?php
				if (have_posts()) {
					while(have_posts()) {
						the_post();
			?>
					<div class='wp-item'>
						<?php 
							if ( has_post_thumbnail() ) {
								the_post_thumbnail();
							}
						?>
						<h3><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h3>
						<span class='wp-item-metadata'><a href='<?php the_author_link(); ?>'><?php the_author(); ?></a></span>
						<span class='wp-item-excerpt'><?php the_excerpt(); ?></span>
					</div>
			<?php
					}
				}
			?>
		</div>
	</div>
</body>

</html>