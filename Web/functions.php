<?php
update_option('image_default_link_type','none');

add_theme_support( 'post-thumbnails' ); 

add_image_size( 'wp-entrylist-thumbnail', 300, 300 );
remove_action( 'wp_head', '_admin_bar_bump_cb');
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



// remove all <a>s wrapped around <img>s
function filter_ptags_on_images( $content ){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '$2', $content);
}
add_filter('the_content', 'filter_ptags_on_images');

// remove all attr of <img>s
function filter_attr_on_images( $content ){
   return preg_replace('/(<img.*)class.*(title.*\/>)/iU', '$1$2', $content);
}
add_filter('the_content', 'filter_attr_on_images');
//
function get_avatar_url($get_avatar) {
	preg_match("/src='(.*?)'/i", $get_avatar, $matches);
	return $matches[1];
}
//
function remove_thumbnail_dimensions( $content ) {
    return preg_replace( '/(width|height)=\"\d*\"\s/', "", $content );
}
add_filter( 'post_thumbnail_html', 'remove_thumbnail_dimensions');
add_filter( 'image_send_to_editor', 'remove_thumbnail_dimensions');
add_filter( 'the_content', 'remove_thumbnail_dimensions');

// change the excerpt more string to '...'
function custom_excerpt_more( $more ) {
	return '  .....';
}
add_filter( 'excerpt_more', 'custom_excerpt_more' );

// change the excerpt length
function custom_excerpt_length( $length ) {
	return 60;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function my_login_logo() { ?>
	<style type="text/css">
		#login h1 a {
			width: 200px;
			height: 65px;
			background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/sidebar-logo.svg);
			background-size: 100%;
		}
	</style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );

// change login form style
function my_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return '水朝夕而至，曰潮';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

// enable contributors to upload file
function allow_contributor_uploads() {
	$contributor = get_role('contributor');
	$contributor->add_cap('upload_files');
}
if ( current_user_can('contributor') && !current_user_can('upload_files') ) {
	add_action('admin_init', 'allow_contributor_uploads');
}
?>
