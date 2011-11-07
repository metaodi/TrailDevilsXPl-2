<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/DataLoader.class.php');

class TestDataLoader extends TraildevilsUnitTestCase 
{
	function checkJsonFormat($json) {
		$keys = array("title","location","distance","thumb","description","status","latitude","longitude");
		foreach ($keys as $key)
		{
			$this->assertTrue(array_key_exists($key, $json),"Key \"$key\" must exist in converted JSON array.");
		}
	}
	
	function testConvertJsonKeys()
	{
		 $loader = new DataLoader();
		 $convertedJson = json_decode($loader->convertTrailsJson($this->getTestTrailJson(),$this->getTestGeoLocation(), 1), true);
		 $this->checkJsonFormat($convertedJson["trails"][0]);
	}
	
	function testConvertJsonValues()
	{
		 $loader = new DataLoader();
		 $location = $this->getTestGeoLocation();
		 $convertedJson = json_decode($loader->convertTrailsJson($this->getTestTrailJson(),$location, 1), true);
		 $this->assertEqual(count($convertedJson["trails"]), 2, "Array should contain exactly 2 trails: %s");
		 
		 $values = $convertedJson["trails"][0];
		 $this->assertEqual($values["title"], "Testtrail");
		 $this->assertEqual($values["location"], "Zürich, Switzerland");
		 $this->assertEqual($values["distance"], 0.0);
		 $this->assertEqual($values["thumb"], "http://www.traildevils.ch/media/img/trails/trailimg_120_34.jpg");
		 $this->assertEqual($values["description"], "Test-Description");
		 $this->assertEqual($values["status"], "geschlossen");
		 $this->assertEqual($values["latitude"], $location->getLatitude());
		 $this->assertEqual($values["longitude"], $location->getLongitude());
	}
	
	function testGetTrailsNear() {
        $loader = new DataLoader();
        $url = "file://".dirname(__FILE__)."/../trails.json";
		$location = $this->getTestGeoLocation();
		
		$localJson = $loader->convertTrailsJson($this->getTestTrailJson(), $location, 1);
		$localJsonArray = json_decode($localJson, true);
		$this->checkJsonFormat($localJsonArray["trails"][0]);
		
		$result = $loader->getTrailsNear($location->getLatitude(),$location->getLongitude(), 1, $url);
		
        $this->assertEqualsIgnoreWhitespace($result,$localJson);
    }
}
?>
