<?php
// set the default timezone to use
date_default_timezone_set('Europe/Berlin');

require_once('../../lib/simpletest/unit_tester.php');
require_once('../../lib/simpletest/extensions/JUnitXMLReporter.php');

$test = new TestSuite('All tests');
$test->addFile('TestAjaxHandler.php');

$reporter = new JUnitXMLReporter();
$test->run($reporter);
?>
