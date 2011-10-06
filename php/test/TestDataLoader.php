<?php
require_once('../../lib/simpletest/extensions/ReportableUnitTestCase.php');
require_once('../DataLoader.class.php');

class TestDataLoader extends ReportableUnitTestCase {
    function testReturnData() {
        $loader = new DataLoader();
        $input = "Hallo Testwelt";
        $this->assertEqual($loader->returnData($input),$input);
    }
}

$test = new TestDataLoader();
$test->report();
?>
