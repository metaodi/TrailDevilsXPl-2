<?php
require_once('lib/simpletest/extensions/ReportableUnitTestCase.php');
require_once('../../php/DataLoader.class.php');

class TestDataLoader extends ReportableUnitTestCase {
    function testEchoData() {
        $loader = new DataLoader();
        $input = "Hallo Testwelt";
		
		ob_start();
		$loader->echoData($input);
		$result = ob_get_contents();
		ob_end_clean();
        $this->assertEqual($result,$input);
    }
}

$test = new TestDataLoader();
$test->report();
?>
