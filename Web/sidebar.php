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
			<div id='sidebar-life' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/life/'; ?>"'>　生活
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
			</div>
		</div>
		<div class='sidebar-section'><span>线下</span><hr>
			<div id='sidebar-event' class='sidebar-item' onclick='location.href="<?php echo home_url().'/category/event/'; ?>"'>　活动
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