<?php
require_once 'JSONRemoteCaller.class.php';
require_once 'GeoLocation.class.php';
class DataLoader
{
	public function echoData($data)
	{
		echo $data;
	}
	
	/**
	 * Get trails near the users current position
	 * 
	 * @param $url JSON returning API
	 * @param $userLat Latitude of user's current position
	 * @param $userLng Longitude of user's current position
	 * @return JSON result
	 */
	public function getTrailsNear($userLat=47.5101756,$userLng=8.7221472,$url="http://152.96.80.18:8080/api/trails?\$skip=10&\$top=10&\$orderby=Name") /*http://jenkins.rdmr.ch/php/mock_api.json*/
	{
		$remote = new JSONRemoteCaller($url);
		$userGeo = new GeoLocation($userLat, $userLng);
		return $this->convertTrailsJson($remote->callRemoteSite(),$userGeo);
	}
	
	public function convertTrailsJson($externalTrailJson, GeoLocation $userGeo) {
		$externalTrailArray = json_decode($externalTrailJson,true);
		$convertedArray = array();
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$fromGeoLocation = new GeoLocation($externalTrailArray[$i]["GmapX"], $externalTrailArray[$i]["GmapY"]);
			$convertedArray[$i]["id"] = $externalTrailArray[$i]["TrailId"];
			$convertedArray[$i]["title"] = $externalTrailArray[$i]["Name"];
			$convertedArray[$i]["location"] = ($externalTrailArray[$i]["NextCity"] ? $externalTrailArray[$i]["NextCity"].", " : "") . $externalTrailArray[$i]["Country"];
			$convertedArray[$i]["distance"] = $userGeo->distance($fromGeoLocation);
			$convertedArray[$i]["formattedDistance"] = $userGeo->getFormattedDistance($convertedArray[$i]["distance"]);
			$convertedArray[$i]["thumb"] = $externalTrailArray[$i]["ImageUrl120"];
			$convertedArray[$i]["description"] = nl2br($externalTrailArray[$i]["Desc"]);
			$convertedArray[$i]["status"] = $externalTrailArray[$i]["IsOpen"] ? "offen" : "geschlossen";
			$convertedArray[$i]["latitude"] = $externalTrailArray[$i]["GmapX"];
			$convertedArray[$i]["longitude"] = $externalTrailArray[$i]["GmapY"];
		}
		return json_encode(array("trails" => $convertedArray));
	}
	
	/**
	 * Get images from trail
	 * 
	 * @param $trailId Id of trail
	 * @param $url JSON returning API
	 * @return JSON result
	 */
	public function getTrailIamges($trailId, $url)
	{
		if($url == "") {
			$url = "http://152.96.80.18:8080/api/trails/".$trailId."/images";
		}
		$remote = new JSONRemoteCaller($url);
		return $this->convertTrailImagesJson($remote->callRemoteSite());
	}
	
	public function convertTrailImagesJson($externalTrailImagesJson) {
		$externalTrailImagesArray = json_decode($externalTrailImagesJson,true);
		$convertedArray = array();
		for($i = 0; $i < count($externalTrailImagesArray); $i++) {
			$convertedArray[$i]["name"] = $externalTrailImagesArray[$i]["name"];
			$convertedArray[$i]["path"] = $externalTrailImagesArray[$i]["path"];
		}
		return json_encode(array("trailImages" => $convertedArray));
	}
	
}
?>