define([
  // Application.
  "app"
],

function(app) {

  var User = app.module();

  User.Model = Backbone.Model.extend({
  	initialize: function(){
  		// Check localStorage and cookies and then verify with server
  		Backbone.localSync("read", this);
  	},
  	localStorage:  new Backbone.LocalStorage("User"),
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
