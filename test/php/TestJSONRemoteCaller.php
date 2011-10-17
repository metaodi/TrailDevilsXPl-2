<?php
require_once('lib/simpletest/extensions/ReportableUnitTestCase.php');
require_once('../../php/JSONRemoteCaller.class.php');

class TestJSONRemoteCaller extends ReportableUnitTestCase {
    function testConstructor() {
		$url = "http://example.com";
        $jsonCaller = new JSONRemoteCaller($url);
        
        $this->assertEqual($jsonCaller->getURL(),$url);
    }
	function testCallRemoteSite() {
		$url = "http://jenkins.rdmr.ch/test/trails.json";
		$trail = array(	"title" => "Test-Trail",
						"location" =>"Testland",
						"distance" => 2000,
						"imagepath" => "http://traildevils.ch/media/img/trails/trailimg_120_1233.jpg",
						"description" =>  "Trail-Beschreibung",
						"status" =>  "offen");
		$jsonString = "{\"trails\":[ ".json_encode($trail)."]}";
		
        $jsonCaller = new JSONRemoteCaller($url);
        $this->assertEqual($jsonCaller->callRemoteSite(),$jsonString);
    }
}

$test = new TestJSONRemoteCaller();
$test->report();

?>
