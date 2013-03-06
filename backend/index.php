<?php

require 'Slim/Slim.php';

// Initiate sessions
@session_start();

define('APPPATH', 'application');
define('APPNAME', 'clickcal');

// Where we currently are
define('SLIMROOT', __DIR__."/");

// Also load a file with some nice functions
require_once(SLIMROOT.APPPATH."/base_classes/core.php");
require_once(SLIMROOT.APPPATH."/base_classes/encryption.php");

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

define("REFERRER", $app->request()->getReferrer());

// Model Routes
//--------------------------

// Collection Routes
//--------------------------

// Miscellaneous Routes
//--------------------------

// localhost:80/backbone_calendar/backbone_calendar/backend/login/check
$app->get('/login/check', function(){

	$ajaxReturn = array(
		"id" => 0,
		"loggedIn" => false,
		"username" => "",
		"friendlyName" => "",
		"email" => "",
		"friendlyName" => "",
		"apiKey" => ""
	);
	if(isset($_SESSION[APPNAME]["userData"])) {
		// Do clickAuth check that we're logged in
		if((bool)$_SESSION[APPNAME]["userData"]["loggedIn"]){
			$ajaxReturn = array(
				"id" => 1,
				"loggedIn" => true,
				"username" => "admin",
				"friendlyName" => "Administrator",
				"email" => "admin@clickcal.com",
				"friendlyName" => "Administrator",
				"apiKey" => uniqid("", true)
			);
		}
		// Return other stuff such as whether user has permission for the current page and the navigation structure for the user
	}
	echo json_encode($ajaxReturn);
});

$app->post('/login/attempt', function(){
	$username = $_POST["username"];
	$password = $_POST["password"];

	$ajaxReturn = array(
		"id" => 1,
		"loggedIn" => false,
		"username" => $username,
		"friendlyName" => "Administrator",
		"email" => "admin@clickcal.com",
		"friendlyName" => "Administrator",
		"apiKey" => uniqid("", true)
	);

	if($username === 'admin' && $password === 'admin') {
		$ajaxReturn = array(
			"id" => 1,
			"loggedIn" => true,
			"username" => $username,
			"friendlyName" => "Administrator",
			"email" => "admin@clickcal.com",
			"friendlyName" => "Administrator",
			"apiKey" => uniqid("", true)
		);
		$_SESSION[APPNAME] = array( "userData" => $ajaxReturn );
	}
	echo json_encode($ajaxReturn);
});

$app->put('/login/check', function(){
	$request = \Slim\Slim::getInstance()->request();
	$ajaxReturn = json_decode($request->getBody());
	$_SESSION[APPNAME] = array( "userData" => (array)$ajaxReturn );

	echo json_encode($ajaxReturn);	
});

$app->get('/user/menu', function(){
	$ajaxReturn = array();
	$ref = str_replace("http://127.0.0.1/backbone_calendar/backbone_calendar/", "", REFERRER);

	if(isset($_SESSION[APPNAME]["userData"])){
		if((bool)$_SESSION[APPNAME]["userData"]["loggedIn"]){
			$ajaxReturn = array(
				"home" => array(
					"url" => "#",
					"displayName" => "Home",
					"active" => ($ref === "")
				),
				"about" => array(
					"url" => "#about",
					"displayName" => "About",
					"active" => ($ref === "about")
				),
				"contact" => array(
					"url" => "#contact",
					"displayName" => "Contact",
					"active" => ($ref === "contact")
				),
				"error404" => array(
					"url" => "#error/404",
					"displayName" => "Error 404",
					"active" => ($ref === "error/404")
				),
				"error418" => array(
					"url" => "#error/418",
					"displayName" => "Error 418",
					"active" => ($ref === "error/418")
				),
				"error420" => array(
					"url" => "#error/420",
					"displayName" => "Error 420",
					"active" => ($ref === "error/420")
				)		
			);
		}
	}
	echo json_encode($ajaxReturn);
});

$app->run();
