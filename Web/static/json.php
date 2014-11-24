<?php
/*
Template Name: JSON
*/
?>
<?php if (have_posts()) { while(have_posts()) { the_post();?>
<pre><?php the_content();?></pre>
<?php }} ?>
