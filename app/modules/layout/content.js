define([
  // Application.
  "app"
],

function(app) {

  var Content = app.module();

  Content.Views.Container = Backbone.View.extend({
    template: "layouts/login.container"
  });
  
  Content.Views.LoginView = Backbone.View.extend({
  	template: "views/login.screen",
  	
  	events: {
  		"click input#login-button" : "attemptLogin"
  	},
  	
  	afterRender: function(){
  		$("input#username").focus();
  	},
  	
  	attemptLogin: function(ev){
  		
  		// Attempt a login
  		var username = $("input#username").val(),
  				password = $("input#password").val(),
  				url = app.root + '/backend/login/attempt';
  		
  		console.log(url);
  		$.ajax({
  			url: url,
  			type: 'post',
  			data: {
  				username: username,
  				password: password
  			},
  			dataType: 'json',
  			beforeSend: function(){
  				$("div#login-status").html("<img src=\"assets/img/res/loader_1.gif\" alt=\"Loading...\">");
  			},
  			success: function(d){
  				if(d.result){
  					$("div#login-status").html("Successfully logged in").removeClass('text-error').addClass('text-success');
  					// Proceed to login :)
  				}else{
  					$("input#username").val( d.message.split('/')[0] );
  					$("input#password").val("").focus();
  					$("div#login-status").html("Incorrect username or password").removeClass('text-success').addClass('text-error');
  				}
  			}
  		});
  		
  		return false;
  	}
  });
  
  // Required, return the module for AMD compliance.
  return Content;

});
