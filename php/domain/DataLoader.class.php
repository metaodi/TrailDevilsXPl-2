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
}
?>