// Essentially a copy of https://github.com/tbranyen/boilerplate-handlebars-layoutmanager/blob/master/app/app.js
define([
  // Vendors
  'jquery',
  'loadash',
  'backbone',
  'handlebars',
  'bootstrap',
  // Plugins
  'hbregs',
  'jqueryajax',
  'backbonelayoutmanager',
  'localstorage'
],
function($, _, Backbone, Handlebars){
	// We can set links and routes as !/route https://developers.google.com/webmasters/ajax-crawling/docs/specification
	// I haven't specified the meta to opt into AJAX crawling
	var app = { root: '/backbone_calendar/backbone_calendar' };
	
	// Create a new JavaScript Template object
	var JST = window.JST || {};
	
	// Configure Backbone LayoutManager :D
	Backbone.Layout.configure({
		manage: true,
		
    prefix: "/app/templates/",
    
		fetch: function(path){
			var done;
			path = path + '.html'; // makes things look a little cleaner
			
			// If we do not have the template then fetch it
			if(!JST[path]) {
				done = this.async();
				return $.ajax({ url: app.root + path }).then(function(contents){
					JST[path] = Handlebars.compile(contents);
					JST[path].__complied__ = true;
					
					done(JST[path]);
				});
			}
			
			// Compile the template, if needed
			if(!JST[path].__compiled__) {
				JST[path] = Handlebars.compile(contents);
				JST[path].__complied__ = true;				
			}
			
			return JST[path];
		}
	});
	
	//Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }
      
      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        template: name
      }, options));
      
      // Insert into the DOM.
      $("#main").html(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  }, Backbone.Events);
});