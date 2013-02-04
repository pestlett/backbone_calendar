<?php


class Core
{
	/**
	*	Print out an array in a nice way :)
	*/
	public static function nice_print($array)
	{		
		if(gettype($array) !== "array") echo $array;
		echo "<pre>".print_r($array, 1)."</pre>";
	}
}