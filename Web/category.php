<!DOCTYPE html>
<html>
<head>
	<meta charset='UTF-8'/>
	<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="manifest" href='<?php bloginfo('template_url');?>/manifest.json'>
	<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-180x180.png">
	<link rel="icon" sizes="192x192" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-192x192.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
	<script src='<?php bloginfo('template_url');?>/js/FTColumnflow.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.bookblock.min.js'></script>
	<script>
		window._config = {
			pageType: 'category'
		}
	</script>
</head>
<body>
	<?php get_sidebar(); ?>
	<?php if(!$isPhone) :?>
		<div id='book-container' class='ease'>
			<div id='menu-icon'>
				<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
				<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
			</div>
			<div id='book-nav-next' class='book-nav-icon'></div>
			<div id='book-nav-prev' class='book-nav-icon'></div>
			<div id='book-loading-shade' class='ease'>
				<div id='book-loading-spinner'></div>
			</div>
			<div id='book-pages'></div>
		</div>
	<?php endif; ?>
	<div id='wp-wrapper'>
		<?php if($isPhone) :?><div class='posts-container'><?php endif; ?>
		<a id='wp-nav-prev' class='wp-nav' href='<?php echo get_previous_posts_page_link()?>'>上一页</a>
		<?php
		preg_match('/.*category\/(\w*)\/.*/',$_SERVER["REQUEST_URI"],$result);
		global $paged;
		if( get_query_var('paged') ) {
			$paged = get_query_var('paged');
		} else if ( get_query_var('page') ) {
			$paged = get_query_var('page');
		} else{
			$paged = 1;
		}
		if($isPhone) {
			$posts_per_page = 16;
		} else {
			$posts_per_page = 60;
		}
		$args = array(
			'posts_per_page' => $posts_per_page,
			'orderby' => 'post_date',
			'category' => get_category_by_slug($result[1])->cat_ID,
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
		<a id='wp-nav-next' class='wp-nav' href='<?php echo get_next_posts_page_link()?>'>下一页</a>
		<?php if($isPhone) :?></div><?php endif; ?>
	</div>
</body>
</html>
