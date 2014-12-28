$(function(){
//Replace all SVG images with inline SVG
jQuery('img.svg').each(function(){
	var $img = jQuery(this);
	var imgID = $img.attr('id');
	var imgClass = $img.attr('class');
	var imgStyle = $img.attr('style');
	var imgURL = $img.attr('src');
	jQuery.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = jQuery(data).find('svg');
		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}
		// Add replaced image's style to the new SVG
		if(typeof imgStyle !== 'undefined') {
			$svg = $svg.attr('style', imgStyle);
		}
		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');
		// Replace image with new SVG
		$img.replaceWith($svg);
	}, 'xml');
});
});

// prevent iPhone Safari Web App open links in new window
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");