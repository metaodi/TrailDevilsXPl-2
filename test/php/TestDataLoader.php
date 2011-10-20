<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/DataLoader.class.php');

class TestDataLoader extends TraildevilsUnitTestCase 
{
	function testConvertJsonKeys()
	{
		 $loader = new DataLoader();
		 $keys = array(	"title","location","distance","thumb","description","status","latitude","longitude");
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
		 $this->assertEqual(count($convertedJson["trails"]), 2, "Array should contain exactly 2 trails: %s");
		 
		 $values = $convertedJson["trails"][0];
		 $this->assertEqual($values["title"], "Testtrail");
		 $this->assertEqual($values["location"], "Zürich, Switzerland");
		 $this->assertEqual($values["distance"], "100");
		 $this->assertEqual($values["thumb"], "http://www.traildevils.ch/media/img/trails/trailimg_120_34.jpg");
		 $this->assertEqual($values["description"], "Test-Description");
		 $this->assertEqual($values["status"], "geschlossen");
		 $this->assertEqual($values["latitude"], "47.224931");
		 $this->assertEqual($values["longitude"], "8.746147");
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
