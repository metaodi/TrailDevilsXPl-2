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
	
	/* source: http://www.movable-type.co.uk/scripts/latlong.html */
	public function distance(GeoLocation $to) {
		$earthRadius = 6371000; // in meter
		
		$fromLat = deg2rad($this->lat);
		$fromLng = deg2rad($this->lng);
		$toLat = deg2rad($to->getLatitude());
		$toLng = deg2rad($to->getLongitude());
		$deltaLat = $toLat - $fromLat;
		$deltaLng = $toLng - $fromLng;
		
		$a = sin($deltaLat / 2) * sin($deltaLat / 2) + sin($deltaLng / 2) * sin($deltaLng / 2) * cos($fromLat) * cos($toLat); 
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		return $c * $earthRadius;
	}
}

?>
