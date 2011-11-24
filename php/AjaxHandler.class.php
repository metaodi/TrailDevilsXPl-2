<?php
require_once(dirname(__FILE__) . '/exceptions/FileDoesNotExistException.class.php');

class AjaxHandler 
{
	const package = "domain";
	public function handleRequest($className, $functionName, $params=array()) 
	{
		$classFileName = $className.'.class.php';
		$classFilePath = dirname(__FILE__).'/'.self::package.'/'.$classFileName;
		if (!file_exists($classFilePath))
		{
			throw new FileDoesNotExistException($classFileName);
		}
		require_once($classFilePath);
		$reflectionClass = new ReflectionClass($className);
		$reflectionMethod = new ReflectionMethod($className, $functionName);
		echo $reflectionMethod->invokeArgs($reflectionClass->newInstance(), $params);
	}
}

if (isset($_REQUEST['className']) && isset($_REQUEST['functionName'])) 
{
	$handler = new AjaxHandler();
	//add params if available
	$paramArray = array();
	
	if (isset($_REQUEST['params'])) {
		$paramArray = explode(',', $_REQUEST['params']);
	}
	
	if(isset($_GET['page'])) {
		$paramArray[] = $_GET['page'];
	}
	
	$handler->handleRequest($_REQUEST['className'], $_REQUEST['functionName'], $paramArray);
}
?>