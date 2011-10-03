<?php
require_once('../../lib/simpletest/autorun.php');
require_once('../../lib/simpletest/extensions/JUnitReporter.php');

$test = new TestSuite('All tests');
$test->addFile('TestAjaxHandler.php');
$test->run(new JUnitReporter());
//$test->run(new TextReporter());
?>
