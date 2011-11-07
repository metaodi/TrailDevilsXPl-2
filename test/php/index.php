<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('lib/simpletest/extensions/TestRunner.class.php');

//run one specific Testfile or all available tests in this directory
if (!isset($argv[1]))
{
	//include all files to show an overview of all tests. 
	//assuming that all files (except this file) in the directory are tests.
	$dir_handle = opendir(dirname(__FILE__));
	while (false !== ($file = readdir($dir_handle))) 
	{
		if (!is_dir($file) && $file != basename(__FILE__) && preg_match("/\.php$/",$file)) 
		{
			TestRunner::runTestFile($file);
		}
	}
} else {
	$filename = $argv[1];
	if(file_exists($filename))
	{
		TestRunner::runTestFile($filename);
	} else {
		die("Requested file '".$filename."' does not exist!");
	}
}

?>
