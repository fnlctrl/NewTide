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
		<?php
		global $paged;
		if( get_query_var('paged') ) {
			$paged = get_query_var('paged');
		} else if ( get_query_var('page') ) {
			$paged = get_query_var('page');
		} else{
			$paged = 1;
		}
		$args = array(
			'posts_per_page' => 60,
			'orderby' => 'post_date',
			'author' => get_the_author_meta( 'ID' ),
			'order' => 'DESC',
			'post_type' => 'post',
			'post_status' => 'publish',
			'paged' => $paged,
		);
		$myposts = get_posts( $args );
		foreach ( $myposts as $post ) : setup_postdata( $post );?>
			<?php //Begin Loop ?>
			<div class='wp-item' onclick='location.href="<?php the_permalink(); ?>"'>
				<?php
				if ( has_post_thumbnail() ) {
					the_post_thumbnail(array(300,300),array('class' => 'wp-entrylist-thumbnail'));
				}
				?>
				<div class='wp-item-text'>
					<h3><?php the_title(); ?></h3>
					<div class='wp-item-metadata'>
						文/ <a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
						@ <?php the_category(' &gt; ');?>
						, <?php the_date('Y-m-d');?>
					</div>
					<div class='wp-item-excerpt'><?php echo get_the_excerpt();?></div>
				</div>
			</div>
			<?php //End Loop  ?>
		<?php endforeach; wp_reset_postdata();?>
		<div id='wp-fake-nav-prev'><?php echo get_previous_posts_page_link()?></div>
		<div id='wp-fake-nav-next'><?php echo get_next_posts_page_link()?></div>
	</div>
</body>
<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
</html>