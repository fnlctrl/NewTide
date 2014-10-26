<?php
/*
Template Name: 主页
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
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/front-page.css' media='screen' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<script src='<?php bloginfo('template_url');?>/js/modernizr.custom.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.1.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/jquery.mobile.custom.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/underscore-1.6.0.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/front-page.js'></script>
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
		<div id='first-load-hint-wrapper' class='unselectable'>
			<div id='first-load-hint'>
				<div id='first-load-title'>欢迎来到全新的</div>
				<img id='first-load-logo' class='svg' src='<?php bloginfo('template_url');?>/img/first-load-logo.svg'/>
				<div id='first-load-text'>
					<p><b>· 开放投稿啦！</b></br>
					　请点击左侧　<b>投稿</b> <img class='first-load-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/></br>
					　有精美礼品相送！
					</p>
					<p><b>· 分页阅读</b></br>
					　在文章页面</br>
					　单击页面边缘翻页</br>
					　或使用←→键</br>
					　触屏上亦可滑动翻页
					</p>
					<p><b>· 再写点啥？</b></br>
					　暂时想不出来
					</p>
				</div>
				<div id='first-load-ignore-button'>
					我知道了
				</div>
			</div>
			<div id='first-load-wave-wrapper'>
				<img id='first-load-wave' src='<?php bloginfo('template_url');?>/img/first-load-wave.svg'/>
			</div>
		</div>
		<div id='posts-wrapper' class='ease'>
			<h1>最新投稿　<a id='more' href="<?php echo home_url().'/all'?>">更多...</a></h1>
			<div id='posts'>
				<?php
				$args = array(
					'posts_per_page'   => 10,
					'orderby' => 'post_date',
					'order' => 'DESC',
					'post_type' => 'post',
					'post_status' => 'publish',
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
								文/ <a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
								@ <?php the_category(' &gt; ');?>
								, <?php the_date('Y-m-d');?>
							</div>
						</div>
					</div>
					<?php //End Loop  ?>	
				<?php endforeach; wp_reset_postdata();?>
			</div>
		</div>
		<div id='events-wrapper'>
			<h1>近期活动</h1>
			<iframe src='<?php echo home_url()?>/timeline' frameBorder="0"></iframe>
		</div>
		
	</div>
</body>
</html>

