$(function(){
	var $body = $('body'),
		$sidebarLoginButton = $('#sidebar-login-btn'),
		$login = $('#login'),
		$loginForm = $('#login-form'),
		$loginMessage = $('#login-message'),
		$loginShowAuth = $('#login-show-auth'),
		$loginShowRegister = $('#login-show-register'),
		$loginShowResetPassword = $('#login-show-reset-password'),
		$loginFormTitle = $('#login-form-title');

	$sidebarLoginButton.on('click', function(e){
		$body.prepend('<div id="login-overlay"></div>');
		$login.css({display:'block',opacity:1});
		var $overlay = $('#login-overlay');
		$overlay.css({opacity:0.7}).on('click', function(){
			var $this = $(this);
			$this.css({opacity:0});
			$login.css({opacity:0,display:'none'});
			setTimeout(function() {
				$this.remove();
			},300)
		});
		e.preventDefault();
	});
	$loginShowAuth.click(function() {
		$loginFormTitle.text('登录');
		$loginForm.attr('data-type','login');
	});
	$loginShowRegister.click(function() {
		$loginFormTitle.text('注册');
		$loginForm.attr('data-type','register');
	});
	$loginShowResetPassword.click(function() {
		$loginFormTitle.text('重置密码');
		$loginForm.attr('data-type','reset-password');
	});
	$loginForm.on('submit', function(e) {
		var formType = $loginForm.attr('data-type');
		if (formType === 'login') {
			$loginMessage.css({display:'block'}).text('正在登录...').append('<div class="spinner"></div>');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: siteInfo.ajaxurl,
				data: {
					'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
					'username': $('#username').val(),
					'password': $('#password').val(),
					'security': $('#security').val()
				},
				success: function(data){
					$loginMessage.text(data.message);
					if (data.loggedin == true){
						document.location.href = siteInfo.redirecturl;
					}
				}
			});
		} else if (formType === 'register'){
			$loginMessage.css({display:'block'}).text('正在注册...请稍候').append('<div class="spinner"></div>');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: siteInfo.ajaxurl,
				data: {
					'action': 'register_user',
					'username': $('#username').val(),
					'email': $('#email').val(),
					'security': $('#security').val()
				},
				success: function(data){
					$loginMessage.css({display:'block'}).text(data.message);
				}
			});
		} else if (formType === 'reset-password'){
			$loginMessage.css({display:'block'}).text('正在发送邮件...请稍候').append('<div class="spinner"></div>');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: siteInfo.ajaxurl,
				data: {
					'action': 'reset_user_pass',
					'user_login': $('#email-or-id').val(),
					'user_mail': $('#email-or-id').val(),
					'security': $('#security').val()
				},
				success: function(data){
					$loginMessage.css({display:'block'}).text(data.message);
				}
			});
		}
		e.preventDefault();
	});
});