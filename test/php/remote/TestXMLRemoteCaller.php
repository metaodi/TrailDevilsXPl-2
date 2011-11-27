<?php
require_once(dirname(__FILE__) . '/../../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/remote/XMLRemoteCaller.class.php');

class TestXMLRemoteCaller extends TraildevilsUnitTestCase {
    function testConstructor() {
		$url = "http://example.com";
        $xmlCaller = new XMLRemoteCaller($url);
        
        $this->assertEqual($xmlCaller->getURL(),$url);
    }
	
	function testCallRemoteSite() {
		$url = "file://".dirname(__FILE__)."/../trails.xml";
		$localXml = $this->getTestTrailXml();
		
        $xmlCaller = new XMLRemoteCaller($url);
		$remoteXml = $xmlCaller->callRemoteSite();
		
        $this->assertEqualsIgnoreWhitespace($remoteXml,$localXml);
    }
}

?>
