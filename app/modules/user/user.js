define([
  // Application.
  'app',
  'backbone'
],

function(app, Backbone) {

  var Permission = Backbone.Model.extend({
    initialize: function(){
    },

    url: app.root + '/backend/permission',

    defaults: {
      id: null,
      name: ''
    }
  });

  var Permissions = Backbone.Collection.extend({

    initialize: function(userId){
      this.userId = userId;
    },
    model: Permission,
    url: app.root + '/backend/permissions/user/'
  });

  var User = app.module();

  User.Model = Backbone.Model.extend({
  	initialize: function(){
      that = this;
  		// Check localStorage and cookies and then verify with server
        // route to home page if currently at the login screen, probably check cookie as well, do this backend so cookie can be encrypted      
  		this.fetch({
        success: function(model){
          if(model.get('loggedIn')){
            that.permissions = new Permissions(model.get('id')); // Load our permissions
            if(Backbone.history.fragment === "login") app.router.navigate("#", true);
          }else{
            that.permissions = null;
            if(Backbone.history.fragment !== "login") app.router.navigate("#login", true);
          }
        }
      });
  	},
  	
  	url: app.root + '/backend/login/check',

    permissions: null, // start off with no permissions :)
  	
  	defaults: {
  		id: 0,
  		loggedIn: false,
  		username: '',
  		friendlyNname: '',
  		email: '',
  		apiKey: ''
  	},
  	
  	checkPermissions: function(permissionIDs){

  	}
  });
  
  // Required, return the module for AMD compliance.
  return User;

});
