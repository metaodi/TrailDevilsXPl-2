<?php
require_once('TraildevilsUnitTestCase.php');

class TestRunner
{
	public static function runTestFile($file)
	{
		include($file);
		$className = basename($file,".php");
		$refClass = new ReflectionClass($className);
		$tdUnitTestCase = $refClass->newInstance();
		$tdUnitTestCase->report();
	}
}
?>
