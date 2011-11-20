<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('lib/simpletest/extensions/TestRunner.class.php');

//run one specific Testfile or all available tests in this directory
if (isset($argv[1]) || isset($_GET['file']))
{
	$filename = isset($argv[1]) ? $argv[1] : $_GET['file'];
	if(file_exists($filename))
	{
		TestRunner::runTestFile($filename);
	} else {
		die("Requested file '".$filename."' does not exist!");
	}
	
} else {
	//include all files to show an overview of all tests
	$basedir = dirname(__FILE__);
	TestRunner::runTestDirectory($basedir);
	TestRunner::runTestDirectory($basedir."/domain");
	TestRunner::runTestDirectory($basedir."/remote");
}

?>
