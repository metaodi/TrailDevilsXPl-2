<?php
require_once(dirname(__FILE__) . '/../remote/JSONRemoteCaller.class.php');
require_once(dirname(__FILE__) . '/../util/DistanceComparator.class.php');
require_once(dirname(__FILE__) . '/../util/TitleComparator.class.php');
require_once('GeoLocation.class.php');
require_once('ImageConverter.class.php');

class DataLoader
{	
	protected $imageConv;
	
	public function __construct() {
		$this->imageConv = new ImageConverter();
	}
	
	public function getTrailTypes($trailId, $url = "") {
		if($url == "") {
			$url = "http://152.96.80.18:8080/api/trails/".$trailId."/types";
		}
		$remote = new JSONRemoteCaller($url);
		return $this->convertTrailTypesJson($remote->callRemoteSite(), $trailId);
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