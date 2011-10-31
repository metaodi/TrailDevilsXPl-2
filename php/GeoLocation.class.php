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
		$this->lat = $lat;
		$this->lng = $lng;
	}

	public function getLatitude() {
		return $this->lat;
	}

	public function getLongitude() {
		return $this->lng;
	}
	
	public function distance(GeoLocation $to) {
		$earthRadius = 6371000; // in meter
		
		$deltaLat = deg2rad($to->getLatitude() - $this->lat);
		$deltaLng = deg2rad($to->getLongitude() - $this->lng);
		$thisLat = deg2rad($this->lat);
		$otherLat = deg2rad($to->getLatitude());
		
		$a = sin($deltaLat / 2) * sin($deltaLat / 2) + sin($deltaLng / 2) * sin($deltaLng / 2) * cos($thisLat) * cos($otherLat); 
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		return  $earthRadius * $c;
	}
	
	public function getFormattedDistance($distance) {
		if($distance > 999) {
			// round to one decimal
			return round(($distance / 1000), 1)."km";
		} else {
			return round($distance)."m";
		}
	}
}

?>
