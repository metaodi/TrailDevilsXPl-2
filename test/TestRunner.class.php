<?php
require_once('TraildevilsUnitTestCase.php');

class TestRunner
{
	public static function runTestFile($file)
	{
		require_once($file);
		$className = basename($file,".php");
		$refClass = new ReflectionClass($className);
		$tdUnitTestCase = $refClass->newInstance();
		$tdUnitTestCase->report();
	}
	
	public static function runTestDirectory($dir,$suite) {
		$dir_handle = opendir($dir);
		while (false !== ($file = readdir($dir_handle))) 
		{
			if (!is_dir($file) && $file != basename(__FILE__) && preg_match("/^Test.*\.php$/",$file)) 
			{
				$filepath = $dir."/".$file;
				$suite->addFile($filepath);
				self::runTestFile($filepath);
			}
		}
	}
}
?>
