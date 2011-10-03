<?php

class AjaxHandler 
{

	public function handleRequest($className, $functionName, $params=array()) 
	{
		require_once($className . '.class.php');
		$reflectionClass = new ReflectionClass($className);
		$reflectionMethod = new ReflectionMethod($className, $functionName);
		return $reflectionMethod->invokeArgs($reflectionClass->newInstance(), $params);
	}
}

if (isset($_REQUEST['className']) && isset($_REQUEST['functionName'])) 
{
	$handler = new AjaxHandler();
	$handler->handleRequest($_REQUEST['className'], $_REQUEST['functionName'], explode(',', $_REQUEST['params']));
}
?>