<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>	
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/wp-content.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/bookblock.css' media='screen' />
	<link rel='stylesheet' type='text/css' media='all' href='<?php bloginfo( 'stylesheet_url' ); ?>' />
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
		<div id='book-nav-next' class='book-nav-icon'></div>
		<div id='book-nav-prev' class='book-nav-icon'></div>
		<div id='book-loading-shade' class='ease'></div>
		<div id='book-pages'></div>
	</div>
	<div id='wp-wrapper'>
		<?php if (have_posts()) { while(have_posts()) { the_post();?>
			<div class='wp-entry-meta'>
				<?php the_post_thumbnail('full',array('class' => 'wp-entry-thumbnail')); ?>
				<div id='wp-entry-meta-text'>
					<h1 class='wp-entry-title'>
						<?php the_title(); ?>
					</h1>
					<div class='wp-entry-author'>
						文/ <a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
						@ <?php the_category(' &gt; ');?>
						, <?php the_date('Y-m-d');?>
					</div>
				</div>
			</div>
			<div class='wp-entry-content'>
				<?php the_content(); ?>

			</div>
			<div class='wp-entry-comments'>
				<?php comments_template(); ?>
			</div>
		<?php }} ?>

		<div id='wp-fake-nav-prev'><?php next_post_link( '%link', '', TRUE ); ?></div>
		<div id='wp-fake-nav-next'><?php previous_post_link( '%link', '', TRUE ); ?></div>
		<?php if(current_user_can('edit_others_pages')||current_user_can('edit_published_posts')) {  ?>
			<?php edit_post_link('Edit');?>
		<?php } ?>
	</div>
	<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
</body>
</html>