<?php
require_once('DataLoader.class.php');

class AjaxHandler
{
	public function handleRequest($functionName,$params=array())
	{
		$dataLoader = new DataLoader();
		$reflectionMethod = new ReflectionMethod('DataLoader', $functionName);
		return $reflectionMethod->invoke($dataLoader, $params[0]);
	}
}

$handler = new AjaxHandler();
$handler->handleRequest($_REQUEST['functionName'],implode($_REQUEST['params'],',''));

?>