<?php

require 'Slim/Slim.php';

// Initiate sessions
@session_start();

define('APPNAME', 'clickcal');

// Where we currently are
define('\Slim\SlimROOT', __DIR__."/");

// Also load a file with some nice functions
function nice_print($array)
{
	if(gettype($array) !== "array") echo $array;
	echo "<pre>".print_r($array, 1)."</pre>";
}

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


// Model Routes
//--------------------------

// Collection Routes
//--------------------------

// Miscellaneous Routes
//--------------------------

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

$app->run();
