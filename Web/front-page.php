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
	<meta name="mobile-web-app-capable" content="yes">
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/desktop.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/front-page.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/css/mobile.css' media='screen' />
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/timeline/timeline.css' media='screen' />
	<link rel='shortcut icon' href='<?php echo get_stylesheet_directory_uri(); ?>/favicon.png' />
	<?php wp_head(); ?>
	<script>
		dataLocation ='<?php bloginfo("template_url");?>/new.json';
	</script>
	<script src='<?php bloginfo('template_url');?>/timeline/timeline.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/front-page.js'></script>
</head>
<body>
	<?php get_sidebar(); ?>
	<div id='book-container' class='ease'>
		<div id='menu-icon'>
			<div id='menu-icon-arrow' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon-arrow.svg'/></div>
			<img class='svg' src='<?php bloginfo('template_url');?>/img/menu-icon.svg'/>
		</div>
		<div id='book-loading-shade' class='ease'></div>
		<div id='hint-wrapper' class='unselectable'>
			<div id='hint'>
				<div id='hint-title'>欢迎来到全新的</div>
				<img id='hint-logo' class='svg' src='<?php bloginfo('template_url');?>/img/hint-logo.svg'/>
				<div id='text'>
					<p>
					　　你好，我们是水朝夕工作室，因为共同爱好聚在一起的一群人。现在你看到的，是我们尝试与有爱的大家联系的窗口。<br/>
					</p>
					<hr>
					<p><span class='hint-subtitle'>· 开放投稿啦！</span><br/>
						请点击左侧 <b>投稿</b> <img class='hint-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/><br/>
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
			<div id='timeline'></div>
		</div>
		<div id='posts-wrapper' class='ease'>
			<h1>编辑精选　<a class='more' href="<?php echo home_url().'/category/editors-picks'?>">更多...</a></h1>
			<div class='posts-container'>
				<?php
				$args1 = array(
					'posts_per_page'   => 8,
					'orderby' => 'post_date',
					'order' => 'DESC',
					'post_type' => 'post',
					'cat' => get_cat_ID('编辑精选'),
					'post_status' => 'publish',
				);
				$query_editors_picks = new WP_Query( $args1 );
				foreach ( $query_editors_picks->get_posts() as $post ) : setup_postdata( $post );?>
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
			</div>
			<h1>最新投稿　<a class='more' href="<?php echo home_url().'/all'?>">更多...</a></h1>
			<div class='posts-container'>
				<?php
				$args2 = array(
					'posts_per_page'   => 8,
					'orderby' => 'post_date',
					'order' => 'DESC',
					'post_type' => 'post',
					'category__not_in'=> array(get_cat_ID('设计品'),get_cat_ID('编辑精选')),
					'post_status' => 'publish',
				);
				$query_latest = new WP_Query( $args2 );
				foreach ( $query_latest->get_posts() as $post ) : setup_postdata( $post );?>
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
			</div>
		</div>
	</div>
	<!-- Piwik -->
	<script type="text/javascript">
	  var _paq = _paq || [];
	  _paq.push(['trackPageView']);
	  _paq.push(['enableLinkTracking']);
	  (function() {
	    var u="//piwik.zjuqsc.com/";
	    _paq.push(['setTrackerUrl', u+'piwik.php']);
	    _paq.push(['setSiteId', 3]);
	    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
	  })();
	</script>
	<noscript><p><img src="//piwik.zjuqsc.com/piwik.php?idsite=3" style="border:0;" alt="" /></p></noscript>
	<!-- End Piwik Code -->
</body>
</html>

