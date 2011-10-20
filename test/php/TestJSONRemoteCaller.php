<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/JSONRemoteCaller.class.php');

class TestJSONRemoteCaller extends TraildevilsUnitTestCase {
    function testConstructor() {
		$url = "http://example.com";
        $jsonCaller = new JSONRemoteCaller($url);
        
        $this->assertEqual($jsonCaller->getURL(),$url);
    }
	function testCallRemoteSite() {
		$url = "http://jenkins.rdmr.ch/test/trails.json";
		$localJson = $this->getTestTrailJson();
		
        $jsonCaller = new JSONRemoteCaller($url);
		$remoteJson = $jsonCaller->callRemoteSite();
		
        $this->assertEqualsIgnoreWhitespace($remoteJson,$localJson);
    }
}

$test = new TestJSONRemoteCaller();
$test->report();

?>
