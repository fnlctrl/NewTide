<?php
	$user = wp_get_current_user();
	$mobileDetect = new Mobile_Detect;
	$isMobile = $mobileDetect->isMobile();
?>
<?php if ($isMobile):?>
	<div id='topbar' class='unselectable'>
		<div id='topbar-menu'><div id='topbar-menu-icon' class='ease'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/menu.svg'/></div></div>
		<div id='topbar-search-icon'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/search.svg'/></div>
		<a id='topbar-logo' href="<?php echo home_url();?>"><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/logo.svg'/></a>
		<div id='topbar-title'></div>
		<form class='topbar-search-wrapper search-wrapper ease'>
			<input id='topbar-search-input' type='text' name='s' placeholder='搜索'/>
			<div id='topbar-search-return'><img class='svg' src='<?php bloginfo('template_url');?>/img/mobile/return.svg'/></div>
		</form>
		&nbsp; <!-- a nasty, hacky fix for blurry position:fixed images on android browser 4.1 and older -->
	</div>
	<div class='cover ease'></div>
<?php else:?>
	<div id='login'>
		<a id='login-logo' href="<?php bloginfo('url'); ?>"></a>
		<p id='login-message'></p>
		<form id='login-form' method='post' data-type='login'>
			<h3 id='login-form-title'>登录</h3>
			<label for='username'>用户名</label><input id='username' type='text' name='username' class='login-form-input'/>
			<label for='password'>密码</label><input id='password' type='password' name='password' class='login-form-input'/>
			<label for='confirm-password'>确认密码</label><input id='confirm-password' type='password' name='confirm-password' class='login-form-input'/>
			<label for='email'>电子邮件</label><input id='email' type='text' name='email' class='login-form-input'/>
			<label for='email-or-id'>用户名或电子邮件地址：</label><input id='email-or-id' type='text' name='email-or-id' class='login-form-input'/>
			<input class='login-submit' type='submit' value='确定' name='submit'/>
			<a id='login-show-auth'>登录<br></a>
			<a id='login-show-register'>注册<br></a>
			<a id='login-show-reset-password'>忘记密码？</a>
			<?php wp_nonce_field( 'ajax-login-nonce', 'security' ); ?>
		</form>
	</div>
<?php endif;?>
<div id='sidebar' class='unselectable ease'>
	<?php if ($isMobile):?>
		<div id='sidebar-top'>
			<img id='user-head' src='<?php echo get_avatar_url(get_avatar(  $user->user_email,150)); ?>'/>
			<div id='user-id'>
				<?php if ( $user_ID ) : ?>
					<a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user->display_name;?></a>
					<p><?php echo $user->user_email?></p>
				<?php else : ?>
					<a href="<?php echo get_option('siteurl'); ?>/login">登录</a>
				<?php endif; ?>
			</div>
		</div>
	<?php else:?>
		<div id='sidebar-external-links'>
			<a target='_blank' class='sidebar-link' href='http://www.qsc.zju.edu.cn'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-qsc.svg'/></a>
			<a target='_blank' class='sidebar-link' href='http://site.douban.com/125914/'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-douban.svg'/></a>
			<a target='_blank' class='sidebar-link' href='http://weibo.com/zjuqsc'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-weibo.svg'/></a>
			<a target='_blank' class='sidebar-link' href='http://page.renren.com/601378976/'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-renren.svg'/></a>
			<a target='_blank' class='sidebar-link' id='sidebar-weixin'><img class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-external-weixin.svg'/></a>
			<div id='sidebar-qrcode-wrapper'>
				分享到微信
				<div id='sidebar-qrcode'></div>
			</div>
		</div>
		<a id='sidebar-logo' href="<?php bloginfo('url'); ?>"><img src='<?php bloginfo('template_url');?>/img/sidebar-logo.svg'/></a>
		<form id='sidebar-search-wrapper' class='search-wrapper ease'>
			<input class='ease' id='sidebar-search-input' type='text' name='s' onblur="this.value=''"/>
			<img id='sidebar-search-icon' class='svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-search.svg'/>
		</form>
		<div id='sidebar-login-status'>
			<?php if (!$user_ID ) : ?>
				<button id="sidebar-login-btn">登录/注册</button>
			<?php else :?>
				欢迎回来,<br/>
				<a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user->display_name; ?></a>
				<a href="<?php echo wp_logout_url(get_permalink()); ?>">(退出)</a>
			<?php endif; ?>
		</div>
	<?php endif;?>
	<div id='sidebar-sections'>
		<div class='sidebar-section'><a href="<?php echo home_url().'/all'; ?>" class='sidebar-section-title'>文章</a><hr>
			<a class='sidebar-item <?php if(is_category('专题')||in_category('专题')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')&!(is_category('设计品')||in_category('设计品'))) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/featured/'; ?>">　专题
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-featured.svg'/>
			</a>
			<a class='sidebar-item <?php if(is_category('电影')||in_category('电影')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')&!(is_category('设计品')||in_category('设计品'))) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/movie/'; ?>">　电影
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-movie.svg'/>
			</a>
			<a class='sidebar-item <?php if(is_category('文学')||in_category('文学')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')&!(is_category('设计品')||in_category('设计品'))) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/literature/'; ?>">　文学
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-literature.svg'/>
			</a>
			<a class='sidebar-item <?php if(is_category('音乐')||in_category('音乐')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')&!(is_category('设计品')||in_category('设计品'))) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/music/'; ?>">　音乐
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-music.svg'/>
			</a>
			<a class='sidebar-item <?php if(is_category('生活')||in_category('生活')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')&!(is_category('设计品')||in_category('设计品'))) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/life/'; ?>">　生活
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-life.svg'/>
			</a>
		</div>
		<div class='sidebar-section'><a class='sidebar-section-title'>线下</a><hr>
			<a class='sidebar-item <?php if(is_page('线下活动')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/events/'; ?>">　活动
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-event.svg'/>
			</a>
			<a class='sidebar-item <?php if(is_category('设计品')||in_category('设计品')&&!is_home()&&!is_category('编辑精选')&&!is_page('搜索结果')) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/category/designs/'; ?>">　设计品
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-designs.svg'/>
			</a>
		</div>
		<div class='sidebar-section'><a class='sidebar-section-title'>关于</a><hr>
			<a class='sidebar-item <?php if(is_page('留言板')) echo 'sidebar-item-current';?>' href="<?php echo home_url().'/leave-message/'; ?>">　留言
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-message.svg'/>
			</a>
			<a class='sidebar-item' href="<?php echo home_url().'/wp-admin'; ?>">　投稿
				<img class='sidebar-icon svg' src='<?php bloginfo('template_url');?>/img/sidebar-icon-contribute.svg'/>
			</a>
		</div>
	</div>
	<?php if (!$isMobile):?>
	<div id='sidebar-copyright'>© 2001 - 2014 <br/> 浙江大学求是潮</div>
	<?php endif; ?>
</div>
