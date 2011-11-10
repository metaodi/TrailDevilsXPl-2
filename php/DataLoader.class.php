<?php
require_once 'JSONRemoteCaller.class.php';
require_once 'GeoLocation.class.php';
class DataLoader
{
	public function echoData($data)
	{
		echo $data;
	}
	
	public function distanceCmp($a, $b) {
		if($a['distance'] == $b['distance']) {
			return 0;
		}
		return ($a['distance'] < $b['distance']) ? -1 : 1;
	}
	
	/**
	 * Get trails near the users current position
	 * 
	 * @param $url JSON returning API
	 * @param $userLat Latitude of user's current position
	 * @param $userLng Longitude of user's current position
	 * @return JSON result
	 * 
	 * @TODO delete default params for latitude/longitude
	 */
	public function getTrailsNear($userLat=47.5101756, $userLng=8.7221472, $page=1, $url="http://152.96.80.18:8080/api/trails") { /*http://jenkins.rdmr.ch/php/mock_api.json*/
		$remote = new JSONRemoteCaller($url);
		$userGeo = new GeoLocation($userLat, $userLng);
		return $this->convertTrailsJson($remote->callRemoteSite(), $userGeo, $page);
	}
	
	public function convertTrailsJson($externalTrailJson, GeoLocation $userGeo, $page) {
		$pageSize = 5;
		$externalTrailArray = json_decode($externalTrailJson, true);
		$convertedArray = array();
		
		// calculate distance for each trail
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$externalTrailArray[$i]['distance'] = $userGeo->distance(new GeoLocation($externalTrailArray[$i]["GmapX"], $externalTrailArray[$i]["GmapY"]));
		}
		
		// sort array by distance
		usort($externalTrailArray, array($this, "distanceCmp"));
		
		// only take the nearest 10 trails
		$externalTrailArray = array_slice($externalTrailArray, (($page-1) * $pageSize), $pageSize);
		
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$convertedArray[$i]["id"] = $externalTrailArray[$i]["Id"];
			$convertedArray[$i]["title"] = $externalTrailArray[$i]["Name"]." Page: ".$page;
			$convertedArray[$i]["location"] = ($externalTrailArray[$i]["NextCity"] ? $externalTrailArray[$i]["NextCity"].", " : "") . $externalTrailArray[$i]["Country"];
			$convertedArray[$i]["distance"] = $externalTrailArray[$i]['distance'];
			$convertedArray[$i]["formattedDistance"] = $userGeo->getFormattedDistance($convertedArray[$i]["distance"]);
			$convertedArray[$i]["thumb"] = $externalTrailArray[$i]["ImageUrl120"];
			$convertedArray[$i]["description"] = nl2br($externalTrailArray[$i]["Desc"]);
			$convertedArray[$i]["status"] = $externalTrailArray[$i]["IsOpen"] ? "offen" : "geschlossen";
			$convertedArray[$i]["latitude"] = $externalTrailArray[$i]["GmapX"];
			$convertedArray[$i]["longitude"] = $externalTrailArray[$i]["GmapY"];
			
			$types = array();
			$types[0]['id'] = 5;
			$types[0]['name'] = "t1";
			$types[0]['description'] = "t1 desc";
			$types[1]['id'] = 10;
			$types[1]['name'] = "t2";
			$types[1]['description'] = "t2 desc";
			//$convertedArray[$i]["types"] = $this->getTrailTypes($convertedArray[$i]["id"]);
			$convertedArray[$i]["types"] = $types;
		}
		return json_encode(array("trails" => $convertedArray));
	}
	
	public function getTrailTypes($trailId, $url = "") {
		if($url == "") {
			$url = "http://152.96.80.18:8080/api/trails/".$trailId."/types";
		}
		$remote = new JSONRemoteCaller($url);
		return $this->convertTrailTypesJson($remote->callRemoteSite());
	}
	public function convertTrailTypesJson($externalTrailTypesJson) {
		$externalTrailTypesArray = json_decode($externalTrailTypesJson, true);
		$convertedTypesArray = array();
		for($i = 0; $i < count($externalTrailTypesArray); $i++) {
			$convertedTypesArray[$i]["id"] = $externalTrailTypesArray[$i]["Id"];
			$convertedTypesArray[$i]["name"] = $externalTrailTypesArray[$i]["Name"];
			$convertedTypesArray[$i]["description"] = $externalTrailTypesArray[$i]["Description"];
		}
		return $convertedTypesArray;
	}
	
	/**
	 * Get images from trail
	 * 
	 * @param $trailId Id of trail
	 * @param $url JSON returning API
	 * @return JSON result
	 */
	public function getTrailImages($trailId, $url = "") {
		if($url == "") {
			$url = "http://152.96.80.18:8080/api/trails/".$trailId."/images";
		}
		$remote = new JSONRemoteCaller($url);
		return $this->convertTrailImagesJson($remote->callRemoteSite());
	}
	public function convertTrailImagesJson($externalTrailImagesJson) {
		$externalTrailImagesArray = json_decode($externalTrailImagesJson, true);
		$convertedTrailImagesArray = array();
		for($i = 0; $i < count($externalTrailImagesJson); $i++) {
			$imageSizeArray = getimagesize($externalTrailImagesArray[$i]["ImageUrl800"]);
			
			$convertedTrailImagesArray[$i]["id"] = $externalTrailImagesArray[$i]["Id"];
			$convertedTrailImagesArray[$i]["description"] = $externalTrailImagesArray[$i]["Description"];
			$convertedTrailImagesArray[$i]["image"] = $externalTrailImagesArray[$i]["ImageUrl800"];
			$convertedTrailImagesArray[$i]["thumb"] = $externalTrailImagesArray[$i]["ImageUrl120"];
			$convertedTrailImagesArray[$i]["width"] = $imageSizeArray[0];
			$convertedTrailImagesArray[$i]["height"] = $imageSizeArray[1];
		}
		
		return json_encode(array("images" => $convertedTrailImagesArray));
	}
}
?>