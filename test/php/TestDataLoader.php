<?php
require_once('lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once('../../php/DataLoader.class.php');

class TestDataLoader extends TraildevilsUnitTestCase 
{
	function testConvertJsonKeys()
	{
		 $loader = new DataLoader();
		 $keys = array("title","location","distance","thumb","description","status","latitude","longitude");
		 $convertedJson = json_decode($loader->convertJson($this->getTestTrailJson(),$this->getTestGeoLocation()), true);
		 
		 foreach ($keys as $key)
		 {
			 $this->assertTrue(array_key_exists($key, $convertedJson["trails"][0]),"Key \"$key\" must exist in converted JSON array.");
		 }
	}
	
	function testConvertJsonValues()
	{
		 $loader = new DataLoader();
		 $location = $this->getTestGeoLocation();
		 $convertedJson = json_decode($loader->convertJson($this->getTestTrailJson(),$location), true);
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
        $url = "http://jenkins.rdmr.ch/test/trails.json";
		$location = $this->getTestGeoLocation();
		
		$localJson = $loader->convertJson($this->getTestTrailJson(), $location);
		$result = $loader->getTrailsNear($location->getLatitude(),$location->getLongitude(),$url);
		
        $this->assertEqualsIgnoreWhitespace($result,$localJson);
    }
}
?>
