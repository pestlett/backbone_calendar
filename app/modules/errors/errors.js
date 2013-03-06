define([
  // Application.
  "app"
],

function(app) {

  var Error = app.module();

  Error.Views.Error = Backbone.View.extend({
    initialize: function(error){
      this.error = error.error;
    },
    template: 'errors/error',
    serialize: function(){
      if( typeof app.errors[this.error] === "object" )
        return { error: { header: app.errors[this.error].header, message: app.errors[this.error].message } };
      else
      return { error: { header: 'Unknown Error '+this.error, message: 'We cannot advise on what to do as this is not an error we understand' } };
    }
  });

  // Required, return the module for AMD compliance.
  return Error;

});
