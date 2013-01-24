define([
  // Application.
  'app',
  'backbone'
],

function(app, Backbone) {

  var User = app.module();

  User.Model = Backbone.Model.extend({
  	initialize: function(){
  		// Check localStorage and cookies and then verify with server
        // route to home page if currently at the login screen, probably check cookie as well, do this backend so cookie can be encrypted
  		this.fetch({
        success: function(model){
          if(model.get('loggedIn')){
            if(Backbone.history.fragment === "login") app.router.navigate("#", true);
          }else{
            if(Backbone.history.fragment !== "login") app.router.navigate("#login", true);
          }
        }
      });
  	},
  	
  	url: app.root + '/backend/login/check',
  	
  	defaults: {
  		id: 0,
  		loggedIn: false,
  		username: '',
  		friendlyNname: '',
  		email: '',
  		apiKey: ''
  	},
  	
  	checkPermissions: function(){  		
  	}
  });
  
  // Required, return the module for AMD compliance.
  return User;

});
