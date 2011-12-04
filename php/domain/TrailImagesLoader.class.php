<?php
require_once('DataLoader.class.php');
require_once(dirname(__FILE__) . '/../exceptions/ErrorExceptionConverter.class.php');
require_once(dirname(__FILE__) . '/../exceptions/CannotReadFileException.class.php');

/**
 * Description of TrailImagesLoader
 *
 * @author odi
 */
class TrailImagesLoader extends DataLoader
{
	protected $convertArray = array(
		'id'			=> 'Id',
		'description'	=> 'Description',
		'image'			=> 'ImageUrl800',
		'thumb'			=> 'ImageUrl120',
	);
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
		$convertedJson = "";
		try {
			$convertedJson = $this->convertTrailImagesJson($remote->callRemoteSite());
		} catch(Exception $e){}
		return $convertedJson;
	}
	
	public function convertTrailImagesJson($externalTrailImagesJson) {
		$this->externalArray = json_decode($externalTrailImagesJson, true);
		$this->internalArray = array();
		for($i = 0; $i < count($this->externalArray); $i++) {
			$this->convertValues($i);
			$this->convertImageSize($i);
		}
		
		return json_encode(array("images" => $this->internalArray));
	}
	
	protected function convertImageSize($index)
	{
		$image = $this->externalArray[$index]["ImageUrl800"];
		if ($image != "")
		{
			ErrorExceptionConverter::startErrorConversion();
			try {
				$imageSizeArray = getimagesize($image);
				$this->internalArray[$index]["width"] = $imageSizeArray[0];
				$this->internalArray[$index]["height"] = $imageSizeArray[1];
			} catch (Exception $e) {
				throw new CannotReadFileException($image);
			}
			ErrorExceptionConverter::endErrorConversion();
		}
	}
}

?>
