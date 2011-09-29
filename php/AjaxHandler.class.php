<?php
require_once('DataLoader.class.php');

class AjaxHandler
{
	public function handleRequest($functionName,$params=array())
	{
		$dataLoader = new DataLoader();
		
		
	}
}

$handler = new AjaxHandler();
$handler->handleRequest($_REQUEST['function'],implode($_REQUEST['params'],',''));

?>