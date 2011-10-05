<?php
if (count(get_included_files()) == 1)
{
	require_once('../../lib/simpletest/autorun.php');
}
require_once('../AjaxHandler.class.php');
require_once('../exceptions/FileDoesNotExistException.class.php');

class TestHandleRequest extends UnitTestCase {
    function testHandleValidRequest() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
        $result = $handler->handleRequest("DataLoader", "returnData",$input);
        
        $this->assertEqual($result,$input[0]);
    }
	function testHandleInvalidClass() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
		try {
			$result = $handler->handleRequest("DataLoader2", "returnData",$input);
			$this->fail("File does not exists, should not reach this line");
		} catch (FileDoesNotExistException $e) {
			$this->pass();
		}
    }
	function testHandleInvalidMethod() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
        
		try {
			$result = $handler->handleRequest("DataLoader", "returnData2",$input);
			$this->fail("Method does not exists, should not reach this line");
		} catch (ReflectionException $e) {
			$this->pass();
		}
    }
}

?>
