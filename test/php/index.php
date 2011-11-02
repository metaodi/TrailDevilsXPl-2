<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('lib/simpletest/extensions/TestRunner.class.php');

//run one specific Testfile or all available tests in this directory
if (!isset($_GET['file']))
{
	//include all files to show an overview of all tests. 
	//assuming that all files (except this file) in the directory are tests.
	$dir_handle = opendir(dirname(__FILE__));
	while (false !== ($file = readdir($dir_handle))) 
	{
		if (!is_dir($file) && $file != basename(__FILE__)) 
		{
			TestRunner::runTestFile($file);
		}
	}
} else {
	$filename = $_GET['file'];
	if(file_exists($filename))
	{
		TestRunner::runTestFile($filename);
	} else {
		die("Requested file '".$filename."' does not exist!");
	}
}

?>
