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
		$this->externalArray = json_decode($externalTrailJson, true);
		
		$this->sortExternalArray();
		$this->sliceExternalArray();

		for ($i = 0; $i < count($this->externalArray); $i++) {
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
			$lat = $this->internalArray[0]["latitude"];
			$lon = $this->internalArray[0]["longitude"];
			$this->internalArray[] = $this->getClosedTrail($lat,$lon);
		}

		return json_encode(array("trails" => $this->internalArray));
	}
	
	protected function sortExternalArray()
	{
		$comparator = "";
		if ($this->sortArray[count($this->sortArray) - 1]['property'] == 'distance') {
			$this->calcDistance($this->externalArray);
			$comparator = "DistanceComparator";
		} else
		{
			$comparator = "TitleComparator";
		}
		usort($this->externalArray, array($comparator, "compare"));
	}
	
	protected function sliceExternalArray()
	{
		$startIndex = ($this->page - 1) * $this->pageSize;
		$this->externalArray = array_slice($this->externalArray, $startIndex, $this->pageSize);
	}
	
	protected function calcDistance(&$dataArray)
	{
		// calculate distance for each trail
		for ($i = 0; $i < count($this->externalArray); $i++) {
			$dataArray[$i]['distance'] = $this->userGeo->distance(new GeoLocation($this->externalArray[$i]["GmapX"], $this->externalArray[$i]["GmapY"]));
		}
	}
	
	protected function convertLocation($index) 
	{
		$this->internalArray[$index]["location"] = ($this->externalArray[$index]["NextCity"] ? $this->externalArray[$index]["NextCity"] . ", " : "") . $this->externalArray[$index]["Country"];
	}
	
	protected function convertDistance($index) 
	{
		if ($this->sortArray[count($this->sortArray) - 1]['property'] == 'distance') 
		{
			$this->internalArray[$index]["distance"] = $this->externalArray[$index]['distance'];
			$this->internalArray[$index]["formattedDistance"] = $this->userGeo->getFormattedDistance($this->internalArray[$index]["distance"]);
		}
	}
	
	protected function convertThumb($index) 
	{
		$this->internalArray[$index]["thumb"] = $this->imageConv->imageToDataUrl($this->externalArray[$index]["ImageUrl120"]);
	}
	
	protected function convertDescription($index)
	{
		$this->internalArray[$index]["description"] = nl2br($this->externalArray[$index]["Desc"]);
	}
	
	protected function convertStatus($index) 
	{
		$this->internalArray[$index]["status"] = $this->externalArray[$index]["IsOpen"] ? "offen" : "geschlossen";
	}
	
	protected function convertTypes($index)
	{
		$this->internalArray[$index]["types"] = $this->typesLoader->getTrailTypes($this->internalArray[$index]["id"]);
	}
	
	//TODO delete after development: add closed trail on first load
	private function getClosedTrail($lat,$lon)
	{
		$trailArray = array();
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
		
		return $trailArray;
	}
	
	public function setUserGeo(GeoLocation $geo)
	{
		$this->userGeo = $geo;
	}
	
	public function setSortArray($sortArray = array())
	{
		$this->sortArray = $sortArray;
	}
	
	public function setPage($page)
	{
		$this->page = $page;
	}
	
	public function setPageSize($pageSize)
	{
		$this->pageSize = $pageSize;
	}
}

?>
