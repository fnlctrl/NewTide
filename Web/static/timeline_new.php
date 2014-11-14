<?php
/*
Template Name: Timeline
*/
?>
<!DOCTYPE html>
<html>
<head>
	<style>
		html {
			height: 100%;
			padding: 0;
		}
		body {
			height: 100%;
			overflow: hidden;
		}
		#timeline {
			height: 100%;
		}
	</style>
	<link rel='stylesheet' href='<?php bloginfo('template_url');?>/js/timeline/timeline.css' media='screen' />
	<script src='<?php bloginfo('template_url');?>/js/jquery-2.1.1.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/hammer-2.0.4.min.js'></script>
	<script src='<?php bloginfo('template_url');?>/js/timeline/timeline.js'></script>
</head>
<body>
	<div id='timeline'></div>
</body>
<script type="text/javascript">
	$(function(){
		var status = {
			isMobile: undefined
		};
		var util = {
			isMobile: function () {
				if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					status.isMobile = true;
				}
			}
		};
		util.isMobile();
		var timeline;
		if (status.isMobile) {
			if (/events/.test(location.href)) {
				timeline = new MobileDetail();
			} else {
				timeline = new MobileHome();
			}
		} else {
//			timeline = new DesktopTimeline();
		}
		timeline = new MobileHome();
		timeline.start($('#timeline'),{
			'dataLocation': '<?php bloginfo('template_url');?>/js/timeline/timeline.json',
			'maxEntryNumber': 999,
			'switchInterval': 10000,
			'backgroundColor': '#FFF'
		});
	});
</script>
</html>