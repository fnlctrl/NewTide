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
<script>
$(function(){
	var timeline = new MobileHome();
	timeline.start($('#timeline'),{
		'dataLocation': 'timeline.json',
		'maxEntryNumber': 999,
		'switchInterval': 10000,
		'backgroundColor': '#FFF'
	})
})
</script>
<body>
	<div id='timeline'></div>
</body>
</html>