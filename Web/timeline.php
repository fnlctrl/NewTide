<?php
/*
Template Name: 线下活动
*/
?>
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
	<script src='<?php bloginfo('template_url');?>/js/global.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/main.js'></script>
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
		<div id='book-pages'>
			<div id="timeline-embed"></div>
		</div>
	</div>
</body>

</html>
<script type="text/javascript">
	var timeline_config = {
		width:			 '50%',
		height:			 '100%',
		source:			 '<?php bloginfo("template_url");?>/activity.json',
		//start_at_end:	   true,						  //OPTIONAL START AT LATEST DATE
		start_at_slide:	 '1',							//OPTIONAL START AT SPECIFIC SLIDE
		start_zoom_adjust:  '-2',							//OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
		hash_bookmark:	  true,						   //OPTIONAL LOCATION BAR HASHES
		debug:			  false,						   //OPTIONAL DEBUG TO CONSOLE
		// lang:			   'zh-ch',						   //OPTIONAL LANGUAGE
		maptype:			'watercolor',				   //OPTIONAL MAP STYLE
		css:				'<?php bloginfo("template_url");?>/timeline/css/timeline.css',	 //OPTIONAL PATH TO CSS
		js:				 '<?php bloginfo("template_url");?>/timeline/js/timeline-min.js'	//OPTIONAL PATH TO JS
	}
</script>
<script type="text/javascript" src="<?php bloginfo("template_url");?>/timeline/js/storyjs-embed.js"></script>


