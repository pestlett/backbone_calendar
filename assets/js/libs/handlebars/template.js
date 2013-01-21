// hbtemplate.js 
// Pretty neat
// http://stackoverflow.com/questions/9887512/precompiled-handlebars-templates-in-backbone-with-requirejs
// @author Boris Van Woerkom
define(['handlebars'], function (Handlebars) {	
	return { load: function (resourceName, parentRequire, callback, config) {		
	    parentRequire([('text!' + resourceName)],	    		
	      function (templateContent) {
	        var template = Handlebars.compile(templateContent);
	        callback(template);
	      }	    
	    );
		} 
	};
});