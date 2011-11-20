<?php
require_once(dirname(__FILE__) . '/../lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/domain/GeoLocation.class.php');

class TestGeoLocation extends TraildevilsUnitTestCase {
    function testConstructor() {
		$lat = 8.1234;
		$lng = 47.1988;
        $geo = new GeoLocation($lat,$lng);
        
        $this->assertEqual($geo->getLatitude(),$lat);
		$this->assertEqual($geo->getLongitude(),$lng);
    }
	
	function testDistance() {
		$lat1 = 47.223344;
		$lng1 = 8.886644;
		
		$lat2 = 47.223350;
		$lng2 = 8.886620;
		
		$geo1 = new GeoLocation($lat1,$lng1);
		$geo2 = new GeoLocation($lat2,$lng2);
		
		$this->assertWithinMargin($geo1->distance($geo2), 1.9, 0.1);
		$this->assertEqual($geo2->distance($geo1), $geo1->distance($geo2));
    }
	
	function testDistanceZero() {
		$lat = 8.1234;
		$lng = 47.1988;
		
		$from = new GeoLocation($lat,$lng);
		$to = new GeoLocation($lat,$lng);
		
		$this->assertEqual($from->distance($to), 0);
		$this->assertEqual($to->distance($from), $from->distance($to));
    }
}
?>
