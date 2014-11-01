<div id='topbar'>
	<div id='topbar-menu'><div id='topbar-menu-icon' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/menu.svg'/></div></div>
	<div id='topbar-logo'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/logo.svg'/></div>
	<div id='topbar-title'>标题</div>
	<div id='topbar-search'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/search.svg'/></div>
</div>
<div id='sidebar' class='unselectable ease'>
	<a href="<?php bloginfo('url'); ?>"><img id='sidebar-logo' src='<?php bloginfo('template_url');?>/img/sidebar-logo.svg'/></a>
	<div id='sidebar-top'>
		<div id='user-head'></div>
		<div id='user-id'>登录</div>
	</div>
	<div id='sidebar-sections'>
		<div class='sidebar-section'><span onclick='location.href="<?php echo home_url().'/all'; ?>"'>文章</span><hr>
			<div id='sidebar-featured' class='sidebar-item <?php if(is_category('专题')||in_category('专题')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/featured/'; ?>"'>　专题 
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-featured.svg'/>
			</div>
			<div id='sidebar-movie' class='sidebar-item <?php if(is_category('电影')||in_category('电影')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/movie/'; ?>"'>　电影
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-movie.svg'/>
			</div>
			<div id='sidebar-literature' class='sidebar-item <?php if(is_category('文学')||in_category('文学')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/literature/'; ?>"'>　文学
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-literature.svg'/>
			</div>
			<div id='sidebar-music' class='sidebar-item <?php if(is_category('音乐')||in_category('音乐')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/music/'; ?>"'>　音乐
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-music.svg'/>
			</div>
			<div id='sidebar-life' class='sidebar-item <?php if(is_category('生活')||in_category('生活')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/category/life/'; ?>"'>　生活
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
			</div>
		</div>
		<div class='sidebar-section'><span>线下</span><hr>
			<div id='sidebar-event' class='sidebar-item <?php if(is_category('活动')||in_category('活动')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/events/'; ?>"'>　活动
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-event.svg'/>
			</div>
			<div id='sidebar-onepage' class='sidebar-item <?php if(is_category('设计品')||in_category('设计品')&&!is_home()) echo 'sidebar-item-current';?>' onclick='location.href="<?php echo home_url().'/prints/'; ?>"'>　印刷品
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-onepage.svg'/>
			</div>
		</div>
		<div class='sidebar-section'><span>关于</span><hr>
			<div id='sidebar-comment' class='sidebar-item <?php if(is_category('留言')||in_category('留言')&&!is_home()) echo 'sidebar-item-current';?>'>　留言
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-comment.svg'/>
			</div>
			<div id='sidebar-contribute' class='sidebar-item' onclick='location.href="<?php echo home_url().'/wp-login'; ?>"'>　投稿
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/>
			</div>
		</div>
	</div>
	<div id='sidebar-copyright' class='ease'>© 2001 - 2014 </br> 浙江大学求是潮</div>
</div>
<div id='cover'></div>