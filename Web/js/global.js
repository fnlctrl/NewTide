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
/*! waitForImages jQuery Plugin 2014-11-07 */
!function(a){var b="waitForImages";a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},a.expr[":"].uncached=function(b){if(!a(b).is('img[src][src!=""]'))return!1;var c=new Image;return c.src=b.src,!c.complete},a.fn.waitForImages=function(c,d,e){var f=0,g=0;if(a.isPlainObject(arguments[0])&&(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var h=a(this),i=[],j=a.waitForImages.hasImageProperties||[],k=a.waitForImages.hasImageAttributes||[],l=/url\(\s*(['"]?)(.*?)\1\s*\)/g;e?h.find("*").addBack().each(function(){var b=a(this);b.is("img:uncached")&&i.push({src:b.attr("src"),element:b[0]}),a.each(j,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=l.exec(e);)i.push({src:d[2],element:b[0]})}),a.each(k,function(c,d){var e,f=b.attr(d);return f?(e=f.split(","),void a.each(e,function(c,d){d=a.trim(d).split(" ")[0],i.push({src:d,element:b[0]})})):!0})}):h.find("img:uncached").each(function(){i.push({src:this.src,element:this})}),f=i.length,g=0,0===f&&c.call(h[0]),a.each(i,function(e,i){var j=new Image,k="load."+b+" error."+b;a(j).on(k,function l(b){return g++,d.call(i.element,g,f,"load"==b.type),a(this).off(k,l),g==f?(c.call(h[0]),!1):void 0}),j.src=i.src})})}}(jQuery);