<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GeoLocation
 *
 * @author odi
 */
class GeoLocation {

	private $lat;
	private $lng;

	public function __construct($lat, $lng) {
		$this->lat = (double) $lat;
		$this->lng = (double) $lng;
	}

	public function getLatitude() {
		return $this->lat;
	}

	public function getLongitude() {
		return $this->lng;
	}

	/* http://www.zipcodeworld.com/samples/distance.php.html */
	public function distance(GeoLocation $to) {
		$earthRadius = 6372797; // mean radius of Earth in meters
		
		$toLat = deg2rad($to->getLatitude());
		$toLng = deg2rad($to->getLongitude());
		$thisLat = deg2rad($this->lat);
		$thisLng = deg2rad($this->lng);
		
		
		$latDistance = $toLat - $thisLat;
		$lngDistance = $toLng - $thisLng;
		$distance = pow(sin($latDistance / 2),2) + cos($thisLat) * cos($toLat) * pow(sin($lngDistance / 2),2);
		$distance = 2 * atan2(sqrt($distance), sqrt(1 - $distance));
		$meters = $earthRadius * $distance;
		
		return $meters;
	}
}

?>
