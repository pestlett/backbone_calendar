<?php

// Probably have no need for this... so not implementing it, normal exceptions SHOULD do, but we'll see
class SlimException extends Exception
{
	public function __construct($message = null, $code = 0, Exception $previous = null)
	{

	}
}