define([
  // Application.
  "app",
  // Modules
  
  // Modules
  'modules/user/user',
  'modules/layout/navigation',
  'modules/layout/content'
],

function(app, User, Navigation, Content) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
    	
    	app.User = new User.Model();
    	
    	app.User.fetch({
    		success: function(){
      		console.log(app.User);    			
    		},
    		error: function(){
      		console.log("Poop");
      		console.log(app.User);    			
    		}
    	});
    	
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