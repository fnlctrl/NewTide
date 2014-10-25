<div id='sidebar' class='unselectable ease'>
	<a href="<?php bloginfo('url'); ?>"><img id='sidebar-logo' src='<?php bloginfo('template_url');?>/img/sidebar-logo.svg'/></a>
	<div id='sidebar-sections'>
		<div class='sidebar-section'><span>文章</span><hr>
			<div id='sidebar-featured' class='sidebar-item <?php if(is_category('专题')||in_category('专题')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/featured/'; ?>"'>　专题 
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-featured.svg'/>
			</div>
			<div id='sidebar-movie' class='sidebar-item <?php if(is_category('电影')||in_category('电影')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/movie/'; ?>"'>　电影
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-movie.svg'/>
			</div>
			<div id='sidebar-literature' class='sidebar-item <?php if(is_category('文学')||in_category('文学')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/literature/'; ?>"'>　文学
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-literature.svg'/>
			</div>
			<div id='sidebar-music' class='sidebar-item <?php if(is_category('音乐')||in_category('音乐')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/music/'; ?>"'>　音乐
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-music.svg'/>
			</div>
			<div id='sidebar-life' class='sidebar-item <?php if(is_category('生活')||in_category('生活')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/life-2/'; ?>"'>　生活
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
			</div>
		</div>
		<div class='sidebar-section'><span>线下</span><hr>
			<div id='sidebar-event' class='sidebar-item <?php if(is_category('活动')||in_category('活动')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/events/'; ?>"'>　活动
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-event.svg'/>
			</div>
			<div id='sidebar-onepage' class='sidebar-item <?php if(is_category('一张纸')||in_category('一张纸')) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/onepage/'; ?>"'>　一张纸
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-onepage.svg'/>
			</div>
		</div>
		<div class='sidebar-section'><span>关于</span><hr>
			<div id='sidebar-comment' class='sidebar-item <?php if(is_category('留言')||in_category('留言')) echo 'sidebar-item-current';?>'>　留言
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-comment.svg'/>
			</div>
			<div id='sidebar-contribute' class='sidebar-item <?php if(is_category('投稿')||in_category('投稿')) echo 'sidebar-item-current';?>'>　投稿
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/>
			</div>
		</div>
	</div>
</div>
