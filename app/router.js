define([
  // Application.
  "app",

  // Modules
  'modules/user/user',
  'modules/user/menu',
  'modules/user/permissions',
  'modules/layout/navigation',
  'modules/layout/content',
  'modules/errors/errors'
],

function(app, User, Menu, Permissions, Navigation, Content, Errors) {

  "use strict";

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {

      app.user = new User.Model();
    },

    routes: {
      '': 'index',
      'login': 'login',
      'logout': 'logout',
      'error/:error': 'error',
      '*action': 'defaultAction'
    },

    // Need a method for removing the previous container, if necessary (so group these routes), updates the menu structure and page layout according to backend data returned
    // Pass into the reset method an object containing the views as first parameter then whatever else
    // Have an active group... say that will do whatever and if active group is different from the one being rendered clear the #content, that is if it exists

    /**
     * Our index view
     * @return {[type]} [description]
     */
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

    defaultAction: function(action) {
      this.reset({
        "#content": new Errors.Views.Error( { error: 404 } )
      }); // will fire off what is needed
    },

    reset: function(newViews, bypassLogin) {
      bypassLogin = bypassLogin || false;
      var that = this;
      app.user.fetch({
        success: function(model){
          if(model.get("loggedIn")) {
            var friendlyName = app.user.get("friendlyName");
            app.user.menu = new Menu.Collection(model.get('id'));
            app.user.menu.fetch({
              success: function(menuModel){
                menuModel.models.forEach(function(a){
                });
                // Use main layout and set Views.
                that.layout = app.useLayout("layouts/main").setViews({
                  "#container": new Content.Views.Container(),
                  "#nav": new Navigation.Views.NavBar({
                    "sys": {name: app.appName, status: (app.user.get("loggedIn")?"Welcome " + friendlyName:"")},
                    "menu": ( menuModel.toJSON()[0] )
                  })
                });
                newViews = newViews || {};
                that.layout.setViews( newViews );
                that.layout.render();
              }
            });
          } else if(bypassLogin) {
            that.layout = app.useLayout("layouts/main").setViews({
              "#container": new Content.Views.Container(),
              "#nav": new Navigation.Views.NavBar({
                "sys": {name: app.appName, status: (app.user.get("loggedIn")?"Welcome " + friendlyName:"")},
                "menu": (app.user.menu)
              })
            });
            newViews = newViews || {};
            that.layout.setViews( newViews );
            that.layout.render();
          }else {
                console.log("hello1");
            if(Backbone.history.fragment !== "login") app.router.navigate("#login", true);
          }
        }
      });
    }
  });

  // Required, return the module for AMD compliance.
  return Router;

});