<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');

//include all files to show an overview of all tests. 
//assuming that all files (except this file) in the directory are tests. 
$dir_handle = opendir(dirname(__FILE__));
while (false !== ($file = readdir($dir_handle))) 
{
	if (!is_dir($file) && $file != basename(__FILE__)) 
	{
		include($file);
		$className = basename($file,".php");
		$refClass = new ReflectionClass($className);
		$tdUnitTestCase = $refClass->newInstance();
		
		$tdUnitTestCase->report();
	}
}

?>
