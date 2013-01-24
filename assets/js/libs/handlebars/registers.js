define(['handlebars'], function (Handlebars) {
	Handlebars.registerHelper("debug", function(optionalValue){
		console.log("Current Context");
		console.log("====================");
		console.log(this);
		if(optionalValue){
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});
	// Helper for Error pages
	Handlebars.registerHelper("displayError", function(error){;
		var ret = "<article>";		
		ret += "<h1>"+error.header+"</h1>";
		ret += "<p>"+error.message+"</p>";
		ret += "<p>Please click <a href=\"\">here</a> to return to the home page</p>"; // Perhaps consider having this take you back to the last known page or home page if that is empty
		return new Handlebars.SafeString( ret + "</article>" );
	});
});