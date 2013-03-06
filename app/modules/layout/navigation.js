define([
  // Application.
  "app"
],

function(app) {

  var Navigation = app.module();

  Navigation.Views.NavBar = Backbone.View.extend({
	initialize: function(nav){
		this.sys = nav.sys;
		this.menu = nav.menu;
	},
	template: "layouts/navigation",
	serialize: function(){
		return { menu: this.menu, sys: this.sys} ;
	}
  });

  // Required, return the module for AMD compliance.
  return Navigation;

});