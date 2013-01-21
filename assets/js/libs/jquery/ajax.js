// Setup the default jquery AJAX Stuff
define(['jquery','backbone'], function ($, Backbone) {	
	//Setup our ajax response actions
	$.ajaxSetup({
		statusCode: {
			401: function(XHR, Status, Text){
				// Incorrect credentials forward them to login
				Backbone.history.navigate('#!/login', true);
			},
			403: function(XHR, Status, Text){
				// Access denied
				Backbone.history.navigate('#!/', true);
			},
			404: function(XHR, Status, Text){
				// Does not exist
				Backbone.history.navigate('#!/error/404', true);
			}
		}
	});
});


  