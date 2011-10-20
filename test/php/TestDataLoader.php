<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/DataLoader.class.php');

class TestDataLoader extends TraildevilsUnitTestCase 
{
	function testConvertJsonKeys()
	{
		 $loader = new DataLoader();
		 $keys = array(	"title","location","distance","thumb","description","status");
		 $convertedJson = json_decode($loader->convertJson($this->getTestTrailJson()), true);
		 
		 foreach ($keys as $key)
		 {
			 $this->assertTrue(array_key_exists($key, $convertedJson["trails"][0]),"Key \"$key\" must exist in converted JSON array.");
		 }
	}
	
	function testConvertJsonValues()
	{
		 $loader = new DataLoader();
		 $convertedJson = json_decode($loader->convertJson($this->getTestTrailJson()), true);
		 $values = $convertedJson["trails"][0];
		 
		 $this->assertEqual($values["title"], "Testtrail");
		 $this->assertEqual($values["location"], "Zürich, Switzerland");
		 $this->assertEqual($values["distance"], "100");
		 $this->assertEqual($values["thumb"], "http://www.traildevils.ch/media/img/trails/trailimg_120_34.jpg");
		 $this->assertEqual($values["description"], "Test-Description");
		 $this->assertEqual($values["status"], "geschlossen");
	}
	
	function testGetTrails() {
        $loader = new DataLoader();
        $url = "http://jenkins.rdmr.ch/test/trails.json";
		$localJson = $loader->convertJson($this->getTestTrailJson());
		$result = $loader->getTrails($url);
		
        $this->assertEqualsIgnoreWhitespace($result,$localJson);
    }
}

$test = new TestDataLoader();
$test->report();
?>
