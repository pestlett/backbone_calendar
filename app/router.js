define([
  // Application.
  "app",
  // Modules
  
  // Views
  'modules/layout/navigation',
  'modules/layout/content'
  // Create a model for all views for the user
],

function(app, Navigation, Content) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      // TODO Clean this up...
      var collections = {
      };

      // Ensure the router has references to the collections.
      _.extend(this, collections);
      
      // Check we are logged in
      

      // Use main layout and set Views.
      app.useLayout("layouts/main").setViews({
      	"#nav": new Navigation.Views.NavBar(),
      	"#container": new Content.Views.Container().setViews({
      		"#content": new Content.Views.LoginView( { person: { name: 'Martin Jewell', age: 27 } } )
      	})
      }).render();
    },

    routes: {
			'': 'index',
			'!/login': 'login',
			'!/error/:error': 'error',
			'*action': 'default'
    },

    index: function() {
      // Reset the state and render.
      this.reset();
    },
    
    error: function(error) {
    	this.reset(); // will fire off what is needed
    },
    
    login: function() {
    	this.reset();
    },
    
    default: function(action) {
    	this.reset();
    },

    reset: function() {
      // Reset active model.
      app.active = false;
    }
  });

  // Required, return the module for AMD compliance.
  return Router;

});