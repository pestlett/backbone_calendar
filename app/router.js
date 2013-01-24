define([
  // Application.
  "app",
  
  // Modules
  'modules/user/user',
  'modules/layout/navigation',
  'modules/layout/content',
  'modules/errors/errors'
],

function(app, User, Navigation, Content, Errors) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
    	
    	app.user = new User.Model();
    	
      // TODO Clean this up...
      var collections = {
      };

      // Ensure the router has references to the collections.
      _.extend(this, collections);
      
      // Check we are logged in
      
      // Use main layout and set Views.
      this.layout = app.useLayout("layouts/main").setViews({
      	"#nav": new Navigation.Views.NavBar(),
      	"#container": new Content.Views.Container()
      });
    },

    routes: {
			'': 'index',
			'login': 'login',
      'logout': 'logout',
			'error/:error': 'error',
			'*action': 'default'
    },

    // Need a method for removing the previous container, if necessary (so group these routes), updates the menu structure and page layout according to backend data returned
    // Pass into the reset method an object containing the views as first parameter then whatever else
    // Have an active group... say that will do whatever and if active group is different from the one being rendered clear the #content, that is if it exists
    
    
    index: function() {
      // Reset the state and render.
    	console.log("BOOM");
      this.reset({
        "#content": new Content.Views.HomeView(  ) 
      });
    },
    
    error: function(error) {
    	this.reset({
    		"#content": new Errors.Views.Error( { error: error } ) 
    	}); // will fire off what is needed
    },
    
    login: function() {
    	console.log("HELLO");
    	this.reset({
    		"#content": new Content.Views.LoginView(  ) 
    	}, true);
    },

    logout: function(){
      console.log("LOGOUT");
      app.user.save({'loggedIn': false});
      app.router.navigate("#login", true);
    },
    
    default: function(action) {
      this.reset({
        "#content": new Errors.Views.Error( { error: 404 } ) 
      }); // will fire off what is needed
    },

    reset: function(newViews, bypassLogin) {
      bypassLogin = bypassLogin || false;
      var that = this;
      app.user.fetch({
        success: function(model){
          if(model.get("loggedIn") || bypassLogin) {
            newViews = newViews || {};
            that.layout.setViews(newViews);       
            that.layout.render();
          } else {
            if(Backbone.history.fragment !== "login") app.router.navigate("#login", true);
          }
        }
      });
    }
  });

  // Required, return the module for AMD compliance.
  return Router;

});