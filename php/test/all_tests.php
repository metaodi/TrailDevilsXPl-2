<?php
// set the default timezone to use
date_default_timezone_set('Europe/Berlin');

require_once('../../lib/simpletest/unit_tester.php');
require_once('../../lib/simpletest/extensions/JUnitXMLReporter.php');

$test = new TestSuite('All tests');
$test->addFile('TestAjaxHandler.php');

$test->run(new JUnitXMLReporter());
$singleTests = array();

//add files and inlcude them
$dir_handle = opendir(dirname(__FILE__));
while (false !== ($file = readdir($dir_handle))) 
{
	if (!is_dir($file) && $file != basename(__FILE__)) 
	{
		$singleTestSuite = new TestSuite($file);
		$singleTestSuite->addFile($file);
		array_push($singleTests,$singleTestSuite);
		
		$test->addFile($file);
	}
}

if (TextReporter::inCli()) 
{
    exit ($test->run(new JUnitXMLReporter()) ? 0 : 1);
} else 
{
	$test->run(new HtmlReporter());
	
	echo "<h2>Detailed results:</h2>";
	foreach($singleTests as $singleTest)
	{
		$singleTest->run(new HtmlReporter());
	}
}

?>
