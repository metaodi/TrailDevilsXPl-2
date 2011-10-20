<?php
require_once 'JSONRemoteCaller.class.php';
class DataLoader
{
	public function echoData($data)
	{
		echo $data;
	}
	
	public function getTrails($url="http://jenkins.rdmr.ch/php/mock_api.json") /*http://152.96.80.18:8080/api/trails*/
	{
		$remote = new JSONRemoteCaller($url);
		return $this->convertJson($remote->callRemoteSite());
	}
	
	public function convertJson($externalTrailJson) {
		$externalTrailArray = json_decode($externalTrailJson,true);
		
		$convertedArray = array();
		for($i = 0; $i < count($externalTrailArray); $i++) {
			$convertedArray[$i]["title"] = $externalTrailArray["Name"];
			$convertedArray[$i]["location"] = ($externalTrailArray["NextCity"] ? $externalTrailArray["NextCity"].", " : "") . $externalTrailArray["Country"];
			$convertedArray[$i]["distance"] = 100;
			$convertedArray[$i]["thumb"] = $externalTrailArray["ImageUrl120"];
			$convertedArray[$i]["description"] = $externalTrailArray["Desc"];
			$convertedArray[$i]["status"] = $externalTrailArray["IsOpen"] ? "offen" : "geschlossen";
		}
		return json_encode(array("trails" => $convertedArray));
	}
}
?>