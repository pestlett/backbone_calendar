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

  // Required, return the module for AMD compliance.
  return Permissions;

});
