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


// enqueue scripts
function theme_scripts() {
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/js/modernizr.custom.js', array(), '1.0.0', false);
	wp_enqueue_script( 'underscore-1.6.0', get_template_directory_uri() . '/js/underscore-1.6.0.min.js', array(), '1.6.0', false);
	wp_enqueue_script( 'jquery-2.11', get_template_directory_uri() . '/js/jquery-2.1.1.min.js', array(), '2.1.1', false);
	wp_enqueue_script( 'jquery.mousewheel', get_template_directory_uri() . '/js/jquery.mousewheel.min.js', array(), '3.1.12', false);
	wp_enqueue_script( 'jquery.qrcode', get_template_directory_uri() . '/js/jquery.qrcode.min.js', array(), '1.0.0', false);
	wp_enqueue_script( 'hammer', get_template_directory_uri() . '/js/hammer-2.0.4.min.js', array(), '2.0.4', false);
	wp_enqueue_script( 'global', get_template_directory_uri() . '/js/global.js', array(), '1.0.0', false);
	wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', false);
	wp_enqueue_script('ajax-login', get_template_directory_uri() . '/js/ajax-login.js', array() );
	wp_localize_script('ajax-login', 'ajaxLoginObject', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'redirecturl' => get_permalink(),
	));
}
add_action( 'wp_enqueue_scripts', 'theme_scripts',3);
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
// get just the src of avatar insted of <img> tag
function get_avatar_url($get_avatar) {
	preg_match("/src='(.*?)'/i", $get_avatar, $matches);
	return $matches[1];
}
// remove height and width attr of imgs
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
// change login form logo
function my_login_logo() { ?>
	<style type="text/css">
		#login h1 a {
			width: 200px !important;
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
// change login title
function my_login_logo_url_title() {
    return '水朝夕而至，曰潮';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );
// enable contributors and authors to upload file and read unpublished posts
function allow_upload_and_read() {
	$contributor = get_role('contributor');
	$contributor->add_cap('upload_files');
	$contributor->add_cap('read_private_pages');
	$contributor->add_cap('read_private_posts');
	$contributor->add_cap('read_post');
	$author = get_role('author');
	$author->add_cap('read_private_pages');
	$author->add_cap('read_post');
	$author->add_cap('read_private_posts');
}
if ( current_user_can('contributor') || current_user_can('author')) {
	add_action('admin_init', 'allow_upload_and_read');
}
// Ajax login
function ajax_login(){
	// First check the nonce, if it fails the function will break
	check_ajax_referer( 'ajax-login-nonce', 'security' );
	$userinfo = array(
		'user_login' => $_POST['username'],
		'user_password' => $_POST['password'],
		'remember' => true,
	);
	$user_signon = wp_signon( $userinfo, false );
	if ( is_wp_error($user_signon) ){
		echo json_encode(array(
			'loggedin' => false,
			'message'=> '用户名或密码错误'
		));
	} else {
		echo json_encode(array(
			'loggedin' => true,
			'message'=> '登录成功'
		));
	}
	exit();
}
add_action('wp_ajax_nopriv_ajaxlogin', 'ajax_login');
// Ajax registration
function ajax_register() {
	// First check the nonce, if it fails the function will break
	check_ajax_referer( 'ajax-login-nonce', 'security' );
	$user_register = register_new_user($_POST['username'], $_POST['email']);
	if (!is_wp_error($user_register)) {
		echo json_encode(array('message'=>'注册完成。请查收我们给您发的邮件。'));
	} else {
		$message = preg_replace('/<strong>(.*)<\/strong>(.*)/','$1$2',$user_register->get_error_message());
		echo json_encode(array('message'=>$message));
	}
	exit();
}
add_action('wp_ajax_nopriv_register_user', 'ajax_register');
// Ajax reset password
function ajax_reset_password() {
	// First check the nonce, if it fails the function will break
	check_ajax_referer( 'ajax-login-nonce', 'security' );
	$user_reset_password = _retrieve_password();
	if ( !is_wp_error($user_reset_password) ) {
		echo json_encode(array('message'=>'发送完成。您会收到一封包含创建新密码链接的电子邮件。'));
	} else {
		$message = preg_replace('/<strong>(.*)<\/strong>(.*)/','$1$2',$user_reset_password->get_error_messages());
		echo json_encode(array('message'=>$message));
	}
	exit();
	function _retrieve_password() { // this is retrieve_password() found in wp-login.php
		global $wpdb, $wp_hasher;
		$errors = new WP_Error();
		if ( empty( $_POST['user_login'] ) ) {
			$errors->add('empty_username', __('<strong>ERROR</strong>: Enter a username or e-mail address.'));
		} else if ( strpos( $_POST['user_login'], '@' ) ) {
			$user_data = get_user_by( 'email', trim( $_POST['user_login'] ) );
			if ( empty( $user_data ) )
				$errors->add('invalid_email', __('<strong>ERROR</strong>: There is no user registered with that email address.'));
		} else {
			$login = trim($_POST['user_login']);
			$user_data = get_user_by('login', $login);
		}
		do_action( 'lostpassword_post' );
		if ( $errors->get_error_code() )
			return $errors;
		if ( !$user_data ) {
			$errors->add('invalidcombo', __('<strong>ERROR</strong>: Invalid username or e-mail.'));
			return $errors;
		}
		$user_login = $user_data->user_login;
		$user_email = $user_data->user_email;
		$allow = apply_filters( 'allow_password_reset', true, $user_data->ID );
		if ( ! $allow )
			return new WP_Error('no_password_reset', __('Password reset is not allowed for this user'));
		else if ( is_wp_error($allow) )
			return $allow;
		$key = wp_generate_password( 20, false );
		do_action( 'retrieve_password_key', $user_login, $key );
		if ( empty( $wp_hasher ) ) {
			require_once ABSPATH . WPINC . '/class-phpass.php';
			$wp_hasher = new PasswordHash( 8, true );
		}
		$hashed = $wp_hasher->HashPassword( $key );
		$wpdb->update( $wpdb->users, array( 'user_activation_key' => $hashed ), array( 'user_login' => $user_login ) );
		$message = __('Someone requested that the password be reset for the following account:') . "\r\n\r\n";
		$message .= network_home_url( '/' ) . "\r\n\r\n";
		$message .= sprintf(__('Username: %s'), $user_login) . "\r\n\r\n";
		$message .= __('If this was a mistake, just ignore this email and nothing will happen.') . "\r\n\r\n";
		$message .= __('To reset your password, visit the following address:') . "\r\n\r\n";
		$message .= '<' . network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login') . ">\r\n";
		if ( is_multisite() )
			$blogname = $GLOBALS['current_site']->site_name;
		else
			$blogname = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
		$title = sprintf( __('[%s] Password Reset'), $blogname );
		$title = apply_filters( 'retrieve_password_title', $title );
		$message = apply_filters( 'retrieve_password_message', $message, $key );
		if ( $message && !wp_mail( $user_email, wp_specialchars_decode( $title ), $message ) )
			wp_die( __('The e-mail could not be sent.') . "<br />\n" . __('Possible reason: your host may have disabled the mail() function.') );
		return true;
	}
}
add_action('wp_ajax_nopriv_reset_user_pass', 'ajax_reset_password' );
// replace all gravatar with local default image
add_filter( 'get_avatar' , 'remove_gravatar' , 1 , 4 );
function remove_gravatar( $avatar ) {
	return preg_replace('/http:\/\/.*gravatar\.com.*\b/',get_template_directory_uri().'/img/default-avatar.png', $avatar);}
?>












