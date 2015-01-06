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
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="manifest" href='<?php bloginfo('template_url');?>/manifest.json'>
	<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template _url');?>/img/mobile/app-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-180x180.png">
	<link rel="icon" sizes="192x192" href="<?php bloginfo('template_url');?>/img/mobile/app-icon-192x192.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="white">
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/timeline/timeline.css' media='screen' />
	<script src='<?php bloginfo('template_url');?>/timeline/timeline.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/front-page.js'></script>
	<script>
		window._config = {
			pageType: 'front-page'
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
			<div id='book-loading-shade' class='ease'>
				<div id='book-loading-spinner'></div>
			</div>
			<div id='hint-wrapper' class='unselectable'>
				<div id='hint'>
					<div id='hint-title'>欢迎来到全新的</div>
					<img id='hint-logo' class='svg' src='<?php bloginfo('template_url');?>/img/hint-logo.svg'/>
					<div id='hint-text'>
						<p>
						　　你好，我们是水朝夕工作室，因为共同爱好而聚在一起的一群人。我们有关于电影，音乐，书籍的线下活动和一年一度的浙大青年电影节和潮汐音乐节——我们希望找一群趣味相投的人，一起聊天，一起玩。<br/>
						</p>
						<hr>
						<p><span class='hint-subtitle'>· 开放投稿啦！</span><br/>
							请点击左侧 <b>投稿</b>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
								<path fill="#fff" d="M12,0H3.5C2.7,0,2,0.7,2,1.5v17C2,19.3,2.7,20,3.5,20h13c0.8,0,1.5-0.7,1.5-1.5V6C15.6,3.6,14.3,2.3,12,0z M11.5,6.5v-5l5,5H11.5z"></path>
							</svg>
						</p>
						<p><span class='hint-subtitle'>· 分页阅读</span><br/>
							在文章页面可以通过单击页面边缘、使用←→键、鼠标滚轮、滑动屏幕来翻页
						</p>

					</div>
					<div id='hint-ignore-button'>
						我知道了
					</div>
				</div>
				<div id='hint-wave-wrapper'>
					<img id='hint-wave' src='<?php bloginfo('template_url');?>/img/hint-wave.svg'/>
				</div>
			</div>
			<div id='events-wrapper'>
				<h1>近期活动</h1>
				<div id='timeline-desktop'></div>
			</div>
	<?php else:?>
		<div id='wp-wrapper'>
			<div id='events-wrapper'>
				<h1>近期活动</h1>
				<div id='timeline-mobileHome'></div>
			</div>
	<?php endif?>
			<div class='posts-wrapper ease'>
				<h1>最新投稿 <?php if(!$isPhone): ?>	<a class='more' href="<?php echo home_url().'/all'?>">更多...</a><?php endif;?></h1>
				<div class='posts-container'>
					<?php
					$args1 = array(
						'posts_per_page'   => 8,
						'orderby' => 'post_date',
						'order' => 'DESC',
						'post_type' => 'post',
						'category__not_in'=> array(get_cat_ID('设计品'),get_cat_ID('编辑精选')),
						'post_status' => 'publish',
					);
					$query_latest = new WP_Query( $args1 );
					foreach ( $query_latest->get_posts() as $post ) : setup_postdata( $post );?>
						<?php //Begin Loop ?>
						<div class='wp-item wp-item-frontpage' onclick='location.href="<?php the_permalink(); ?>"'>
							<?php
							if ( has_post_thumbnail() ) {
								the_post_thumbnail(array(300,300),array('class' => 'wp-entrylist-thumbnail'));
							}
							?>
							<div class='wp-item-text wp-item-text-frontpage'>
								<h3><?php the_title(); ?></h3>
								<div class='wp-item-metadata'>
									文/ <a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
									@ <?php the_category(' &gt; ');?>
									, <?php the_date('Y-m-d');?>
								</div>
								<div class='wp-item-excerpt wp-item-excerpt-frontpage'><?php echo get_the_excerpt();?></div>
							</div>
						</div>
						<?php //End Loop  ?>
					<?php endforeach; wp_reset_postdata();?>
					<?php if($isPhone): ?>	<a class='more' href="<?php echo home_url().'/all'?>">更多...</a><?php endif;?>
				</div>
				<h1>编辑精选 <?php if(!$isPhone): ?>	<a class='more' href="<?php echo home_url().'/category/editors-picks'?>">更多...</a><?php endif;?></h1>
				<div class='posts-container'>
					<?php
					$args2 = array(
						'posts_per_page'   => 8,
						'orderby' => 'post_date',
						'order' => 'DESC',
						'post_type' => 'post',
						'cat' => get_cat_ID('编辑精选'),
						'post_status' => 'publish',
					);
					$query_editors_picks = new WP_Query( $args2 );
					foreach ( $query_editors_picks->get_posts() as $post ) : setup_postdata( $post );?>
						<?php //Begin Loop ?>
						<div class='wp-item wp-item-frontpage' onclick='location.href="<?php the_permalink(); ?>"'>
							<?php
							if ( has_post_thumbnail() ) {
								the_post_thumbnail(array(300,300),array('class' => 'wp-entrylist-thumbnail'));
							}
							?>
							<div class='wp-item-text wp-item-text-frontpage'>
								<h3><?php the_title(); ?></h3>
								<div class='wp-item-metadata'>
									文/ <a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
									@ <?php the_category(' &gt; ');?>
									, <?php the_date('Y-m-d');?>
								</div>
								<div class='wp-item-excerpt wp-item-excerpt-frontpage'><?php echo get_the_excerpt();?></div>
							</div>
						</div>
						<?php //End Loop  ?>
					<?php endforeach; wp_reset_postdata();?>
					<?php if($isPhone): ?>	<a class='more' href="<?php echo home_url().'/category/editors-picks'?>">更多...</a><?php endif;?>
				</div>
			</div>
		</div>
</body>
</html>

