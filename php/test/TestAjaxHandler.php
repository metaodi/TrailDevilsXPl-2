<?php
require_once(dirname(__FILE__).'../../lib/simpletest/autorun.php');
require_once(dirname(__FILE__).'../AjaxHandler.class.php');

class TestHandleRequest extends UnitTestCase {
    function testHandleValidRequest() {
        $handler = new AjaxHandler();
        $input = array("Testdata");
        $result = $handler->handleRequest("DataLoader", "returnData",$input);
        
        $this->assertEqual($result,$input[0]);
    }
}

?>
