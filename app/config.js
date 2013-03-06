// Configure require.js &c.
require({
	// Kick start the app with this
	deps: ['main'],

	// Load all our content
	// If you want to check a CDN first ammend as needed
	// ['//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js', '../assets/js/vendor/jquery/jquery-min']
	paths: {
		// Vendors
		jquery: '../assets/js/vendor/jquery/jquery-min',
		loadash: '../assets/js/vendor/loadash/loadash.underscore.min', // Use the underscore compatable version for LayoutManager
		backbone: '../assets/js/vendor/backbone/backbone',
		handlebars: '../assets/js/vendor/handlebars/handlebars',

		// Plugins
		backbonelayoutmanager: '../assets/js/plugins/backbone.layoutmanager/backbone.layoutmanager',
		backboneforms: '../assets/js/plugins/backbone-forms/backbone-forms.min',
		localstorage: '../assets/js/plugins/backbone/backbone.localStorage-min',
		text: '../assets/js/vendor/require/text',

		// Libs
		hb: '../assets/js/libs/handlebars/template',
		hbregs: '../assets/js/libs/handlebars/registers',
		jqueryajax: '../assets/js/libs/jquery/ajax',

		// Twitter Bootstrap Stuff :)
		bootstrap: '../assets/js/vendor/twitter.bootstrap/bootstrap',

		// Useful definitions
		errtpl: 'templates/errors',
		laytpl: 'templates/layouts',
		vwtpl: 'templates/views',

		app: 'app'
	},

	// Map any references to underscore in our vendor libs to loadash
	map: {
		'*': { 'underscore' : 'loadash' }
	},

	// Ensure that dependencies are maintained and nothing loads before its due turn
	shim: {
		app: { exports: 'app' },
		jquery: { exports: '$' },
		loadash: { exports: '_' },
		handlebars: { exports: 'Handlebars' },
		backbone: { deps: ['jquery','loadash'], exports: 'Backbone' },
		backbonelayoutmanager: { deps: ['backbone'], exports: 'Backbone.Layout' },
		localstorage: ['backbone'],
		backboneforms: { deps: ['backbone'], exports: 'Backbone.Form' },
		bootstrap: ['jquery'],
		hbregs: ['handlebars'],
		jqueryajax: ['jquery']
	}
});