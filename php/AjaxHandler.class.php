<?php

class AjaxHandler 
{

	public function handleRequest($className, $functionName, $params=array()) 
	{
		if (!file_exists(dirname(__FILE__).'/'.$className . '.class.php'))
		{
			throw new FileDoesNotExistException($className . '.class.php');
		}
		require_once($className . '.class.php');
		$reflectionClass = new ReflectionClass($className);
		$reflectionMethod = new ReflectionMethod($className, $functionName);
		echo $reflectionMethod->invokeArgs($reflectionClass->newInstance(), $params);
	}
}

if (isset($_REQUEST['className']) && isset($_REQUEST['functionName'])) 
{
	$handler = new AjaxHandler();
	//add params if available
	$paramString = array();
	if (isset($_REQUEST['params']))
	{
		$paramString = explode(',', $_REQUEST['params']);
	}
	$handler->handleRequest($_REQUEST['className'], $_REQUEST['functionName'], $paramString);
}
?>