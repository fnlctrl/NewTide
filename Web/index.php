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
				<div id='sidebar-life' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/life-2/'; ?>"'>　生活
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
	</div>
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
		<?php echo get_the_category_by_ID(2) ?>
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
				'posts_per_page'   => 60,
				'orderby' => 'post_date',
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
						the_post_thumbnail('wp-entrylist-thumbnail');
					}
				?>
				<div class='wp-item-text'>
					<h3><?php the_title(); ?></h3>
					<div class='wp-item-metadata'>
						文/ <a href='<?php the_author_link(); ?>'><?php the_author(); ?></a>
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
	</div>
</body>
</html>

