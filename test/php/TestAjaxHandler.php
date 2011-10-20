<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/AjaxHandler.class.php');
require_once('../../php/exceptions/FileDoesNotExistException.class.php');

class TestHandleRequest extends TraildevilsUnitTestCase {
    function testHandleValidRequest() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
		
		ob_start();
		$handler->handleRequest("DataLoader", "echoData",$input);
		$result = ob_get_contents();
        ob_end_clean();
        $this->assertEqual($result,$input[0]);
    }
	
	function testHandleInvalidClass() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
		try {
			$handler->handleRequest("DataLoader2", "echoData",$input);
			$this->fail("File does not exists, should not reach this line");
		} catch (FileDoesNotExistException $e) {
			$this->pass();
		}
    }
	
	function testHandleInvalidMethod() {
        $handler = new AjaxHandler();
        $input = array("Testdata");

		try {
			$handler->handleRequest("DataLoader", "echoData2",$input);
			$this->fail("Method does not exists, should not reach this line");
		} catch (ReflectionException $e) {
			$this->pass();
		}
    }
}

$test = new TestHandleRequest();
$test->report();

?>
