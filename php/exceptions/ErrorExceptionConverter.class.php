<?php

/**
 * Description of ErrorToException
 *
 * @author odi
 */
class ErrorExceptionConverter {
	public static function startErrorConversion()
	{
		set_error_handler("ErrorExceptionConverter::exception_error_handler");
	}
	
	public static function endErrorConversion() 
	{
		restore_error_handler();
	}
	
	public static function exception_error_handler($errno, $errstr, $errfile, $errline) {
		throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
	}
}

?>
