<?php
require_once(dirname(__FILE__) . '/../exceptions/CannotReadFileException.class.php');
require_once(dirname(__FILE__) . '/../exceptions/ErrorConversion.class.php');

class ImageConverter {
	protected $filetypeArray = array(
		'jpg' => 'data:image/jpeg;base64,',
		'gif' => 'data:image/gif;base64,',
		'png' => 'data:image/png;base64,',
	);
	
	public function getFileTypePrefix($fileType) {
		$key = array_key_exists($fileType,$this->filetypeArray) ? $fileType : "jpg";
		return $this->filetypeArray[$key];
	}
	
	public function imageToDataUrl($file = NULL) {
		if($file != NULL) {
			ErrorConversion::startErrorConversion();
			try {
				$content = file_get_contents($file);
			} catch (Exception $e) {
				throw new CannotReadFileException($file);
			}
			ErrorConversion::endErrorConversion();
			
			$fileType = strtolower(substr(strrchr($file,'.'),1));
			if($content) {
				return $this->getFileTypePrefix($fileType).base64_encode($content);
			} else {
				throw new CannotReadFileException($file);
			}
		}
		return "";
	}
	
	
	
	protected function isLocalFile($file) {
		return !preg_match("/^\w+:\/\//",$file);
	}
}

?>
