<?php
require_once(dirname(__FILE__) . '/../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../php/AjaxHandler.class.php');
require_once(dirname(__FILE__) . '/../../php/exceptions/FileDoesNotExistException.class.php');

class TestAjaxHandler extends TraildevilsUnitTestCase {
    function testHandleValidRequest() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
		
		ob_start();
		$handler->handleRequest("DataEcho", "echoData",$input);
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
?>
