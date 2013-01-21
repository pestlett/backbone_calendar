<?php

require 'Slim/Slim.php';

// Initiate sessions
@session_start();

// Where we currently are
define('SLIMROOT', __DIR__."/");

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


// Model Routes
//--------------------------

// Collection Routes
//--------------------------

// Miscellaneous Routes
//--------------------------

$app->post('/login/attempt', function(){
	$username = $_POST["username"];
	$password = $_POST["password"];

	$ajaxReturn = array();
	if($username === 'admin' && $password === 'admin') {
		$ajaxReturn["result"] = true;
		$ajaxReturn["message"] = "$username/$password";
	} else {
		$ajaxReturn["result"] = false;
		$ajaxReturn["message"] = "$username/$password";
	}
	echo json_encode($ajaxReturn);
});

$app->run();
