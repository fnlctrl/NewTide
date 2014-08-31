<?php

// function theme_scripts_styles() {
// 	wp_enqueue_style( 'sidebar',  get_template_directory_uri() . '/css/sidebar.css', array(), '1.0', 'all');
// 	wp_enqueue_style( 'sidebar',  get_template_directory_uri() . '/css/global.css', array(), '1.0', 'all');
// 	wp_enqueue_script( 'jQuery', get_template_directory_uri() . '/js/jquery-2.1.0.min.js', array(), '2.1.0', false );
// }

// add_action( 'wp_enqueue_scripts', 'theme_scripts_styles' );



add_theme_support( 'post-thumbnails' ); 


remove_action('wp_head', '_admin_bar_bump_cb');
remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'index_rel_link' ); // index link
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post.
remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version

show_admin_bar(false);

add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );

// remove all auto added width and height to imgs
function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}


// remove all <a>s wrapped around <img>s
function filter_ptags_on_images($content){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\2', $content);
}
add_filter('the_content', 'filter_ptags_on_images');




?>