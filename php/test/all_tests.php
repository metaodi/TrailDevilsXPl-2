<?php
// set the default timezone to use
date_default_timezone_set('Europe/Berlin');

require_once('../../lib/simpletest/autorun.php');
require_once('../../lib/simpletest/extensions/JUnitXMLReporter.php');

$test = new TestSuite('All tests');
$test->addFile('TestAjaxHandler.php');
$test->run(new JUnitXMLReporter());
//$test->run(new TextReporter());
?>
