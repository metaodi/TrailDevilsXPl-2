<?php
require_once('DataLoader.class.php');

class TrailsLoader extends DataLoader {
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
	public function getTrailsNear($userLat=47.5101756, $userLng=8.7221472, $pageSize=10, $page=1, $sort="", $url="http://152.96.80.18:8080/api/trails") { /*http://jenkins.rdmr.ch/php/mock_api.json*/
		$remote = new JSONRemoteCaller($url);
		$userGeo = new GeoLocation($userLat, $userLng);
		$sortArray = json_decode($sort, true);
		return $this->convertTrailsJson($remote->callRemoteSite(), $userGeo, $pageSize, $page, $sortArray);
	}
	
	public function convertTrailsJson($externalTrailJson, GeoLocation $userGeo, $pageSize, $page, $sortArray) {
		$externalTrailArray = json_decode($externalTrailJson, true);
		$convertedArray = array();
		
		// handle sorters
		if($sortArray[count($sortArray)-1]['property'] == 'distance') {
			// calculate distance for each trail
			for($i = 0; $i < count($externalTrailArray); $i++) {
				$externalTrailArray[$i]['distance'] = $userGeo->distance(new GeoLocation($externalTrailArray[$i]["GmapX"], $externalTrailArray[$i]["GmapY"]));
			}

			// sort array by distance
			usort($externalTrailArray, array("DistanceComparator", "compare"));
		} else {
			// sort array by title
			usort($externalTrailArray, array("TitleComparator", "compare"));
		}
		
		// only take the nearest 10 trails
		$externalTrailArray = array_slice($externalTrailArray, (($page-1) * $pageSize), $pageSize);
		
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$convertedArray[$i]["id"] = $externalTrailArray[$i]["Id"];
			$convertedArray[$i]["title"] = $externalTrailArray[$i]["Name"];
			$convertedArray[$i]["location"] = ($externalTrailArray[$i]["NextCity"] ? $externalTrailArray[$i]["NextCity"].", " : "") . $externalTrailArray[$i]["Country"];
			if($sortArray[count($sortArray)-1]['property'] == 'distance') {
				$convertedArray[$i]["distance"] = $externalTrailArray[$i]['distance'];
				$convertedArray[$i]["formattedDistance"] = $userGeo->getFormattedDistance($convertedArray[$i]["distance"]);
			}
			$convertedArray[$i]["thumb"] = $this->imageConv->imageToDataUrl($externalTrailArray[$i]["ImageUrl120"]);
			$convertedArray[$i]["description"] = nl2br($externalTrailArray[$i]["Desc"]);
			$convertedArray[$i]["status"] = $externalTrailArray[$i]["IsOpen"] ? "offen" : "geschlossen";
			$convertedArray[$i]["latitude"] = $externalTrailArray[$i]["GmapX"];
			$convertedArray[$i]["longitude"] = $externalTrailArray[$i]["GmapY"];
			$convertedArray[$i]["types"] = $this->getTrailTypes($convertedArray[$i]["id"]);
		}
		
		// TODO delete after development: add closed trail on first load
		if($page == 1) {
			$nextIndex = count($convertedArray);
			$convertedArray[$nextIndex]["id"] = "100";
			$convertedArray[$nextIndex]["title"] = "Geschlossener Trail";
			$convertedArray[$nextIndex]["location"] = "Winterthur";
			$convertedArray[$nextIndex]["distance"] = $userGeo->distance(new GeoLocation($convertedArray[0]["latitude"], $convertedArray[0]["longitude"]));
			$convertedArray[$nextIndex]["formattedDistance"] = $userGeo->getFormattedDistance($convertedArray[$nextIndex]["distance"]);
			$convertedArray[$nextIndex]["thumb"] = "";
			$convertedArray[$nextIndex]["description"] = "Beschreibung des geschlossenen Trails.";
			$convertedArray[$nextIndex]["status"] = "geschlossen";
			$convertedArray[$nextIndex]["latitude"] = $convertedArray[0]["latitude"];
			$convertedArray[$nextIndex]["longitude"] = $convertedArray[0]["longitude"];
			$convertedArray[$nextIndex]["types"] = "";
		}
		
		return json_encode(array("trails" => $convertedArray));
	}
}
?>
