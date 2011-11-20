<?php
require_once('DataLoader.class.php');

/**
 * Description of TrailImagesLoader
 *
 * @author odi
 */
class TrailImagesLoader extends DataLoader
{
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
