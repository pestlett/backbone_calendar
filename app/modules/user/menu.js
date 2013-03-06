define([
  // Application.
  'app',
  'backbone'
],

function(app, Backbone) {

  var Menu = app.module();

  Menu.Model = Backbone.Model.extend({
    initialize: function(){},
    defaults: {
      displayName: '',
      url: '',
      active: false
    },
    events: {
      "click li a": function(ev){
        $("li a.active").removeClass("active");
        $(this).addClass("active");
        console.log(this);
      }
    }
  });

  Menu.Collection = Backbone.Collection.extend({
    initialize: function(userId){
      this.userId = userId;
    },
    model: Menu.Model,
    url: app.root + '/backend/user/menu'
  });

  // Required, return the module for AMD compliance.
  return Menu;

});
