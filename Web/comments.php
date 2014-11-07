<h2 id='wp-comments-form-title' class='keepwithnext'>评论</h2>
<?php if ($post->comment_status == 'open') : ?>
	<div id='wp-reply-form'>
		<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
			<p>请先<a href="<?php echo get_option('siteurl');?>/wp-login.php?redirect_to=<?php echo urlencode(get_permalink()); ?>">登录</a></p>
		<?php else : ?>
			<form id='wp-reply-form-content' action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method='post'>
				<?php if ( $user_ID ) : ?>
					<div>你好,
						<a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>
						<a href="<?php echo wp_logout_url(get_permalink()); ?>" title="退出登录">(退出登录)</a>
					</div>
				<?php else : ?>
					<input class='wp-nologin-form' type='text' name='author' placeholder="昵称 <?php if ($req) echo '(必填)'; ?>"/>
					<input class='wp-nologin-form' type='text' name='email' placeholder="邮箱 <?php if ($req) echo '(必填)'; ?>"/>
				<?php endif; ?>
				<button name='submit' type='submit'>发表评论</button>
				<textarea name='comment' placeholder='说点什么?'></textarea>
				<?php comment_id_fields(); ?>
				<?php do_action('comment_form', $post->ID); ?>
			</form>
		<?php endif;?>
	</div>
<?php endif;?>
<?php
$comments = get_comments(array('post_id'=>get_the_ID()));
foreach($comments as $comment) :
	?>
	<div class='wp-comment-item'>
		<div class='wp-comment-avatar'>
			<img src='<?php echo get_avatar_url(get_avatar( $comment->comment_author_email,50)); ?>'/>
		</div>
		<div class='wp-comment-text'>
			<div class='wp-comment-author'><?php echo $comment->comment_author; ?></div>
			<div class='wp-comment-date'><?php echo $comment->comment_date; ?></div>
			<div class='wp-comment-content'><?php echo $comment->comment_content; ?></div>
		</div>
	</div>
<?php
endforeach;
?>

