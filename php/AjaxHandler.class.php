<?php
class AjaxHandler
{
	public function handleRequest($className,$functionName,$params=array())
	{
		require_once($className.'.class.php');
		$reflectionClass = new ReflectionClass($className); 
		$reflectionMethod = new ReflectionMethod($className, $functionName);
		return $reflectionMethod->invokeArgs($reflectionClass->newInstance(), $params);
	}
}

$handler = new AjaxHandler();
$handler->handleRequest($_REQUEST['className'],$_REQUEST['functionName'],explode(',',$_REQUEST['params']));

?>