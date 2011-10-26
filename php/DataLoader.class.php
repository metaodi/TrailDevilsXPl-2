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
	public function getTrailsNear($userLat,$userLng,$url="http://152.96.80.18:8080/api/trails?\$skip=10&\$top=10&\$orderby=TrailId") /*http://jenkins.rdmr.ch/php/mock_api.json*/
	{
		$remote = new JSONRemoteCaller($url);
		$userGeo = new GeoLocation($userLat, $userLng);
		return $this->convertJson($remote->callRemoteSite(),$userGeo);
	}
	
	public function convertJson($externalTrailJson, GeoLocation $userGeo) {
		$externalTrailArray = json_decode($externalTrailJson,true);
		$convertedArray = array();
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$convertedArray[$i]["title"] = $externalTrailArray[$i]["Name"];
			$convertedArray[$i]["location"] = ($externalTrailArray[$i]["NextCity"] ? $externalTrailArray[$i]["NextCity"].", " : "") . $externalTrailArray[$i]["Country"];
			$convertedArray[$i]["distance"] = $userGeo->distance(new GeoLocation($externalTrailArray[$i]["GmapX"], $externalTrailArray[$i]["GmapY"]));
			$convertedArray[$i]["thumb"] = $externalTrailArray[$i]["ImageUrl120"];
			$convertedArray[$i]["description"] = nl2br($externalTrailArray[$i]["Desc"]);
			$convertedArray[$i]["status"] = $externalTrailArray[$i]["IsOpen"] ? "offen" : "geschlossen";
			$convertedArray[$i]["latitude"] = $externalTrailArray[$i]["GmapX"];
			$convertedArray[$i]["longitude"] = $externalTrailArray[$i]["GmapY"];
		}
		return json_encode(array("trails" => $convertedArray));
	}
}
?>