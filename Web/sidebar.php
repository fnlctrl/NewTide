<div id='topbar'>
	<div id='topbar-menu'><div id='topbar-menu-icon' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/menu.svg'/></div></div>
	<div id='topbar-logo' onclick='location.href="<?php echo home_url();?>"'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/logo.svg'/></div>
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
		<div class='sidebar-section'><a href="<?php echo home_url().'/all'; ?>" class='sidebar-section-title'>文章</a><hr>
			<a id='sidebar-featured' class='sidebar-item <?php if(is_category('专题')||in_category('专题')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/featured/'; ?>"'>　专题
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-featured.svg'/>
			</a>
			<a id='sidebar-movie' class='sidebar-item <?php if(is_category('电影')||in_category('电影')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/movie/'; ?>"'>　电影
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-movie.svg'/>
			</a>
			<a id='sidebar-literature' class='sidebar-item <?php if(is_category('文学')||in_category('文学')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/literature/'; ?>"'>　文学
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-literature.svg'/>
			</a>
			<a id='sidebar-music' class='sidebar-item <?php if(is_category('音乐')||in_category('音乐')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/music/'; ?>"'>　音乐
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-music.svg'/>
			</a>
			<a id='sidebar-life' class='sidebar-item <?php if(is_category('生活')||in_category('生活')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/life/'; ?>"'>　生活
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
			</a>
		</div>
		<div class='sidebar-section'><a class='sidebar-section-title'>线下</a><hr>
			<a id='sidebar-event' class='sidebar-item <?php if(is_category('活动')||in_category('活动')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/events/'; ?>"'>　活动
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-event.svg'/>
			</a>
			<a id='sidebar-onepage' class='sidebar-item <?php if(is_category('设计品')||in_category('设计品')&&!is_home()) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/designs/'; ?>"'>　设计品
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-onepage.svg'/>
			</a>
		</div>
		<div class='sidebar-section'><a class='sidebar-section-title'>关于</a><hr>
			<a id='sidebar-comment' class='sidebar-item <?php if(is_page('留言板')) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/leave-message/'; ?>"'>　留言
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-comment.svg'/>
			</a>
			<a id='sidebar-contribute' class='sidebar-item' href="<?php echo home_url().'/wp-admin'; ?>">　投稿
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/>
			</a>
		</div>
		<div class='sidebar-section'>
			<a target='_blank' class='sidebar-link' href='http://site.douban.com/125914/'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-douban.svg'/></a>
			<a target='_blank' class='sidebar-link' href='http://site.douban.com/125914/'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-weibo.svg'/></a>
			<a target='_blank' class='sidebar-link' href='http://weibo.com/zjuqsc'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-renren.svg'/></a>

		</div>
	</div>
	<div id='sidebar-copyright'>© 2001 - 2014 <br/> 浙江大学求是潮</div>
</div>
<div id='cover'></div>
