define([
  // Application.
  'app',
  'backbone'
],

function(app, Backbone) {

  var User = app.module();

  User.Model = Backbone.Model.extend({
    initialize: function(){
      that = this;
      // Check localStorage and cookies and then verify with server
      // route to home page if currently at the login screen, probably check cookie as well, do this backend so cookie can be encrypted
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
