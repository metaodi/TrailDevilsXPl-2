<?php
require_once(dirname(__FILE__) . '/../remote/JSONRemoteCaller.class.php');
require_once(dirname(__FILE__) . '/../util/DistanceComparator.class.php');
require_once(dirname(__FILE__) . '/../util/TitleComparator.class.php');
require_once('GeoLocation.class.php');
require_once('ImageConverter.class.php');

class DataLoader
{	
	protected $imageConv;
	protected $internalArray = array();
	protected $externalArray = array();
	protected $convertArray = array();
	
	public function __construct() {
		$this->imageConv = new ImageConverter();
	}
	
	protected function convertValues($index)
	{
		foreach ($this->convertArray as $intKey => $extKey)
		{
			$this->internalArray[$index][$intKey] = nl2br($this->externalArray[$index][$extKey]);
		}
	}
}
?>