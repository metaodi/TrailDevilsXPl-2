<?php
require_once 'JSONRemoteCaller.class.php';
class DataLoader
{
	public function echoData($data)
	{
		echo $data;
	}
	
	public function getTrails($url="http://152.96.80.18:8080/api/trails") /*http://jenkins.rdmr.ch/php/mock_api.json*/
	{
		$remote = new JSONRemoteCaller($url);
		return $this->convertJson($remote->callRemoteSite());
	}
	
	public function convertJson($externalTrailJson) {
		$externalTrailArray = json_decode($externalTrailJson,true);
		$convertedArray = array();
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$convertedArray[$i]["title"] = $externalTrailArray[$i]["Name"];
			$convertedArray[$i]["location"] = ($externalTrailArray[$i]["NextCity"] ? $externalTrailArray[$i]["NextCity"].", " : "") . $externalTrailArray[$i]["Country"];
			$convertedArray[$i]["distance"] = 100;
			$convertedArray[$i]["thumb"] = $externalTrailArray[$i]["ImageUrl120"];
			$convertedArray[$i]["description"] = $externalTrailArray[$i]["Desc"];
			$convertedArray[$i]["status"] = $externalTrailArray[$i]["IsOpen"] ? "offen" : "geschlossen";
			$convertedArray[$i]["latitude"] = $externalTrailArray[$i]["GmapX"];
			$convertedArray[$i]["longitude"] = $externalTrailArray[$i]["GmapY"];
		}
		return json_encode(array("trails" => $convertedArray));
	}
}
?>