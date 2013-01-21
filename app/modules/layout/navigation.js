define([
  // Application.
  "app"
],

function(app) {

  var Navigation = app.module();

  Navigation.Views.NavBar = Backbone.View.extend({
    template: "layouts/navigation"
  });
  
  // Required, return the module for AMD compliance.
  return Navigation;

});
