<?php

require_once('DataLoader.class.php');
require_once('TrailTypesLoader.class.php');

class TrailsLoader extends DataLoader 
{
	protected $typesLoader;
	protected $sortArray;
	protected $userGeo;
	protected $pageSize = 10;
	protected $page = 1;
	protected $externalTrailArray;
	protected $trailArray = array();
	
	protected $convertArray = array(
		'id'		=> 'Id',
		'title'		=> 'Name',
		'latitude'	=> 'GmapX',
		'longitude' => 'GmapY'
	);

	public function __construct() 
	{
		parent::__construct();
		$this->typesLoader = new TrailTypesLoader();
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
	public function getTrailsNear($userLat=47.5101756, $userLng=8.7221472, $pageSize=10, $page=1, $sort="", $url="http://152.96.80.18:8080/api/trails") /* http://jenkins.rdmr.ch/php/mock_api.json */
	{ 
		$remote = new JSONRemoteCaller($url);
		$this->userGeo = new GeoLocation($userLat, $userLng);
		$this->sortArray = json_decode($sort, true);
		$this->pageSize = $pageSize;
		$this->page = $page;
		return $this->convertTrailsJson($remote->callRemoteSite());
	}

	public function convertTrailsJson($externalTrailJson) 
	{
		$this->externalTrailArray = json_decode($externalTrailJson, true);
		
		$this->sortExternalArray();
		$this->sliceExternalArray();

		for ($i = 0; $i < count($this->externalTrailArray); $i++) {
			$this->convertValues($i);
			$this->convertLocation($i);
			$this->convertDescription($i);
			$this->convertDistance($i);
			$this->convertThumb($i);
			$this->convertStatus($i);
			$this->convertTypes($i);
		}

		// TODO delete after development: add closed trail on first load
		if ($this->page == 1) {
			$this->trailArray[] = $this->getClosedTrail($this->trailArray[0]["latitude"],$this->trailArray[0]["longitude"]);
		}

		return json_encode(array("trails" => $this->trailArray));
	}
	
	protected function sortExternalArray()
	{
		$comparator = "";
		if ($this->sortArray[count($this->sortArray) - 1]['property'] == 'distance') {
			$this->calcDistance($this->externalTrailArray);
			$comparator = "DistanceComparator";
		} else
		{
			$comparator = "TitleComparator";
		}
		usort($this->externalTrailArray, array($comparator, "compare"));
	}
	
	protected function sliceExternalArray()
	{
		$startIndex = ($this->page - 1) * $this->pageSize;
		$this->externalTrailArray = array_slice($this->externalTrailArray, $startIndex, $this->pageSize);
	}
	
	protected function calcDistance(&$dataArray)
	{
		// calculate distance for each trail
		for ($i = 0; $i < count($this->externalTrailArray); $i++) {
			$dataArray[$i]['distance'] = $this->userGeo->distance(new GeoLocation($this->externalTrailArray[$i]["GmapX"], $this->externalTrailArray[$i]["GmapY"]));
		}
	}
	
	protected function convertValues($index)
	{
		foreach ($this->convertArray as $intKey => $extKey)
		{
			$this->trailArray[$index][$intKey] = nl2br($this->externalTrailArray[$index][$extKey]);
		}
	}
	
	protected function convertLocation($index) 
	{
		$this->trailArray[$index]["location"] = ($this->externalTrailArray[$index]["NextCity"] ? $this->externalTrailArray[$index]["NextCity"] . ", " : "") . $this->externalTrailArray[$index]["Country"];
	}
	
	protected function convertDistance($index) 
	{
		if ($this->sortArray[count($this->sortArray) - 1]['property'] == 'distance') 
		{
			$this->trailArray[$index]["distance"] = $this->externalTrailArray[$index]['distance'];
			$this->trailArray[$index]["formattedDistance"] = $this->userGeo->getFormattedDistance($this->trailArray[$index]["distance"]);
		}
	}
	
	protected function convertThumb($index) 
	{
		$this->trailArray[$index]["thumb"] = $this->imageConv->imageToDataUrl($this->externalTrailArray[$index]["ImageUrl120"]);
	}
	
	protected function convertDescription($index)
	{
		$this->trailArray[$index]["description"] = nl2br($this->externalTrailArray[$index]["Desc"]);
	}
	
	protected function convertStatus($index) 
	{
		$this->trailArray[$index]["status"] = $this->externalTrailArray[$index]["IsOpen"] ? "offen" : "geschlossen";
	}
	
	protected function convertTypes($index)
	{
		$this->trailArray[$index]["types"] = $this->typesLoader->getTrailTypes($this->trailArray[$index]["id"]);
	}
	
	//TODO delete after development: add closed trail on first load
	private function getClosedTrail($lat,$lon)
	{
		$trailArray["id"] = "100";
		$trailArray["title"] = "Geschlossener Trail";
		$trailArray["location"] = "Winterthur";
		$trailArray["distance"] = $this->userGeo->distance(new GeoLocation($lat, $lon));
		$trailArray["formattedDistance"] = $this->userGeo->getFormattedDistance($trailArray["distance"]);
		$trailArray["thumb"] = "";
		$trailArray["description"] = "Beschreibung des geschlossenen Trails.";
		$trailArray["status"] = "geschlossen";
		$trailArray["latitude"] = $lat;
		$trailArray["longitude"] = $lon;
		$trailArray["types"] = "";
	}
	
	public function setUserGeo(GeoLocation $geo)
	{
		$this->userGeo = $geo;
	}
	
	public function setSortArray($sortArray = array())
	{
		$this->sortArray = $sortArray;
	}
}

?>
