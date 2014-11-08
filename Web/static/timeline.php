<?php
/*
Template Name: Timeline
*/
?>
<!DOCTYPE html>
<html>
<head>
	<style>
		body {
			height: 100vh;
			overflow: hidden;
		}
	</style>
</head>
<body>
	<div id='timeline-embed'></div>
</body>
<script type="text/javascript">
	var timeline_config = {
		width:			 '100%',
		height:			 '98%',
		source:			 '<?php bloginfo("template_url");?>/activity.json',
		//start_at_end:	   true,						  //OPTIONAL START AT LATEST DATE
		start_at_slide:	 '0',							//OPTIONAL START AT SPECIFIC SLIDE
		start_zoom_adjust:  '0',							//OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
		hash_bookmark:	  true,						   //OPTIONAL LOCATION BAR HASHES
		debug:			  false,						   //OPTIONAL DEBUG TO CONSOLE
		// lang:			   'zh-ch',						   //OPTIONAL LANGUAGE
		maptype:			'watercolor',				   //OPTIONAL MAP STYLE
		css:				'<?php bloginfo("template_url");?>/timeline/css/timeline.css',	 //OPTIONAL PATH TO CSS
		js:				 '<?php bloginfo("template_url");?>/timeline/js/timeline-min.js'	//OPTIONAL PATH TO JS
	}
</script>
<script type="text/javascript" src="<?php bloginfo("template_url");?>/timeline/js/storyjs-embed.js"></script>
</html>