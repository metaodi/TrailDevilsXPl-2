<?php
if (count(get_included_files()) == 1)
{
	require_once('../../lib/simpletest/autorun.php');
}
require_once('../AjaxHandler.class.php');

class TestHandleRequest extends UnitTestCase {
    function testHandleValidRequest() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
        $result = $handler->handleRequest("DataLoader", "returnData",$input);
        
        $this->assertEqual($result,$input[0]);
    }
}

?>
