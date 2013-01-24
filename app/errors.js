define([],function(){
	// All status codes, headers and messages are taken from https://tools.ietf.org/html/rfc2616
	// Probably best humanising the message as that is the whole point of this file
	var errors = {	
		// 4xx Client Errors
		"400": { "header": "Bad Request", "message": "The request could not be understood by the server due to malformed syntax."},
		"401": { "header": "Unauthorized", "message": "The request requires user authentication."},
		"402": { "header": "Payment Required", "message": "This code is reserved for future use."},
		"403": { "header": "Forbidden", "message": "The server understood the request, but is refusing to fulfill it."},
		"404": { "header": "Not Found", "message": "The server has not found anything matching the Request-URI."},
		"405": { "header": "Method Not Allowed", "message": "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI."},
		"406": { "header": "Not Acceptable", "message": "The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request."},
		"407": { "header": "Proxy Authentication Required", "message": "his code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy."},
		"408": { "header": "Request Timeout", "message": " The client did not produce a request within the time that the server was prepared to wait."},
		"418": { "header": "Enhance Your Calm", "message": "You're making far too many requests too our servers, please, enhance your calm."},
		"420": { "header": "I'm a teapot", "message": "Please, I beg you, do not <i>brew</i> coffee with a teapot"}
	};
	return errors;
});