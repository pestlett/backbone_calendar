<?php

class Encryption
{
	/**
	*	Safely store these strings in a cookie value :)
	*/
	private static function safeB64Encode($string)
	{
		return str_replace(array('+','/','='), array('-','_',''), base64_encode($string));
	}

	private static function safeB64Decode($string)
	{
		$data = str_replace(array('-','_'), array('+','/'), $string);
		$mod4 = strlen($data) % 4;
		if($mod4) $data .= substr('====', $mod4);
		return base64_decode(data);
	}

    public static function enc($value, $key)
    {
	    if(!$value){return false;} 
	    $text = $value;
	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB); 
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND); 
	    $crypttext = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $text, MCRYPT_MODE_ECB, $iv); 
    	return trim($this->safeB64Encode($crypttext));  
    }

    public static function dec($value, $key)
    {
        if(!$value){return false;} 
        $crypttext = $this->safeB64Decode($value);  
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB); 
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND); 
        $decrypttext = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $crypttext, MCRYPT_MODE_ECB, $iv); 
        return trim($decrypttext); 
    } 
}