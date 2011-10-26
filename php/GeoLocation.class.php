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
		$toLat = $to->getLatitude();
		$toLng = $to->getLongitude();
		
		$theta = $this->lng - $toLng;
		$dist = sin(deg2rad($this->lat)) * sin(deg2rad($toLat)) + cos(deg2rad($this->lat)) * cos(deg2rad($toLat)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		
		$meters = $dist * 60 * 1853.159616;
		return $meters;
	}

}

?>
