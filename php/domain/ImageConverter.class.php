<?php
require_once(dirname(__FILE__) . '/../exceptions/CannotReadFileException.class.php');
require_once(dirname(__FILE__) . '/../exceptions/ErrorExceptionConverter.class.php');

class ImageConverter {
	protected $filetypeArray = array(
		'jpg' => 'data:image/jpeg;base64,',
		'gif' => 'data:image/gif;base64,',
		'png' => 'data:image/png;base64,',
	);
	
	public function getFileType($fileName) {
		return strtolower(substr(strrchr($fileName,'.'),1));
	}
	
	protected function getFileTypePrefix($fileType) {
		$key = array_key_exists($fileType,$this->filetypeArray) ? $fileType : "jpg";
		return $this->filetypeArray[$key];
	}
	
	public function imageToDataUrl($file = NULL) {
		if($file != NULL) {
			ErrorExceptionConverter::startErrorConversion();
			try {
				$content = file_get_contents($file);
				$fileType = $this->getFileType($file);
				
				if($content) {
					return $this->getFileTypePrefix($fileType).base64_encode($content);
				} else {
					throw new CannotReadFileException($file);
				}
			} catch (Exception $e) {
				throw new CannotReadFileException($file);
			}
			ErrorExceptionConverter::endErrorConversion();
		}
		return "";
	}
}

?>
