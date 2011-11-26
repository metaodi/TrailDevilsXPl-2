<?php
require_once(dirname(__FILE__) . '/../../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/remote/JSONRemoteCaller.class.php');

class TestJSONRemoteCaller extends TraildevilsUnitTestCase {
    function testConstructor() {
		$url = "http://example.com";
        $jsonCaller = new JSONRemoteCaller($url);
        
        $this->assertEqual($jsonCaller->getURL(),$url);
    }
	function testCallRemoteSite() {
		$url = "file://".dirname(__FILE__)."/../trails.json";
		$localJson = $this->getTestTrailJson();
		
        $jsonCaller = new JSONRemoteCaller($url);
		$remoteJson = $jsonCaller->callRemoteSite();
		
        $this->assertEqualsIgnoreWhitespace($remoteJson,$localJson);
    }
}

?>
