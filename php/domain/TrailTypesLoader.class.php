<?php
require_once('DataLoader.class.php');

/**
 * Description of TrailTypesLoader
 *
 * @author odi
 */
class TrailTypesLoader extends DataLoader
{
	public function getTrailTypes($trailId, $url = "") {
		if ($url == "") {
			$url = "http://152.96.80.18:8080/api/trails/".$trailId."/types";
		}
		$remote = new JSONRemoteCaller($url);
		$convertedJson = "";
		try {
			$convertedJson = $this->convertTrailTypesJson($remote->callRemoteSite(), $trailId);
		} catch(Exception $e){}
		return $convertedJson;
	}
	
	public function convertTrailTypesJson($externalTrailTypesJson, $trailId) {
		$externalTrailTypesArray = json_decode($externalTrailTypesJson, true);
		$convertedTypesArray = array();
		for($i = 0; $i < count($externalTrailTypesArray); $i++) {
			$convertedTypesArray[$i]["id"] = $externalTrailTypesArray[$i]["Id"];
			$convertedTypesArray[$i]["trail_id"] = $trailId;
			$convertedTypesArray[$i]["name"] = $externalTrailTypesArray[$i]["Name"];
			$convertedTypesArray[$i]["description"] = $externalTrailTypesArray[$i]["Description"];
		}
		return $convertedTypesArray;
	}
}

?>
